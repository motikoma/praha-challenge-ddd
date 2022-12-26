import { PrismaClient } from '@prisma/client';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { UniqueID } from 'src/domain/shared/uniqueID';
import { InfraException } from '../../infra-exception';

export class ParticipantRepository implements IParticipantRepository {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async create(participant: Participant) {
    const { id } = participant.id;
    const { name, mailAddress, enrollmentStatus } = participant.values;

    const createdParticipant = await this.prismaClient.participant.create({
      data: {
        id: id, // TODO: ここでエラーが出るかを確認しておく
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

    const createdParticipantEntity = Participant.reconstruct({
      id: UniqueID.reconstruct(createdParticipant.id),
      values: {
        name: ParticipantName.reconstruct({
          lastName: createdParticipant.lastName,
          firstName: createdParticipant.firstName,
        }),
        mailAddress: MailAddress.reconstruct({
          mailAddress:
            createdParticipant.ParticipantMailAddress[0]!.mailAddress,
        }),
        enrollmentStatus: EnrollmentStatus.reconstruct({
          value:
            createdParticipant.ParticipantOnEnrollmentStatus[0]!
              .enrollmentStatusId,
        }),
      },
    });

    return createdParticipantEntity;
  }

  async get(mailAddress: MailAddress) {
    const gotParticipant =
      await this.prismaClient.participantMailAddress.findUnique({
        where: {
          mailAddress: mailAddress.mailAddress,
        },
        select: {
          participant: {
            include: {
              ParticipantOnEnrollmentStatus: true,
              ParticipantMailAddress: true,
            },
          },
        },
      });

    if (gotParticipant === null) return null;

    const participantEntity = Participant.reconstruct({
      id: UniqueID.reconstruct(gotParticipant.participant.id),
      values: {
        name: ParticipantName.reconstruct({
          lastName: gotParticipant.participant.lastName,
          firstName: gotParticipant.participant.firstName,
        }),
        mailAddress: MailAddress.reconstruct({
          mailAddress:
            gotParticipant.participant.ParticipantMailAddress[0]!.mailAddress,
        }),
        enrollmentStatus: EnrollmentStatus.reconstruct({
          value:
            gotParticipant.participant.ParticipantOnEnrollmentStatus[0]!
              .enrollmentStatusId,
        }),
      },
    });

    return participantEntity;
  }
}
