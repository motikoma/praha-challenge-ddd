import { Participant } from 'src/domain/entity/participant/participant';

export type IListParticipantQueryService = {
  list: (filter: Filter) => Promise<Participant[]>;
};

export type Filter = {
  taskIds: string[];
  taskStatus: number;
};
