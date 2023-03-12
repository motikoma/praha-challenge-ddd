import { UniqueID } from 'src/domain/shared/uniqueId';
import { MailAddress } from '../participant/mail-address';
import { ParticipantAuth } from './participant-auth';
import { ParticipantAuthHashed } from './participant-auth-hashed';

export type IParticipantAuthRepository = {
  getWithMailAddress(
    mailAddress: MailAddress,
  ): Promise<ParticipantAuthHashed | null>;
  create(participantAuth: ParticipantAuth): Promise<UniqueID>;
};
