import { EnrollmentStatus } from '@prisma/client';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { MailAddress } from './mail-address';
import { Participant } from './participant';

export type IParticipantRepository = {
  create(participant: Participant): Promise<Participant>;
  list(): Promise<Participant[]>;
  getWithMailAddress(mailAddress: MailAddress): Promise<Participant | null>;
  getWithParticipantId(id: UniqueID): Promise<Participant | null>;
  update(participant: Participant): Promise<Participant>;
};
