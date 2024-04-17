import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLatestVersion(): object {
    return {
      version: '1.0.0',
      changes: [],
      releaseDateTime: '2024-04-08T09:08:26.407Z',
    };
  }

  getRepository(): object {
    // TBD: Dynamically grab this from CDN
    return [
      {
        fileName: 'incomingMessage.wav',
        subFolder: 'audio',
        hash: 'bcff70ea1b0bd14167eb574f32f55f27',
      },
      {
        fileName: 'uplinks.xml',
        subFolder: 'data',
        hash: '6f0630ed77352f853bd956f47e251ae2',
      },
      {
        fileName: 'quickfill.json',
        subFolder: 'data',
        hash: '8ff4ee003cbc47cfbf66c9d0eb025770'
      }
    ];
  }
}
