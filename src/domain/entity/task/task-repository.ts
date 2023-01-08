import { UniqueID } from 'src/domain/shared/uniqueId';
import { Task } from './task';

export type ITaskRepository = {
  create: (task: Task) => Promise<Task>;
  get(ownerId: UniqueID, taskId: UniqueID): Promise<Task | null>;
  updateStatus: (task: Task) => Promise<Task>;
};
