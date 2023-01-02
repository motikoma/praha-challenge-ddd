import { ITaskRepository } from 'src/domain/entity/task/task-repository';
import { TaskStatus } from 'src/domain/entity/task/task-status';
import { DomainException } from 'src/domain/shared/domain-exception';
import { UniqueID } from 'src/domain/shared/uniqueId';

type Param = {
  readonly participantId: string;
  readonly taskStatus: number;
};
type ReadonlyParam = Readonly<Param>;

export class UpdateTaskUseCase {
  constructor(private readonly repository: ITaskRepository) {}

  async do(id: string, param: ReadonlyParam) {
    const participantId = UniqueID.reconstruct(param.participantId);
    const taskId = UniqueID.reconstruct(id);

    const task = await this.repository.getWithId(taskId);
    if (!task) throw new DomainException('課題のidが存在しません');

    const newTaskStatus = TaskStatus.reconstruct({
      value: param.taskStatus,
    });
    const updateTask = task.changeTaskStatus(participantId, newTaskStatus);
    const updatedTask = await this.repository.update(updateTask);

    const updatedParticipantDto = new UpdateTaskDto(
      updatedTask.id.id,
      updatedTask.taskName.taskName,
      updatedTask.taskStatus.value,
      updatedTask.ownerId.id,
    );

    return updatedParticipantDto;
  }
}

class UpdateTaskDto {
  constructor(
    private readonly _id: string,
    private readonly _taskName: string,
    private readonly _taskStatus: number,
    private readonly _ownerId: string,
  ) {}

  get id() {
    return this._id;
  }

  get taskName() {
    return this._taskName;
  }

  get taskStatus() {
    return this._taskStatus;
  }

  get ownerId() {
    return this._ownerId;
  }
}
