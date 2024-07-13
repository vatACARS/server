import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ATSUModule } from './ATSU/atsu.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { AgendaService } from './lib/agenda/agenda.service';
import { PrismaService } from './lib/prisma/prisma.service';
import { ATSUMessageService } from './lib/prisma/atsuMessage.service';

import { DB_URL } from './config';

@Module({
  imports: [
    MongooseModule.forRoot(DB_URL),
    ATSUModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AgendaService,
    PrismaService,
    ATSUMessageService
  ],
})
export class AppModule {}
