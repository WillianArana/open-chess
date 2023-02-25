import { Board } from '@src/board/domain/board';
import { Bishop } from '../bishop';

import { BishopBlack } from './bishop.black';

describe('BishopBlack', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new BishopBlack(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Bishop"`, () => {
    expect(new BishopBlack(new Board(1, 1))).toBeInstanceOf(Bishop);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new BishopBlack(board);
      expect(piece.toString()).toBe('b');
    });
  });
});
