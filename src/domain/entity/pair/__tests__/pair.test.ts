import { UniqueID } from 'src/domain/shared/uniqueId';
import { DomainException } from '../../../shared/domain-exception';
import { Pair } from '../pair';
import { PairName } from '../pair-name';

describe('Pair', () => {
  describe('ペアの作成には参加者が2名または3名のみ可能', () => {
    it('[正常系]: 参加者が2名であればペア作成に成功', () => {
      const actual = Pair.create({
        values: {
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
          ],
        },
      }).participantIds.length;
      const expected = 2;
      expect(actual).toBe(expected);
    });

    it('[正常系]: 参加者が3名であればペア作成に成功', () => {
      const actual = Pair.create({
        values: {
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
          ],
        },
      }).participantIds.length;
      const expected = 3;
      expect(actual).toBe(expected);
    });

    it('[準正常系]: 参加者が0名であればペア作成に失敗', () => {
      try {
        Pair.create({
          values: {
            name: PairName.create({
              pairName: 'a',
            }),
            participantIds: [],
          },
        });
      } catch (error) {
        expect(DomainException);
      }
    });

    it('[準正常系]: 参加者が1名であればペア作成に失敗', () => {
      try {
        Pair.create({
          values: {
            name: PairName.create({
              pairName: 'a',
            }),
            participantIds: [UniqueID.reconstruct('1')],
          },
        });
      } catch (error) {
        expect(DomainException);
      }
    });

    it('[準正常系]: 参加者が4名であればペア作成に失敗', () => {
      try {
        Pair.create({
          values: {
            name: PairName.create({
              pairName: 'a',
            }),
            participantIds: [
              UniqueID.reconstruct('1'),
              UniqueID.reconstruct('2'),
              UniqueID.reconstruct('3'),
              UniqueID.reconstruct('4'),
            ],
          },
        });
      } catch (error) {
        expect(DomainException);
      }
    });
  });
});
