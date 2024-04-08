import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DB_URL } from "./config";

@Module({
  imports: [MongooseModule.forRoot(DB_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}