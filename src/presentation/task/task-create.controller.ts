import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateTaskUseCase } from 'src/application/task/create-task.usecase';
import { TaskRepository } from 'src/infrastructure/db/repository/task-repository-impl';

class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly ownerId!: string;

  @IsNotEmpty()
  @IsString()
  readonly taskName!: string;
}

class ResponseBody {
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
  @Post()
  async createTask(@Body() req: RequestBody): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const repository = new TaskRepository(prisma);
    const usecase = new CreateTaskUseCase(repository);
    const result = await usecase.do(req);

    const response = new ResponseBody(
      result.id,
      result.ownerId,
      result.taskName,
      result.taskStatus,
    );

    return response;
  }
}
