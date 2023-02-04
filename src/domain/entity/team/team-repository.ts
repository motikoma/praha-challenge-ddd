import { UniqueID } from 'src/domain/shared/uniqueId';
import { Team } from './team';

export type ITeamRepository = {
  getWithId: (id: UniqueID) => Promise<Team | null>;
  upsert: (task: Team) => Promise<Team>;
};
