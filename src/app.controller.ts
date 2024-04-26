import fs from 'node:fs';
import path from 'node:path';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

import { MessageDTO } from './messages/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/foo')
  getFoo(): string {
    return 'bar';
  }

  @Post('/hub/dist')
  getHubVersionInformation(@Body() params: {platform: string, version: string}): object {
    let data = fs.readFileSync(path.join(__dirname, 'updateData', params.version));
    return data;
  }

  @Get('/versions/latest')
  getLatestVersion(): object {
    return this.appService.getLatestVersion();
  }

  @Get('/repository')
  getRepository(): object {
    return this.appService.getRepository();
  }

  @Post('/messages/send')
  postMessage(@Body() message: MessageDTO): object {
    return {};
  }

  @Get('/messages/poll/:station')
  getMessages(@Param() params: MessageDTO): object {
    return { station: params.station };
  }
}
