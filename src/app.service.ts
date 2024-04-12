import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLatestVersion(): object {
    return {
      "version": "1.0.1",
      "changes": [
        "+ change 1",
        "- change 2",
        "+ testing  1 2 3",
        "+ cool cool cool",
        "+ and we're done here, thank you!"
      ],
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
        hash: "80f5db52742bc71b5deafd38f2156398"
      }
    ];
  }
}
