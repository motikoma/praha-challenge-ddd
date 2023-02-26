import { Task } from 'src/domain/entity/task/task';
import { TaskStatus } from 'src/domain/entity/task/task-status';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { TaskRepository } from '../../repository/task-repository-impl';

/**
 * 課題テストデータ作成メソッド
 *
 * @param taskRepository 課題リポジトリ
 * @param taskId 課題ID
 * @param status 課題ステータス
 * @param startParticipantId 参加者IDの開始番号
 * @param endParticipantId 参加者IDの終了番号
 */

type Props = {
  taskRepository: TaskRepository;
  taskId: string;
  status: number;
  startParticipantId: number;
  endParticipantId: number;
};

type ReadonlyProps = Readonly<Props>;

export const createTaskData = async (props: ReadonlyProps) => {
  const {
    taskRepository,
    taskId,
    status,
    startParticipantId,
    endParticipantId,
  } = props;

  for (let i = startParticipantId; i < endParticipantId; i++) {
    const id = UniqueID.reconstruct(taskId);
    const ownerId = UniqueID.reconstruct(
      `4130b8c4-ca82-48bf-92e1-3f32c618ee-${i}`,
    );
    const taskStatus = TaskStatus.reconstruct({ value: status });
    const task = Task.create({
      id,
      values: {
        ownerId,
        taskStatus,
      },
    });

    await taskRepository.create(task);
  }
};
