import { Body, Controller, Param, Put } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { UpdateTaskUseCase } from 'src/application/task/update-task.usecase';
import { TaskRepository } from 'src/infrastructure/db/repository/task-repository-impl';
import { PrismaService } from 'src/prisma.service';

class RequestBody {
  @IsNotEmpty()
  @IsString()
  readonly ownerId!: string;

  @IsNotEmpty()
  @IsNumber()
  readonly taskStatus!: number;
}

class ResponseBody {
  constructor(
    private readonly id: string,
    private readonly ownerId: string,
    private readonly taskStatus: number,
  ) {}
}

@Controller({
  path: '/tasks',
})
export class TaskUpdateController {
  constructor(private readonly prismaService: PrismaService) {}

  @Put('/:id')
  async createTask(
    @Param('id') id: string,
    @Body() req: RequestBody,
  ): Promise<ResponseBody> {
    const repository = new TaskRepository(this.prismaService);
    const usecase = new UpdateTaskUseCase(repository);
    const result = await usecase.do(id, req);

    const response = new ResponseBody(
      result.id,
      result.ownerId,
      result.taskStatus,
    );

    return response;
  }
}
