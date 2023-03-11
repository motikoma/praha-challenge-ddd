import { Module } from '@nestjs/common';
import { ParticipantCreateController } from './presentation/participant/participant-create.controller';
import { ParticipantListController } from './presentation/participant/participant-list.controller';
import { ParticipantUpdateEnrollmentStatusController } from './presentation/participant/participant-update-enrollment-status.controller';
import { TaskCreateController } from './presentation/task/task-create.controller';
import { TaskListController } from './presentation/task/task-list.controller';
import { TaskUpdateController } from './presentation/task/task-update.controller';
import { PrismaService } from './prisma.service';

export enum ConstantTokens {
  REPOSITORY = 'repository',
}

@Module({
  imports: [],
  controllers: [
    ParticipantCreateController,
    ParticipantListController,
    ParticipantUpdateEnrollmentStatusController,
    TaskCreateController,
    TaskListController,
    TaskUpdateController,
  ],
  providers: [
    PrismaService,
    // CreateParticipantUseCase,
    // {
    //   provide: ConstantTokens.REPOSITORY,
    //   useClass: ParticipantRepository,
    // },
  ],
})
export class AppModule {}
