import { Body, Controller, Post } from '@nestjs/common';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTaskUseCase } from 'src/application/task/create-task.usecase';
import { TaskRepository } from 'src/infrastructure/db/repository/task-repository-impl';
import { PrismaService } from 'src/prisma.service';

class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly taskId!: string;

  @IsNotEmpty()
  @IsString()
  readonly ownerId!: string;
}

class ResponseBody {
  constructor(
    private readonly taskId: string,
    private readonly ownerId: string,
    private readonly taskStatus: number,
  ) {}
}

@Controller({
  path: '/tasks',
})
export class TaskCreateController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createTask(@Body() req: RequestBody): Promise<ResponseBody> {
    const repository = new TaskRepository(this.prismaService);
    const usecase = new CreateTaskUseCase(repository);
    const result = await usecase.do(req);

    const response = new ResponseBody(
      result.id,
      result.ownerId,
      result.taskStatus,
    );

    return response;
  }
}
