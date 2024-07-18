import { Module } from '@nestjs/common';

import { ATSUController } from './atsu.controller';
import { ATSUService } from '../lib/prisma/atsu.service';
import { ATSUMessageService } from 'src/lib/prisma/atsuMessage.service';
import { AgendaService } from 'src/lib/agenda/agenda.service';
import { PrismaService } from 'src/lib/prisma/prisma.service';

@Module({
    imports: [],
    controllers: [ATSUController],
    providers: [
        AgendaService,
        PrismaService,
        ATSUService,
        ATSUMessageService
    ],
})
export class ATSUModule {}