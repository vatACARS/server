import fs from 'node:fs';
import path from 'node:path';
import { Controller, Get, Post, Body, Param, Redirect } from '@nestjs/common';
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
  @Redirect('https://cdn.vatacars.com/files/main.yml', 301)

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
