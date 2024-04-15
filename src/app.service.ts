import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLatestVersion(): object {
    return {
      "version": "1.0.0",
      "changes": [],
      "releaseDateTime": "2024-04-08T09:08:26.407Z"
    };
  }

  getRepository(): object {
    // TBD: Dynamically grab this from CDN
    return [
      {
        fileName: "incomingMessage.wav",
        subFolder: "audio",
        hash: "bcff70ea1b0bd14167eb574f32f55f27"
      }, {
        fileName: "uplinks.xml",
        subFolder: "data",
        hash: "491419d272326b3bfbea2f5d3d9ed679"
      }
    ];
  }
}
