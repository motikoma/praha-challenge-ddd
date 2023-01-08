import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';
import { ListTasksUseCase } from 'src/application/task/list-tasks.usecase';
import { ListTasksQueryService } from 'src/infrastructure/db/query-service/list-tasks-query-service-impl';
import { TaskRepository } from 'src/infrastructure/db/repository/task-repository-impl';

class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly ownerId!: string;
}

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
  async listTasks(@Body() req: RequestBody): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const queryService = new ListTasksQueryService(prisma);
    const usecase = new ListTasksUseCase(queryService);
    const result = await usecase.do(req);

    const response = new ResponseBody(
      result.map((task) => {
        return new Task(task.id, task.ownerId, task.taskName, task.taskStatus);
      }),
    );

    return response;
  }
}
