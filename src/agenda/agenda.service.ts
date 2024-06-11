import { Injectable, OnModuleInit } from '@nestjs/common';
const Agenda = require("agenda");

import { ATSUInformation } from '@prisma/client';
import { ATSUService } from 'src/prisma/atsu.service';

@Injectable()
export class AgendaService implements OnModuleInit {
    agenda: any;
    
    constructor(
        private readonly atsuService: ATSUService
    ) {
        this.agenda = new Agenda({ db: { address: process.env.database_url, collection: "tasks" } });
    }

    async onModuleInit() {
        this.agenda.define("logout inactive ATSU", async job => {
            const { station_code } = job.attrs.data;

            const ATSUStation: ATSUInformation = await this.atsuService.ATSUInformation({ station_code });
            if(ATSUStation) await this.atsuService.deleteATSUInformation({ station_code });

            job.delete();
        });
    }
}