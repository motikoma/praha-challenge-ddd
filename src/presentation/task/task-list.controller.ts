import { Body, Controller, Get } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { ListTasksUseCase } from 'src/application/task/list-tasks.usecase';
import { ListTasksQueryService } from 'src/infrastructure/db/query-service/list-tasks-query-service-impl';
import { PrismaService } from 'src/prisma.service';

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
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async listTasks(@Body() req: RequestBody): Promise<ResponseBody> {
    const queryService = new ListTasksQueryService(this.prismaService);
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
