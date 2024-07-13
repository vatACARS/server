import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgendaService } from './lib/agenda/agenda.service';
import { PrismaService } from './lib/prisma/prisma.service';
import { ATSUService } from './lib/prisma/atsu.service';
import { ATSUMessageService } from './lib/prisma/atsuMessage.service';
import { MongooseModule } from '@nestjs/mongoose';

import { DB_URL } from './config';

@Module({
  imports: [MongooseModule.forRoot(DB_URL)],
  controllers: [AppController],
  providers: [
    AppService,
    AgendaService,
    PrismaService,
    ATSUService,
    ATSUMessageService
  ],
})
export class AppModule {}
