import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
prisma.$connect();

@Injectable()
export class AppService {
  getLatestHubVersion(): string {
    // TDB: Dynamically grab this from CDN
    return "1.0.2";
  }

  getLatestVersion(): object {
    return {
      version: '1.0.3',
      changes: ["Added basic ADS-C support", "Several crashes fixed", "Added auto crash reporting", "And much more..."],
      releaseDateTime: '2024-07-18T01:20:25.723Z',
    };
  }

  getAvailableClients(): object {
    return [{
      name: "Controller Plugin",
      bgImageUrl: "https://images.unsplash.com/photo-1646768843273-4dbb7a174a4d?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      latestVersion: "1.0.3",
      description: "The vatACARS plugin for vatSys is a purpose-built CPDLC interface that helps streamline a controller's workflow. It connects directly with Hoppies ACARS, allowing controllers to easily link up with pilots using our pilot client or various other available options.",
      latestChangelog: [{
          logType: 1,
          label: "Added ADS-C support"
      }, {
        logType: 1,
        label: "Fixed several causes for crashes"
      }, {
        logType: 1,
        label: "Added automatic crash reporting"
      }, {
        logType: 1,
        label: "Improved PDC construction functionality"
      }, {
        logType: 1,
        label: "Improved quickfill placeholder logic"
      }, {
        logType: 3,
        label: "And much more..."
      }],
      availableDownloads: [{
          version: "1.0.3",
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

  reportIssue(cid: string, source: string, data: { ident: string, raw: string }): void {
    console.log(`Reporting issue for CID ${cid} from ${source}: ${data.ident}\n${data.raw}`);
    prisma.errorReport.create({
      data: {
        cid,
        source,
        ident: data.ident,
        raw: data.raw
      }
    }).catch(err => console.error(err));
  }
}
