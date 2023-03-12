import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CreateParticipantUseCase } from './application/participant/create-participant.usecase';
import { SignInUseCase } from './application/signIn/sign-in.usecase';
import { constantTokens } from './constants';
import { ParticipantAuthRepository } from './infrastructure/db/repository/participant-auth-repository-impl';
import { ParticipantRepository } from './infrastructure/db/repository/participant-repository-impl';
import { ParticipantCreateController } from './presentation/participant/participant-create.controller';
import { ParticipantListController } from './presentation/participant/participant-list.controller';
import { ParticipantUpdateEnrollmentStatusController } from './presentation/participant/participant-update-enrollment-status.controller';
import { SignInController } from './presentation/signIn/sign-in.controller';
import { TaskCreateController } from './presentation/task/task-create.controller';
import { TaskListController } from './presentation/task/task-list.controller';
import { TaskUpdateController } from './presentation/task/task-update.controller';
import { PrismaService } from './prisma.service';
@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: '3600',
      },
    }),
  ],
  controllers: [
    SignInController,
    ParticipantCreateController,
    ParticipantListController,
    ParticipantUpdateEnrollmentStatusController,
    TaskCreateController,
    TaskListController,
    TaskUpdateController,
  ],
  providers: [
    PrismaService,
    SignInUseCase,

    // TODO: 他のユースケースやリポジトリもここでDIする
    CreateParticipantUseCase,
    {
      provide: constantTokens.PARTICIPANT_REPOSITORY,
      useClass: ParticipantRepository,
    },
    {
      provide: constantTokens.PARTICIPANT_AUTH_REPOSITORY,
      useClass: ParticipantAuthRepository,
    },
  ],
})
export class AppModule {}
