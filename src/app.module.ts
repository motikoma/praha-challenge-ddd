import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ParticipantCreateController } from './presentation/participant/participant-create.controller';
import { ParticipantListController } from './presentation/participant/participant-list.controller';
import { PrismaService } from './prisma.service';
import { ParticipantUpdateEnrollmentStatusController } from './presentation/participant/participant-update-enrollment-status.controller';
import { TaskListController } from './presentation/task/task-list.controller';
import { TaskUpdateController } from './presentation/task/task-update.controller';
import { TaskCreateController } from './presentation/task/task-create.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ParticipantCreateController,
    ParticipantListController,
    ParticipantUpdateEnrollmentStatusController,
    TaskCreateController,
    TaskListController,
    TaskUpdateController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
