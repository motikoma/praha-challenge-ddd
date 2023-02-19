type Props = {
  teamName: number;
  decreasedParticipantId: string;
  currentParticipantId: string;
};

// ダミーメール送信処理
export const alertMailWithMergeablePairNotExist = async ({
  teamName,
  decreasedParticipantId,
  currentParticipantId,
}: Props) => {
  // TODO: idではなくユーザー名称を表示するようにする
  const mail = {
    to: '管理者＠gmail.com',
    subject: 'チーム内に合流可能なペアが存在しません',
    text: `チーム${teamName}に合流可能なペアが存在しません。参加者id${decreasedParticipantId}が減り、残った参加者id:${currentParticipantId}がペアを探しています。`,
  };

  return mail;
};
