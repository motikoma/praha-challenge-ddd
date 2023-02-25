import { UniqueID } from 'src/domain/shared/uniqueId';
import { Team } from './team';

export type ITeamRepository = {
  getWithTeamId: (id: UniqueID) => Promise<Team | null>;
  getWithParticipantId: (id: UniqueID) => Promise<Team | null>;
  list(): Promise<Team[]>;
  upsert: (team: Team) => Promise<Team>;
};
