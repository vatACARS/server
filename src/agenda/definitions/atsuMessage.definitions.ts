import { ATSUMessageService } from 'src/prisma/atsuMessage.service';

export const defineExpireATSUMessage = (agenda, atsuMessageService: ATSUMessageService) => {
    agenda.define("expire ATSUMessage", async job => {
        job.remove();
    });
};