import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

@Injectable()
export class DataService {
    private networkData: any = {};

    constructor() {
        this.fetchNetworkData();
    }

    @Cron('0 * * * * *') // Runs every minute
    async fetchNetworkData() {
        try {
            const response = await axios.get('https://vatsim-radar.com/api/data/vatsim/data', { headers: { "Content-Type": "application/json" } });
            this.networkData = response.data;
        } catch (error) {
            console.error('Error fetching network data:', error);
        }
    }

    getNetworkData() {
        return this.networkData;
    }
}