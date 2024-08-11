import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryModule } from '@sentry/nestjs/setup';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AgendaService } from './lib/agenda/agenda.service';
import { PrismaService } from './lib/prisma/prisma.service';
import { ATSUService } from './lib/prisma/atsu.service';
import { ATSUMessageService } from './lib/prisma/atsuMessage.service';
import { DataService } from './Data/data.service';

import { DB_URL } from './config';

@Module({
  imports: [
    SentryModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 10,
    }]),
    MongooseModule.forRoot(DB_URL),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AgendaService,
    PrismaService,
    ATSUService,
    ATSUMessageService,
    DataService
  ],
})
export class AppModule {}
