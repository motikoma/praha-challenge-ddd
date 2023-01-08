import { UniqueID } from 'src/domain/shared/uniqueId';
import { DomainException } from '../../shared/domain-exception';
import { Entity } from '../../shared/entity';
import { TaskStatus, TASK_STATUS } from './task-status';

type Props = {
  id?: UniqueID;
  values: ReadonlyValues;
};
type ReadonlyProps = Readonly<Props>;

type Values = {
  ownerId: UniqueID;
  taskStatus: TaskStatus;
};
type ReadonlyValues = Readonly<Values>;
export class Task extends Entity<ReadonlyProps> {
  private constructor(props: ReadonlyProps) {
    super(props);
  }

  static create(props: ReadonlyProps): Task {
    return new Task(props);
  }

  changeTaskStatus(participantId: UniqueID, newTaskStatus: TaskStatus): Task {
    if (!participantId.equals(this._values.ownerId))
      throw new DomainException('課題のオーナー以外は状態を変更できません');
    if (this._values.taskStatus.value === TASK_STATUS.DONE)
      throw new DomainException('完了した課題のステータスは変更できません');
    return new Task({
      id: this._id,
      values: {
        taskStatus: newTaskStatus,
        ownerId: this._values.ownerId,
      },
    });
  }

  get id() {
    return this._id;
  }

  get values() {
    return this._values;
  }

  get ownerId() {
    return this._values.ownerId;
  }

  get taskStatus() {
    return this._values.taskStatus;
  }
}
