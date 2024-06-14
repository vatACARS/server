import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLatestHubVersion(): string {
    // TDB: Dynamically grab this from CDN
    return "0.1.2";
  }

  getLatestVersion(): object {
    return {
      version: '1.0.0',
      changes: ["Initial release of the vatACARS plugin for vatSys."],
      releaseDateTime: '2024-06-14T03:54:14.433Z',
    };
  }

  getAvailableClients(): object {
    return [{
      name: "Controller",
      localVersion: "",
      description: "The vatACARS plugin for vatSys is a faithfully recreated CPDLC interface designed to seamlessly assist with a controller's workflow. Providing a direct integration with Hoppies ACARS, controllers are immediately able to connect with pilots that are using either our pilot client or one of many others publicly available.",
      status: "waiting",
      selectedVersion: 0,
      versions: [{
        id: 0,
        label: "Early Access",
        version: "1.0.1"
      }/*, {
          id: 1,
          label: "Bleeding Edge",
          version: "0.0.1-be"
      }*/]
    }, {
      name: "Pilot",
      localVersion: "",
      description: "To be announced!",
      status: "disabled",
      selectedVersion: -1,
      versions: [{
        id: 0,
        label: "Not Available",
        version: "X.X.X"
      }]
    }]
  }

  getRepository(): object {
    // TBD: Dynamically grab this from CDN
    return [
      {
        fileName: 'incomingMessage.wav',
        location: 'hub/audio',
        subFolder: 'audio',
        hash: 'bcff70ea1b0bd14167eb574f32f55f27',
      },
      {
        fileName: 'error.wav',
        location: 'hub/audio',
        subFolder: 'audio',
        hash: 'becb19f88e88ddef057908cbca90f63b'
      },
      {
        fileName: 'uplinks.xml',
        location: 'hub/data',
        subFolder: 'data',
        hash: '37faeaa9a09fb28d3d677a99b72addd6',
      },
      {
        fileName: 'quickfill.json',
        location: 'hub/data',
        subFolder: 'data',
        hash: 'daa7b13bb2bcc6af187ddd74a63ceeaf'
      }
    ];
  }
}
