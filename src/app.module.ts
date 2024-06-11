import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ATSUService } from './prisma/atsu.service';
import { ATSUMessageService } from './prisma/atsuMessage.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DB_URL } from './config';

@Module({
  imports: [MongooseModule.forRoot(DB_URL)],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    ATSUService,
    ATSUMessageService
  ],
})
export class AppModule {}
