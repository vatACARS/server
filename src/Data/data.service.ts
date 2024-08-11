import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import fetch from 'node-fetch';

@Injectable()
export class DataService {
  private networkData: any = {};

  constructor() {
    this.fetchNetworkData();
  }

  @Cron('0 * * * * *') // Runs every minute
  async fetchNetworkData() {
    const response = await fetch(
      'https://vatsim-radar.com/api/data/vatsim/data',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
      .then((resp) => resp.json())
      .catch((err) => new Error(err));

    this.networkData = response;
  }

  getNetworkData() {
    return this.networkData;
  }
}
