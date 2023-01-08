import { UniqueID } from 'src/domain/shared/uniqueId';
import { TaskDto } from '../list-tasks.usecase';

export type IListTasksQueryService = {
  listWithOwnerId: (ownerId: UniqueID) => Promise<TaskDto[]>;
};
