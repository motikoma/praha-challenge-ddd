import { Participant } from 'src/domain/entity/participant/participant';
import { Page } from 'src/domain/shared/page';

export type IListParticipantsQueryService = {
  list: (filter: Filter) => Promise<Page<Participant>>;
};

export type PagingCondition = {
  pageSize: number;
  pageNumber: number;
};

export type Filter = {
  taskStatus?: number;
  taskIds: string[];
  pagingCondition: PagingCondition;
};
