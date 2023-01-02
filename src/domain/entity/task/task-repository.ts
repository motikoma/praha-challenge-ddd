import { UniqueID } from 'src/domain/shared/uniqueId';
import { Task } from './task';

export type ITaskRepository = {
  create: (task: Task) => Promise<Task>;
  list: () => Promise<Task[]>;
  getWithId(taskId: UniqueID): Promise<Task | null>;
  update: (task: Task) => Promise<Task>;
};
