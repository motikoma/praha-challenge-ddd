import { Team } from '../entity/team/team';
import { UniqueID } from '../shared/uniqueId';

export interface ICheckAssignedTeamService {
  checkAssignedTeam: (participantId: UniqueID) => Promise<boolean | null>;
}
