import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ParticipantController } from './presentation/participant/participant-controller';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController, ParticipantController],
  providers: [PrismaService],
})
export class AppModule {}
