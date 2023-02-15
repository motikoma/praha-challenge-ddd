import { UniqueID } from 'src/domain/shared/uniqueId';
import { DomainException } from '../../../shared/domain-exception';
import { Pair } from '../../pair/pair';
import { PairName } from '../../pair/pair-name';
import { Team } from '../team';
import { TeamName } from '../team-name';

describe('Team', () => {
  describe('チームを作成する際のテスト', () => {
    it('正常系_チームは最低3名の参加者で構成されている必要がある', () => {
      const actual = Team.create({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
          ],
          pairs: [],
        },
      });

      expect(actual).toBeInstanceOf(Team);
      expect(actual.id.equals(UniqueID.reconstruct('1'))).toBeTruthy();
      expect(
        actual.name.equals(TeamName.reconstruct({ teamName: 1 })),
      ).toBeTruthy();
      expect(actual.participantIds.length).toBe(3);
      expect(
        actual.participantIds[0].equals(UniqueID.reconstruct('1')),
      ).toBeTruthy();
      expect(
        actual.participantIds[1].equals(UniqueID.reconstruct('2')),
      ).toBeTruthy();
      expect(
        actual.participantIds[2].equals(UniqueID.reconstruct('3')),
      ).toBeTruthy();
      expect(actual.pairs.length).toBe(0);
    });

    it('順正常系_参加者が2名以下の場合はエラーになる', () => {
      try {
        const actual = Team.create({
          id: UniqueID.reconstruct('1'),
          values: {
            name: TeamName.create({ teamName: 1 }),
            participantIds: [
              UniqueID.reconstruct('1'),
              UniqueID.reconstruct('2'),
            ],
            pairs: [],
          },
        });
      } catch (error) {
        expect(DomainException);
      }
    });

    it('順正常系_参加者が0名の場合はエラーになる', () => {
      try {
        const actual = Team.create({
          id: UniqueID.reconstruct('1'),
          values: {
            name: TeamName.create({ teamName: 1 }),
            participantIds: [],
            pairs: [],
          },
        });
      } catch (error) {
        expect(DomainException);
      }
    });
  });

  describe('チームの参加者を変更する際のテスト', () => {
    it('正常系_チームに参加者を追加できる', () => {
      const team = Team.create({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
          ],
          pairs: [],
        },
      });

      const actual = team.addMember(UniqueID.reconstruct('4'));

      expect(actual.participantIds).toHaveLength(4);
      expect(
        actual.participantIds[0].equals(UniqueID.reconstruct('1')),
      ).toBeTruthy();
      expect(
        actual.participantIds[3].equals(UniqueID.reconstruct('4')),
      ).toBeTruthy();
    });

    it('正常系_チームから参加者を削除できる', () => {
      const team = Team.create({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
            UniqueID.reconstruct('4'),
          ],
          pairs: [],
        },
      });

      const actual = team.removeMember(UniqueID.reconstruct('4'));

      expect(actual.participantIds).toHaveLength(3);
      expect(
        actual.participantIds[0].equals(UniqueID.reconstruct('1')),
      ).toBeTruthy();
      expect(
        actual.participantIds[2].equals(UniqueID.reconstruct('3')),
      ).toBeTruthy();
    });

    it('準正常系_チームから参加者を削除する際に、チームの参加者を3名以下にすることはできない', () => {
      const team = Team.create({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
          ],
          pairs: [],
        },
      });

      try {
        const actual = team.removeMember(UniqueID.reconstruct('3'));
      } catch (error) {
        expect(DomainException);
      }
    });
  });

  describe('チームのペアを変更する際のテスト', () => {
    it('正常系_チームにペアを追加できる', () => {
      const team = Team.create({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
            UniqueID.reconstruct('4'),
          ],
          pairs: [],
        },
      });

      const actual = team.addPair(
        Pair.create({
          name: PairName.create({ pairName: 'a' }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
          ],
        }),
      );

      expect(actual.pairs).toHaveLength(1);
      expect(
        actual.pairs[0].name.equals(PairName.reconstruct({ pairName: 'a' })),
      ).toBeTruthy();
      expect(
        actual.pairs[0].participantIds[0].equals(UniqueID.reconstruct('1')),
      ).toBeTruthy();
      expect(
        actual.pairs[0].participantIds[1].equals(UniqueID.reconstruct('2')),
      ).toBeTruthy();
    });

    it('正常系_チームからペアを削除できる', () => {
      const team = Team.create({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
            UniqueID.reconstruct('4'),
          ],
          pairs: [
            Pair.reconstruct({
              id: UniqueID.reconstruct('1'),
              values: {
                name: PairName.create({ pairName: 'a' }),
                participantIds: [
                  UniqueID.reconstruct('1'),
                  UniqueID.reconstruct('2'),
                ],
              },
            }),
          ],
        },
      });

      const actual = team.removePair(UniqueID.reconstruct('1'));

      expect(actual.pairs).toHaveLength(0);
    });

    it('準正常系_ペアは同一チームの参加者で構成される必要があります', () => {
      const team = Team.create({
        id: UniqueID.reconstruct('1'),
        values: {
          name: TeamName.create({ teamName: 1 }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
            UniqueID.reconstruct('4'),
          ],
          pairs: [],
        },
      });

      try {
        const actual = team.addPair(
          Pair.create({
            name: PairName.create({ pairName: 'a' }),
            participantIds: [
              UniqueID.reconstruct('1'),
              UniqueID.reconstruct('5'),
            ],
          }),
        );
      } catch (error) {
        expect(DomainException);
      }
    });
  });
});
