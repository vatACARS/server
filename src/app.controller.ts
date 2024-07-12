import { Response } from 'express';
import { Controller, Get, Post, Body, Param, HttpStatus, Res, Type } from '@nestjs/common';

import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiHideProperty
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { AgendaService } from './agenda/agenda.service';
import { ATSUService } from "./prisma/atsu.service";
import { ATSUMessageService } from "./prisma/atsuMessage.service";
import { ATSUInformation as ATSUInformationModel, ATSUMessage as ATSUMessageModel } from "@prisma/client";

@Controller()
@ApiTags("vatACARS")
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly agendaService: AgendaService,
    private readonly atsuService: ATSUService,
    private readonly atsuMessageService: ATSUMessageService
  ) { }

  @Get('/hub/dist/:file')
  @ApiHideProperty()
  getUpdateChannel(@Param() params: { file: string }, @Res() res: Response) {
    res.redirect(`https://dist.vatacars.com/releases/${this.appService.getLatestHubVersion()}/${params.file}`)
  }

  @Get('/versions/latest')
  getLatestVersion(): object {
    return this.appService.getLatestVersion();
  }

  @Get('/repository')
  @ApiHideProperty()
  getRepository(): object {
    return this.appService.getRepository();
  }

  @Get('/hub/clientInformation')
  @ApiHideProperty()
  getAvailableClients(): object {
    return this.appService.getAvailableClients();
  }

  @Post('/atsu/logon')
  @ApiOperation({
    summary: "Initiate a connection to vatACARS as a controller.",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              token: { type: "string", example: "vAcV1-xxxxx" },
              station: { type: "string", examples: ["YISA", "YSSY", "KZAK"] },
              sectors: { type: "string", example: [{"name":"ISA","callsign":"BN-ISA_CTR","frequency":125200000}] },
              approxLoc: { type: "string", example: {"latitude":-19.823415798611112,"longitude":140.916931138883} }
            },
            required: ["token", "station", "sectors", "approxLoc"]
          }
        }
      }
    },
    description: "This endpoint is used to logon as an ATSU controller. It will check if the station is already opened by another controller and if not, it will create a new ATSU controller in the database and reserve the position for 2 minutes."
  })
  @ApiResponse({
    status: 200, description: "Successfully logged in as ATSU.", type: class ATSUResponse { // Todo: this should be somewhere else
      success: boolean;
      message: string;
      ATSU: ATSUInformationModel
    }
  })
  @ApiResponse({ status: 400, description: "Invalid station code." })
  @ApiResponse({ status: 401, description: "Not authorised." })
  @ApiResponse({ status: 403, description: "Station already opened by another controller." })
  async postLogon(@Body() body: any, @Res() response: Response): Promise<Response> {
    const { token, station, sectors, approxLoc } = body;
    if (station.length != 4 || !station) return response.status(HttpStatus.BAD_REQUEST).json({ success: false, message: "Invalid station code" });
    const ACARSUserData = await fetch(`https://vatacars.com/api/client/me?token=${token}`).then(resp => resp.json());
    if (!ACARSUserData.success) return response.status(HttpStatus.UNAUTHORIZED).json({ success: false, message: "Not authorised" });

    const CurATSUStation = await this.atsuService.ATSUInformation({ station_code: station.toUpperCase() });
    if (CurATSUStation) {
      if (CurATSUStation.cid != ACARSUserData.vatACARSUserData.data.cid) return response.status(HttpStatus.FORBIDDEN).json({ success: false, message: `${station.toUpperCase()} is already opened by CID ${CurATSUStation.cid}` });

      if (CurATSUStation.sectors != sectors) await this.atsuService.updateATSUInformation({ where: { station_code: station.toUpperCase() }, data: { sectors } });
      if (CurATSUStation.approxLoc != approxLoc) await this.atsuService.updateATSUInformation({ where: { station_code: station.toUpperCase() }, data: { approxLoc } });
      await this.agendaService.agenda.cancel({ data: { station_code: station } });
      await this.agendaService.agenda.schedule("in 2 minutes", "logout inactive ATSU", { station_code: station.toUpperCase() });
      return response.status(HttpStatus.OK).json({
        success: true,
        message: `Logged in as ${station.toUpperCase()}`,
        ATSU: CurATSUStation
      });
    }

    const UserATSUStation = await this.atsuService.ATSUInformation({ cid: ACARSUserData.vatACARSUserData.data.cid });
    if (UserATSUStation) await this.atsuService.deleteATSUInformation({ cid: UserATSUStation.cid });

    await this.agendaService.agenda.schedule("in 2 minutes", "logout inactive ATSU", { station_code: station.toUpperCase() });
    return response.status(HttpStatus.OK).json({
      success: true,
      message: `Logged in as ${station.toUpperCase()}`,
      ATSU: await this.atsuService.createATSUInformation({
        station_code: station.toUpperCase(),
        opened: new Date(),
        sectors,
        approxLoc,
        cid: ACARSUserData.vatACARSUserData.data.cid
      })
    });
  }

  @Post('/atsu/heartbeat')
  async postHeartbeat(@Body() body: any): Promise<{ success: boolean, message: string, ATSU: ATSUInformationModel } | { success: false, message: string }> {
    const { token, station, sectors, approxLoc } = body;
    if (station.length != 4) return { success: false, message: "Invalid station code" };
    const ACARSUserData = await fetch(`https://vatacars.com/api/client/me?token=${token}`).then(resp => resp.json());
    if (!ACARSUserData.success) return { success: false, message: "Not authorised" };

    const CurATSUStation = await this.atsuService.ATSUInformation({ station_code: station.toUpperCase() });
    if (CurATSUStation) {
      if (CurATSUStation.cid != ACARSUserData.vatACARSUserData.data.cid) return { success: false, message: `${station.toUpperCase()} is already opened by CID ${CurATSUStation.cid}` };
      if (CurATSUStation.sectors != sectors) await this.atsuService.updateATSUInformation({ where: { station_code: station.toUpperCase() }, data: { sectors } });
      if (CurATSUStation.approxLoc != approxLoc) await this.atsuService.updateATSUInformation({ where: { station_code: station.toUpperCase() }, data: { approxLoc } });

      await this.agendaService.agenda.cancel({ data: { station_code: station } });
      await this.agendaService.agenda.schedule("in 2 minutes", "logout inactive ATSU", { station_code: station.toUpperCase() });
      return {
        success: true,
        message: `Logged in as ${station.toUpperCase()}`,
        ATSU: CurATSUStation
      }
    }

    return {
      success: false,
      message: `Can't find active station: ${station}`
    }
  }

  @Get('/atsu/online')
  async getATSUOnline(): Promise<ATSUInformationModel[]> {
    return this.atsuService.ATSUInformationCollection({});
  }

  @Get('/atsu/poll/:station')
  async getMessages(@Param("station") station: string): Promise<ATSUMessageModel[]> {
    return this.atsuMessageService.ATSUMessageCollection({ where: { station } });
  }
}
