import { UniqueID } from 'src/domain/shared/uniqueId';
import { DomainException } from '../../../shared/domain-exception';
import { Pair } from '../pair';
import { PairName } from '../pair-name';

describe('Pair', () => {
  describe('create: ペアの作成には参加者が2名または3名のみ可能', () => {
    it('[正常系]: 参加者が2名であればペア作成に成功', () => {
      const actual = Pair.create({
        name: PairName.create({
          pairName: 'a',
        }),
        participantIds: [UniqueID.reconstruct('1'), UniqueID.reconstruct('2')],
      }).participantIds.length;
      const expected = 2;
      expect(actual).toBe(expected);
    });

    it('[正常系]: 参加者が3名であればペア作成に成功', () => {
      const actual = Pair.create({
        name: PairName.create({
          pairName: 'a',
        }),
        participantIds: [
          UniqueID.reconstruct('1'),
          UniqueID.reconstruct('2'),
          UniqueID.reconstruct('3'),
        ],
      }).participantIds.length;
      const expected = 3;
      expect(actual).toBe(expected);
    });

    it('[準正常系]: 参加者が0名であればペア作成に失敗', () => {
      expect(() =>
        Pair.create({
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [],
        }),
      ).toThrowError(
        new DomainException(
          'ペアは2名または3名の参加者で構成されている必要があります',
        ),
      );
    });

    it('[準正常系]: 参加者が1名であればペア作成に失敗', () => {
      expect(() =>
        Pair.create({
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [UniqueID.reconstruct('1')],
        }),
      ).toThrowError(
        new DomainException(
          'ペアは2名または3名の参加者で構成されている必要があります',
        ),
      );
    });

    it('[準正常系]: 参加者が4名であればペア作成に失敗', () => {
      expect(() =>
        Pair.create({
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
            UniqueID.reconstruct('4'),
          ],
        }),
      ).toThrowError(
        new DomainException(
          'ペアは2名または3名の参加者で構成されている必要があります',
        ),
      );
    });
  });

  describe('ペアに参加するメンバーの変更', () => {
    describe('addMember: ペアに新規メンバーを追加する', () => {
      it('[正常系]: ペアが2名の時に新規メンバーを追加できる', () => {
        const pair = Pair.create({
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
          ],
        });

        const actual = pair.addMember(UniqueID.reconstruct('3')).participantIds
          .length;
        const expected = 3;
        expect(actual).toBe(expected);
      });

      it('[準正常系]: ペアが3名の時に新規メンバーを追加できない', () => {
        const pair = Pair.create({
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
          ],
        });

        expect(() => pair.addMember(UniqueID.reconstruct('4'))).toThrowError(
          new DomainException(
            'ペアは2名または3名の参加者で構成されている必要があります',
          ),
        );
      });
    });

    describe('deleteMember: ペアからメンバーを削除する', () => {
      it('[正常系]: ペアが3名の時に新規メンバーを削除できる', () => {
        const pair = Pair.create({
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
            UniqueID.reconstruct('3'),
          ],
        });
        const actual = pair.removeMember(UniqueID.reconstruct('3'));

        expect(
          actual.participantIds.filter((id) => id.id === '3'),
        ).toHaveLength(0);
        expect(actual.participantIds.length).toBe(2);
      });

      it('[準正常系]: ペアが2名の時に新規メンバーを削除できない', () => {
        const pair = Pair.create({
          name: PairName.create({
            pairName: 'a',
          }),
          participantIds: [
            UniqueID.reconstruct('1'),
            UniqueID.reconstruct('2'),
          ],
        });

        expect(() => pair.removeMember(UniqueID.reconstruct('2'))).toThrowError(
          new DomainException(
            'ペアは2名または3名の参加者で構成されている必要があります',
          ),
        );
      });
    });
  });
});
