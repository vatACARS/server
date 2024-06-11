import { Response } from 'express';
import { Controller, Get, Post, Body, Param, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';

import { ATSUService } from "./prisma/atsu.service";
import { ATSUMessageService } from "./prisma/atsuMessage.service";
import { ATSUInformation as ATSUInformationModel, ATSUMessage as ATSUMessageModel } from "@prisma/client";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly atsuService: ATSUService,
    private readonly atsuMessageService: ATSUMessageService
  ) {}

  @Get('/foo')
  getFoo(): string {
    return 'bar';
  }

  @Get('/hub/dist/:file')
  getUpdateChannel(@Param() params: { file: string }, @Res() res: Response) {
    res.redirect(`https://dist.vatacars.com/releases/${this.appService.getLatestHubVersion()}/${params.file}`)
  }

  @Get('/versions/latest')
  getLatestVersion(): object {
    return this.appService.getLatestVersion();
  }

  @Get('/repository')
  getRepository(): object {
    return this.appService.getRepository();
  }

  @Post('/atsu/logon')
  async postLogon(@Body() body: any): Promise<ATSUInformationModel | any> {
    const { token, station } = body;
    if(station.length != 4) return { success: false, message: "Invalid station code" };
    const ACARSUserData = await fetch(`https://vatacars.com/api/client/me?token=${token}`).then(resp => resp.json());
    if(!ACARSUserData.success) return { success: false, message: "Not authorised" };

    const CurATSUStation = await this.atsuService.ATSUInformation({ station_code: station.toUpperCase() });
    if(CurATSUStation) return { success: false, message: `${station.toUpperCase()} is already opened by CID ${CurATSUStation.acars_user_id}` };

    const UserATSUStation = await this.atsuService.ATSUInformation({ acars_user_id: ACARSUserData.vatACARSUserData.data.cid });
    if(UserATSUStation) {
      await this.atsuService.deleteATSUInformation({ acars_user_id: UserATSUStation.acars_user_id });
    }
    
    return this.atsuService.createATSUInformation({
      station_code: station.toUpperCase(),
      opened: new Date(),
      acars_user_id: ACARSUserData.vatACARSUserData.data.cid
    })
  }

  @Get('/atsu/online')
  async getATSUOnline(): Promise<ATSUInformationModel[]> {
    return this.atsuService.ATSUInformationCollection({});
  }

  @Get('/atsu/poll/:station')
  async getMessages(@Param("station") station: string): Promise<ATSUMessageModel[]> {
    return this.atsuMessageService.ATSUMessageCollection({ where: { station }});
  }
}
