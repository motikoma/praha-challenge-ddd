import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  Min,
  ValidateNested,
} from 'class-validator';
import { ListParticipantsUseCase } from 'src/application/participant/list-participants.usecase';
import { ListParticipantsQueryService } from 'src/infrastructure/db/query-service/list-participants-query-service-impl';

class PagingCondition {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly pageNumber!: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly pageSize!: number;
}

class RequestBody {
  @IsNotEmpty()
  @IsArray()
  readonly taskIds!: string[];

  @IsNumber()
  readonly taskStatus?: number;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => PagingCondition)
  readonly pagingCondition!: PagingCondition;
}

class ResponseBody {
  constructor(private readonly values: Participant[]) {}
}

class Participant {
  constructor(
    private readonly id: string,
    private readonly lastName: string,
    private readonly firstName: string,
    private readonly mailAddress: string,
    private readonly enrollmentStatus: number,
  ) {}
}

@Controller({
  path: '/participants',
})
export class ParticipantListController {
  @Get()
  async listParticipants(@Body() req: RequestBody): Promise<ResponseBody> {
    const prisma = new PrismaClient();
    const queryService = new ListParticipantsQueryService(prisma);
    const usecase = new ListParticipantsUseCase(queryService);
    const result = await usecase.do(req);

    const response = new ResponseBody(
      result.map((participant) => {
        return new Participant(
          participant.id,
          participant.lastName,
          participant.firstName,
          participant.mailAddress,
          participant.enrollmentStatus,
        );
      }),
    );

    return response;
  }
}
