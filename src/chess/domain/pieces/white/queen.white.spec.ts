import { Board } from '@src/board/domain/board';

import { Queen } from '../queen';
import { QueenWhite } from './queen.white';

describe('QueenWhite', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new QueenWhite(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Queen"`, () => {
    expect(new QueenWhite(new Board(1, 1))).toBeInstanceOf(Queen);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new QueenWhite(board);
      expect(piece.toString()).toBe('♕');
    });
  });
});
