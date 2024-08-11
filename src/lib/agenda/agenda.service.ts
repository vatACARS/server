import { Injectable, OnModuleInit } from '@nestjs/common';
import Agenda = require('agenda');

import { ATSUService } from 'src/lib/prisma/atsu.service';
import { ATSUMessageService } from 'src/lib/prisma/atsuMessage.service';

import { defineLogoutInactiveATSU } from './definitions';

import { defineExpireATSUMessage } from './definitions';

@Injectable()
export class AgendaService implements OnModuleInit {
  agenda: any;

  constructor(
    private readonly atsuService: ATSUService,
    private readonly atsuMessageService: ATSUMessageService,
  ) {
    this.agenda = new Agenda.Agenda({
      db: { address: process.env.database_url, collection: 'tasks' },
    });
    this.agenda.start();
  }

  async onModuleInit() {
    // ATSUService
    defineLogoutInactiveATSU(this.agenda, this.atsuService);

    // ATSUMessageService
    defineExpireATSUMessage(this.agenda, this.atsuMessageService);
  }
}
