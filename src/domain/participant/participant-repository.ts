import { Participant } from './participant';

export type IParticipantRepository = {
  save(participant: Participant): Promise<Participant>;
};
