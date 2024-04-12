import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { AppService } from './app.service';

import { MessageDTO } from './messages/message.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("/foo")
  getFoo(): string {
    return "bar"
  }

  @Get("/versions/latest")
  getLatestVersion(): object {
    return this.appService.getLatestVersion();
  }

  @Get("/repository")
  getRepository(): object {
    return this.appService.getRepository();
  }

  @Post("/messages/send")
  postMessage(@Body() message: MessageDTO): object {
    return {};
  }

  @Get("/messages/poll/:station")
  getMessages(@Param() params: MessageDTO): object {
    return { station: params.station };
  }
}
