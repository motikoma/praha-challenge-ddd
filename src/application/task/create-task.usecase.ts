import { Task } from 'src/domain/entity/task/task';
import { TaskName } from 'src/domain/entity/task/task-name';
import { ITaskRepository } from 'src/domain/entity/task/task-repository';
import { TaskStatus } from 'src/domain/entity/task/task-status';
import { UniqueID } from 'src/domain/shared/uniqueId';

type Param = {
  readonly taskId: string;
  readonly ownerId: string;
  readonly taskName: string;
};
type ReadonlyParam = Readonly<Param>;

export class CreateTaskUseCase {
  constructor(private readonly repository: ITaskRepository) {}

  async do(param: ReadonlyParam) {
    const taskId = UniqueID.reconstruct(param.taskId);
    const ownerId = UniqueID.reconstruct(param.ownerId);
    const taskName = TaskName.create({ taskName: param.taskName });
    const taskStatus = TaskStatus.create();
    const task = Task.create({
      id: taskId,
      values: {
        ownerId,
        taskName,
        taskStatus,
      },
    });

    const newTask = await this.repository.create(task);

    return new TaskDto(
      newTask.id.id,
      newTask.ownerId.id,
      newTask.taskName.taskName,
      newTask.taskStatus.value,
    );
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
