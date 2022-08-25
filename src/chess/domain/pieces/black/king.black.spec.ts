import { Board } from '@src/board/domain/board';
import { King } from '../king';

import { KingBlack } from './king.black';

describe('KingBlack', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new KingBlack(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "King"`, () => {
    expect(new KingBlack(new Board(1, 1))).toBeInstanceOf(King);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new KingBlack(board);
      expect(piece.toString()).toBe('♚');
    });
  });
});
