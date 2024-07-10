import { Injectable, OnModuleInit } from '@nestjs/common';
const Agenda = require("agenda");

import { ATSUService } from 'src/prisma/atsu.service';
import { ATSUMessageService } from 'src/prisma/atsuMessage.service';

import {
    defineLogoutInactiveATSU
} from './definitions';

import {
    defineExpireATSUMessage
} from './definitions';

@Injectable()
export class AgendaService implements OnModuleInit {
    agenda: any;
    
    constructor(
        private readonly atsuService: ATSUService,
        private readonly atsuMessageService: ATSUMessageService
    ) {
        this.agenda = new Agenda({ db: { address: process.env.database_url, collection: "tasks" } });
        this.agenda.start();
    }

    async onModuleInit() {
        // ATSUService
        defineLogoutInactiveATSU(this.agenda, this.atsuService);

        // ATSUMessageService
        defineExpireATSUMessage(this.agenda, this.atsuMessageService);
    }
}