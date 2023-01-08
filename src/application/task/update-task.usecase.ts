import { ITaskRepository } from 'src/domain/entity/task/task-repository';
import { TaskStatus } from 'src/domain/entity/task/task-status';
import { DomainException } from 'src/domain/shared/domain-exception';
import { UniqueID } from 'src/domain/shared/uniqueId';

type Param = {
  readonly ownerId: string;
  readonly taskStatus: number;
};
type ReadonlyParam = Readonly<Param>;

export class UpdateTaskUseCase {
  constructor(private readonly repository: ITaskRepository) {}

  async do(id: string, param: ReadonlyParam) {
    const ownerId = UniqueID.reconstruct(param.ownerId);
    const taskId = UniqueID.reconstruct(id);

    const task = await this.repository.get(ownerId, taskId);
    if (!task) throw new DomainException('課題のidが存在しません');

    const newTaskStatus = TaskStatus.reconstruct({
      value: param.taskStatus,
    });
    const updateTask = task.changeTaskStatus(ownerId, newTaskStatus);
    const updatedTask = await this.repository.updateStatus(updateTask);

    const updatedParticipantDto = new UpdateTaskDto(
      updatedTask.id.id,
      updatedTask.ownerId.id,
      updatedTask.taskStatus.value,
    );

    return updatedParticipantDto;
  }
}

class UpdateTaskDto {
  constructor(
    private readonly _id: string,
    private readonly _ownerId: string,
    private readonly _taskStatus: number,
  ) {}

  get id() {
    return this._id;
  }

  get ownerId() {
    return this._ownerId;
  }

  get taskStatus() {
    return this._taskStatus;
  }
}
