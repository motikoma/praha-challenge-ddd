import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ParticipantPostController } from './presentation/participant/participant-post.controller';
import { ParticipantListController } from './presentation/participant/participant-list.controller';
import { PrismaService } from './prisma.service';
import { ParticipantUpdateController } from './presentation/participant/participant-update.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    ParticipantPostController,
    ParticipantListController,
    ParticipantUpdateController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
