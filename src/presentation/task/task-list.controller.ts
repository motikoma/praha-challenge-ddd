import { Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ListTasksUseCase } from 'src/application/task/list-tasks.usecase';
import { TaskRepository } from 'src/infrastructure/db/repository/task-repository-impl';

class ResponseBody {
  constructor(private readonly values: Task[]) {}
}

class Task {
  constructor(
    private readonly id: string,
    private readonly ownerId: string,
    private readonly taskName: string,
    private readonly taskStatus: number,
  ) {}
}

@Controller({
  path: '/tasks',
})
export class TaskListController {
  @Get()
  async listTasks(): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new TaskRepository(prisma);
    const usecase = new ListTasksUseCase(repository);
    const result = await usecase.do();

    const response = new ResponseBody(
      result.map((task) => {
        return new Task(task.id, task.ownerId, task.taskName, task.taskStatus);
      }),
    );

    return response;
  }
}
