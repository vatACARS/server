import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLatestHubVersion(): string {
    // TDB: Dynamically grab this from CDN
    return "1.0.2";
  }

  getLatestVersion(): object {
    return {
      version: '1.0.1',
      changes: ["Enjoy Cross the Ditch!"],
      releaseDateTime: '2024-06-15T19:30:08.943Z',
    };
  }

  getAvailableClients(): object {
    return [{
      name: "Controller Plugin",
      bgImageUrl: "https://images.unsplash.com/photo-1646768843273-4dbb7a174a4d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latestVersion: "1.0.1",
      description: "The vatACARS plugin for vatSys is a purpose-built CPDLC interface that helps streamline a controller's workflow. It connects directly with Hoppies ACARS, allowing controllers to easily link up with pilots using our pilot client or various other available options.",
      latestChangelog: [{
          logType: 3,
          label: "There's nothing here yet."
      }],
      availableDownloads: [{
          version: "1.0.1",
          label: "Early Access"
      }],
      selectedDownload: 0,
      downloadUrl: "https://dist.vatacars.com/plugin/vatACARS.dll"
  }, {
      name: "Pilot Client",
      bgImageUrl: "https://plus.unsplash.com/premium_photo-1661963446458-274e8810cf59?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latestVersion: ""
  }, {
      name: "Dispatcher Center",
      bgImageUrl: "https://images.unsplash.com/photo-1580795479225-c50ab8c3348d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latestVersion: ""
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
