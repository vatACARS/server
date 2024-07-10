import { ATSUService } from 'src/prisma/atsu.service';

export const defineLogoutInactiveATSU = (agenda, atsuService: ATSUService) => {
    agenda.define("logout inactive ATSU", async job => {
        const { station_code } = job.attrs.data;

        const ATSUStation = await atsuService.ATSUInformation({ station_code });
        if (ATSUStation) await atsuService.deleteATSUInformation({ station_code });

        job.remove();
    });
};