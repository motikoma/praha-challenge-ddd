import { PrismaClient } from '@prisma/client';
import { EnrollmentStatus } from 'src/domain/entity/participant/enrollment-status';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantName } from 'src/domain/entity/participant/participant-name';
import { IParticipantRepository } from 'src/domain/entity/participant/participant-repository';
import { UniqueID } from 'src/domain/shared/uniqueID';
import { InfraException } from 'src/infrastructure/infra-exception';

export class ParticipantRepository implements IParticipantRepository {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async create(participant: Participant) {
    const { id } = participant.id;
    const { name, mailAddress, enrollmentStatus } = participant.values;

    try {
      const createdParticipant = await this.prismaClient.participant.create({
        data: {
          id: id,
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
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }

  async list() {
    try {
      const listedParticipants = await this.prismaClient.participant.findMany({
        include: {
          ParticipantOnEnrollmentStatus: true,
          ParticipantMailAddress: true,
        },
      });

      const listedParticipantEntities = listedParticipants.map(
        (listedParticipant) => {
          const participantEntity = Participant.reconstruct({
            id: UniqueID.reconstruct(listedParticipant.id),
            values: {
              name: ParticipantName.reconstruct({
                lastName: listedParticipant.lastName,
                firstName: listedParticipant.firstName,
              }),
              mailAddress: MailAddress.reconstruct({
                mailAddress:
                  listedParticipant.ParticipantMailAddress[0]!.mailAddress,
              }),
              enrollmentStatus: EnrollmentStatus.reconstruct({
                value:
                  listedParticipant.ParticipantOnEnrollmentStatus[0]!
                    .enrollmentStatusId,
              }),
            },
          });

          return participantEntity;
        },
      );

      return listedParticipantEntities;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }

  async getWithId(id: UniqueID) {
    try {
      const gotParticipant =
        await this.prismaClient.participantMailAddress.findUnique({
          where: {
            participantId: id.id,
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
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }

  async getWithMailAddress(mailAddress: MailAddress) {
    try {
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
    } catch (error: any) {
      throw new InfraException(error);
    }
  }

  async update(participant: Participant) {
    const { id } = participant.id;
    const { name, mailAddress, enrollmentStatus } = participant.values;

    try {
      const updatedParticipant = await this.prismaClient.participant.update({
        where: {
          id: id,
        },
        data: {
          lastName: name.lastName,
          firstName: name.firstName,
          ParticipantOnEnrollmentStatus: {
            update: {
              where: {
                participantId: id,
              },
              data: {
                enrollmentStatusId: enrollmentStatus.value,
              },
            },
          },
          ParticipantMailAddress: {
            update: {
              where: {
                participantId: id,
              },
              data: {
                mailAddress: mailAddress.mailAddress,
              },
            },
          },
        },
        include: {
          ParticipantOnEnrollmentStatus: true,
          ParticipantMailAddress: true,
        },
      });

      const updatedParticipantEntity = Participant.reconstruct({
        id: UniqueID.reconstruct(updatedParticipant.id),
        values: {
          name: ParticipantName.reconstruct({
            lastName: updatedParticipant.lastName,
            firstName: updatedParticipant.firstName,
          }),
          mailAddress: MailAddress.reconstruct({
            mailAddress:
              updatedParticipant.ParticipantMailAddress[0]!.mailAddress,
          }),
          enrollmentStatus: EnrollmentStatus.reconstruct({
            value:
              updatedParticipant.ParticipantOnEnrollmentStatus[0]!
                .enrollmentStatusId,
          }),
        },
      });

      return updatedParticipantEntity;
    } catch (error: any) {
      throw new InfraException(error.message);
    }
  }
}
