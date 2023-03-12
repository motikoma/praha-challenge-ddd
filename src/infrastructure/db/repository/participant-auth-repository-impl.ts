import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ParticipantAuth } from 'src/domain/entity/auth/participant-auth';
import { ParticipantAuthHashed } from 'src/domain/entity/auth/participant-auth-hashed';
import { IParticipantAuthRepository } from 'src/domain/entity/auth/participant-auth-repository';
import { Role } from 'src/domain/entity/auth/role';
import { MailAddress } from 'src/domain/entity/participant/mail-address';
import { UniqueID } from 'src/domain/shared/uniqueId';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ParticipantAuthRepository implements IParticipantAuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(participantAuthInfo: ParticipantAuth): Promise<UniqueID> {
    const { id } = participantAuthInfo.id;
    const { password, roles } = participantAuthInfo.values;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password.password, salt);

    await this.prisma.participantAuth.create({
      data: {
        id: id,
        passwordHash: passwordHash,
      },
    });

    await this.prisma.participantOnRole.create({
      data: {
        participantId: id,
        roleId: roles[0].role,
      },
    });

    return UniqueID.reconstruct(id);
  }

  async getWithMailAddress(
    mailAddress: MailAddress,
  ): Promise<ParticipantAuthHashed | null> {
    const participantAuth = await this.prisma.participantAuth.findFirst({
      where: {
        Participant: {
          ParticipantMailAddress: {
            some: {
              mailAddress: mailAddress.mailAddress,
            },
          },
        },
      },
      include: {
        Participant: {
          include: {
            ParticipantOnRole: true,
          },
        },
      },
    });

    if (!participantAuth) {
      return null;
    }

    const roles = participantAuth.Participant.ParticipantOnRole.map((role) => {
      return Role.reconstruct({ role: role.roleId });
    });

    const participantAuthHashed = ParticipantAuthHashed.create({
      id: UniqueID.reconstruct(participantAuth.id),
      values: {
        passwordHashed: participantAuth.passwordHash,
        roles,
      },
    });

    return participantAuthHashed;
  }
}
