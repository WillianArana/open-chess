import { Board } from '@src/board/domain/board';

import { Knight } from '../knight';
import { KnightBlack } from './knight.black';

describe('KnightBlack', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new KnightBlack(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Knight"`, () => {
    expect(new KnightBlack(new Board(1, 1))).toBeInstanceOf(Knight);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new KnightBlack(board);
      expect(piece.toString()).toBe('n');
    });
  });
});
