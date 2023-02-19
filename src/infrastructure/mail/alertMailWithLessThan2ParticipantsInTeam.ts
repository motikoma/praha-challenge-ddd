import { PrismaClient } from '.prisma/client';
import { GetParticipantUseCase } from 'src/application/participant/get-participant.usecase';
import { Participant } from 'src/domain/entity/participant/participant';
import { ParticipantRepository } from '../db/repository/participant-repository-impl';

type Props = {
  teamName: number;
  decreasedParticipant: Participant;
  currentParticipantIds: string[];
};

// ダミーメール送信処理
export const alertMailWithLessThan2ParticipantsInTeam = async ({
  teamName,
  decreasedParticipant,
  currentParticipantIds,
}: Props) => {
  const prismaClient = new PrismaClient();
  const repository = new ParticipantRepository(prismaClient);
  const getParticipantUseCase = new GetParticipantUseCase(repository);

  // TODO: パフォーマンスが悪いので、複数の参加者を取得するクエリを新規作成
  let currentParticipantNames = '';
  for (const participantId of currentParticipantIds) {
    const participant = await getParticipantUseCase.do(participantId);
    currentParticipantNames += `${participant.lastName} ${participant.firstName}, `;
  }

  const mail = {
    to: '管理者＠gmail.com',
    subject: 'チーム人数が2人になりました',
    text: `チーム${teamName}の人数が2名以下になりました。現在の参加者は${currentParticipantNames}です。チームを解散するか、他の参加者を追加してください。`,
  };

  return mail;
};
