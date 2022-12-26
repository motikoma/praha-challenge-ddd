import { MailAddress } from './mail-address';
import { Participant } from './participant';

export type IParticipantRepository = {
  create(participant: Participant): Promise<Participant>;
  get(mailAddress: MailAddress): Promise<Participant>;
};
