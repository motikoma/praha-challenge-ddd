import { PrismaClient } from '@prisma/client';
import { EnrollmentStatus } from 'src/domain/participant/enrollment-status';
import { MailAddress } from 'src/domain/participant/mail-address';
import { Participant } from 'src/domain/participant/participant';
import { ParticipantName } from 'src/domain/participant/participant-name';
import { IParticipantRepository } from 'src/domain/participant/participant-repository';
import { UniqueID } from 'src/domain/shared/uniqueID';
import { InfraException } from '../infra-exception';

export class ParticipantRepository implements IParticipantRepository {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async save(participant: Participant) {
    const { id, values } = participant.getAllProperties();
    const { name, mailAddress, enrollmentStatus } = values;

    // TODO: エラーハンドリング忘れそう...id型だけはResult型でもらうようにする
    if (id === undefined) throw new InfraException('id is undefined');

    const savedParticipant = await this.prismaClient.participant.create({
      data: {
        id: id.id,
        lastName: name.lastName,
        firstName: name.firstName,
        ParticipantOnEnrollmentStatus: {
          create: {
            enrollmentStatusId: enrollmentStatus.value,
          },
        },
        ParticipantMailAddress: {
          create: {
            mailAddress: mailAddress.mailAddress,
          },
        },
      },
      include: {
        ParticipantOnEnrollmentStatus: true,
        ParticipantMailAddress: true,
      },
    });

    const savedParticipantEntity = Participant.reconstruct({
      id: UniqueID.reconstruct(savedParticipant.id),
      values: {
        name: ParticipantName.reconstruct({
          lastName: savedParticipant.lastName,
          firstName: savedParticipant.firstName,
        }),
        mailAddress: MailAddress.reconstruct({
          mailAddress: savedParticipant.ParticipantMailAddress[0]!.mailAddress,
        }),
        enrollmentStatus: EnrollmentStatus.reconstruct({
          value:
            savedParticipant.ParticipantOnEnrollmentStatus[0]!
              .enrollmentStatusId,
        }),
      },
    });

    return savedParticipantEntity;
  }
}
