import { ITaskRepository } from 'src/domain/entity/task/task-repository';

export class ListTasksUseCase {
  constructor(private readonly repository: ITaskRepository) {}

  async do() {
    const tasks = await this.repository.list();

    const taskDtos = tasks.map((task) => {
      return new TaskDto(
        task.id.id,
        task.ownerId.id,
        task.taskName.taskName,
        task.taskStatus.value,
      );
    });

    return taskDtos;
  }
}

class TaskDto {
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
