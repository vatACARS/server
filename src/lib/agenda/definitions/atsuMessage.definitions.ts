import { ATSUMessageService } from 'src/lib/prisma/atsuMessage.service';

export const defineExpireATSUMessage = (
  agenda,
  atsuMessageService: ATSUMessageService,
) => {
  atsuMessageService;
  agenda.define('expire ATSUMessage', async (job) => {
    job.remove();
  });
};
