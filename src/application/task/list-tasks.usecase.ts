import { UniqueID } from 'src/domain/shared/uniqueId';
import { IListTasksQueryService } from './query-service/list-tasks-query-service';

type Param = {
  readonly ownerId: string;
};
export class ListTasksUseCase {
  constructor(private readonly queryService: IListTasksQueryService) {}

  async do(param: Param) {
    const ownerId = UniqueID.reconstruct(param.ownerId);
    const tasks = await this.queryService.listWithOwnerId(ownerId);

    const taskDtos = tasks.map((task) => {
      return new TaskDto(task.id, task.ownerId, task.taskName, task.taskStatus);
    });

    return taskDtos;
  }
}

export class TaskDto {
  constructor(
    private readonly _id: string,
    private readonly _ownerId: string,
    private readonly _taskName: string,
    private readonly _taskStatus: number,
  ) {}

  get id() {
    return this._id;
  }

  get ownerId() {
    return this._ownerId;
  }

  get taskName() {
    return this._taskName;
  }

  get taskStatus() {
    return this._taskStatus;
  }
}
