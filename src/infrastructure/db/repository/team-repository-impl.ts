import { PrismaClient } from '@prisma/client';
import { Pair } from 'src/domain/entity/pair/pair';
import { PairName } from 'src/domain/entity/pair/pair-name';
import { Team } from 'src/domain/entity/team/team';
import { TeamName } from 'src/domain/entity/team/team-name';
import { ITeamRepository } from 'src/domain/entity/team/team-repository';
import { UniqueID } from 'src/domain/shared/uniqueID';

export class TeamRepository implements ITeamRepository {
  constructor(private readonly prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async upsert(team: Team) {
    const { participantIds, pairs } = team.values;

    return await this.prismaClient.$transaction(async (prisma) => {
      // チームと参加者の紐付け処理
      let participantOnTeamResults = [];
      for (const participantId of participantIds) {
        const result = await prisma.participantOnTeam.upsert({
          create: {
            participantId: participantId.id,
            teamId: team.id.id,
          },
          update: {
            participantId: participantId.id,
            teamId: team.id.id,
          },
          where: {
            participantId: participantId.id,
          },
          include: {
            Team: true,
          },
        });

        participantOnTeamResults.push(result);
      }

      // ペアと参加者の紐付け処理
      let participantOnPairResults = [];
      for (const pair of pairs) {
        for (const participantId of pair.participantIds) {
          const result = await prisma.participantOnPair.upsert({
            create: {
              participantId: participantId.id,
              pairId: pair.id.id,
            },
            update: {
              participantId: participantId.id,
              pairId: pair.id.id,
            },
            where: {
              participantId: participantId.id,
            },
            include: {
              Pair: true,
            },
          });
          participantOnPairResults.push(result);
        }
      }

      // チームとペアの紐付け処理
      let teamOnPairResults = [];
      for (const pair of pairs) {
        const result = await prisma.teamOnPair.upsert({
          create: {
            teamId: team.id.id,
            pairId: pair.id.id,
          },
          update: {
            teamId: team.id.id,
            pairId: pair.id.id,
          },
          where: {
            pairId: pair.id.id,
          },
          include: {
            Team: true,
          },
        });
        teamOnPairResults.push(result);
      }

      // Participant: ドメインオブジェクトへの変換処理
      let teamParticipantIdsEntity: UniqueID[] = [];
      participantOnTeamResults.map((result) => {
        teamParticipantIdsEntity.push(
          UniqueID.reconstruct(result.participantId),
        );
      });

      // Pair: ドメインオブジェクトへの変換処理
      let pairsEntity: Pair[] = [];
      participantOnPairResults.map((result) => {
        let pairParticipantIdsEntity: UniqueID[] = [];
        pairParticipantIdsEntity.push(
          UniqueID.reconstruct(result.participantId),
        );

        pairsEntity.push(
          Pair.reconstruct({
            id: UniqueID.reconstruct(result.pairId),
            values: {
              name: PairName.reconstruct({
                pairName: result.Pair.pairName,
              }),
              participantIds: pairParticipantIdsEntity,
            },
          }),
        );
      });

      // Team: ドメインオブジェクトへの変換処理
      const teamEntity = Team.reconstruct({
        id: UniqueID.reconstruct(participantOnTeamResults[0].Team.id),
        values: {
          name: TeamName.reconstruct({
            teamName: participantOnTeamResults[0].Team.teamName,
          }),
          participantIds: teamParticipantIdsEntity,
          pairs: pairsEntity,
        },
      });

      return teamEntity;
    });
  }

  async getWithId(id: UniqueID) {
    const result = await this.prismaClient.team.findUnique({
      where: {
        id: id.id,
      },
      include: {
        ParticipantOnTeam: {
          include: {
            Participant: true,
          },
        },
        TeamOnPair: {
          include: {
            Pair: true,
          },
        },
      },
    });

    if (result === null) {
      return null;
    }

    // Participant: ドメインオブジェクトへの変換処理
    let teamParticipantIdsEntity: UniqueID[] = [];
    result.ParticipantOnTeam.map((participantOnTeam) => {
      teamParticipantIdsEntity.push(
        UniqueID.reconstruct(participantOnTeam.participantId),
      );
    });

    // Pair: ドメインオブジェクトへの変換処理
    let pairsEntity: Pair[] = [];
    result.TeamOnPair.map((teamOnPair) => {
      pairsEntity.push(
        Pair.reconstruct({
          id: UniqueID.reconstruct(teamOnPair.pairId),
          values: {
            name: PairName.reconstruct({
              pairName: teamOnPair.Pair.pairName,
            }),
            participantIds: teamParticipantIdsEntity,
          },
        }),
      );
    });

    // Team: ドメインオブジェクトへの変換処理
    const teamEntity = Team.reconstruct({
      id: UniqueID.reconstruct(result.id),
      values: {
        name: TeamName.reconstruct({
          teamName: result.teamName,
        }),
        participantIds: teamParticipantIdsEntity,
        pairs: pairsEntity,
      },
    });

    return teamEntity;
  }
}
