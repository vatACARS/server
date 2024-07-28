import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DataService } from './data.service';

@Controller()
@ApiTags("Data API")
export class DataController {
    constructor(
        private readonly dataService: DataService,
    ) {}

    @Get('/data/network')
    getNetworkData(): object {
        return this.dataService.getNetworkData();
    }
}