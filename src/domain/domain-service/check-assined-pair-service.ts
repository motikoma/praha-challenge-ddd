import { UniqueID } from '../shared/uniqueId';

export interface ICheckAssignedPairService {
  checkAssignedPair: (participantId: UniqueID) => Promise<boolean | null>;
}
