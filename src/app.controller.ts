import { Response } from 'express';
import { Controller, Get, Param, Res } from '@nestjs/common';

import {
  ApiTags,
  ApiHideProperty
} from '@nestjs/swagger';

import { AppService } from './app.service';
import { ATSUMessageService } from "./lib/prisma/atsuMessage.service";
import { ATSUMessage as ATSUMessageModel } from "@prisma/client";

@Controller()
@ApiTags("vatACARS")
export class AppController {
  constructor(
    private readonly appService: AppService,
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

  @Get('/atsu/poll/:station')
  async getMessages(@Param("station") station: string): Promise<ATSUMessageModel[]> {
    return this.atsuMessageService.ATSUMessageCollection({ where: { station } });
  }
}
