import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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
}
