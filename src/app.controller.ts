import { Response } from 'express';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';

import { ApiTags, ApiHideProperty } from '@nestjs/swagger';

import { AppService } from './app.service';
import { ATSUMessageService } from './lib/prisma/atsuMessage.service';
import { ATSUMessage as ATSUMessageModel } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@SkipThrottle()
@Controller()
@ApiTags('vatACARS')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly atsuMessageService: ATSUMessageService,
  ) {}

  @Get('/hub/dist/:file')
  @ApiHideProperty()
  getUpdateChannel(@Param() params: { file: string }, @Res() res: Response) {
    res.redirect(
      `https://dist.vatacars.com/releases/${this.appService.getLatestHubVersion()}/${params.file}`,
    );
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
  async getMessages(
    @Param('station') station: string,
  ): Promise<ATSUMessageModel[]> {
    return this.atsuMessageService.ATSUMessageCollection({
      where: { station },
    });
  }

  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('/reporting')
  async postReport(
    @Body() body: any,
    @Res() response: Response,
  ): Promise<Response> {
    const { token, source, data } = body;
    if (!token || !source || !data)
      return response
        .status(400)
        .json({ success: false, message: 'Missing data' });
    const ACARSUserData = await fetch(
      `https://vatacars.com/api/client/me?token=${token}`,
    ).then((resp) => resp.json());
    if (!ACARSUserData.success)
      return response
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: 'Not authorised' });
    if (!['plugin'].includes(source))
      return response
        .status(400)
        .json({ success: false, message: 'Invalid source' });

    const { ident, raw } = JSON.parse(data);
    if (!ident || !raw)
      return response
        .status(400)
        .json({ success: false, message: 'Missing data' });

    this.appService.reportIssue(
      ACARSUserData.vatACARSUserData.data.cid,
      source,
      JSON.parse(data),
    );
    return response.status(200).json({ success: true });
  }
}
