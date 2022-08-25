import { Board } from '@src/board/domain/board';
import { Bishop } from '../bishop';

import { BishopWhite } from './bishop.white';

describe('BishopWhite', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new BishopWhite(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Bishop"`, () => {
    expect(new BishopWhite(new Board(1, 1))).toBeInstanceOf(Bishop);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new BishopWhite(board);
      expect(piece.toString()).toBe('♗');
    });
  });
});
