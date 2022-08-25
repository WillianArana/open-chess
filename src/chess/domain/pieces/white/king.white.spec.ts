import { Board } from '@src/board/domain/board';
import { King } from '../king';

import { KingWhite } from './king.white';

describe('KingWhite', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new KingWhite(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "King"`, () => {
    expect(new KingWhite(new Board(1, 1))).toBeInstanceOf(King);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new KingWhite(board);
      expect(piece.toString()).toBe('♔');
    });
  });
});
