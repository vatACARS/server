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
            const response = await fetch("https://api.vatacars.com/data/network", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(resp => resp.json());

            this.networkData = response;
        } catch (error) {
            console.error('Error fetching network data:', error);
        }
    }

    getNetworkData() {
        return this.networkData;
    }
}