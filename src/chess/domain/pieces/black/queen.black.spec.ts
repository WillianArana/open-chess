import { Board } from '@src/board/domain/board';

import { Queen } from '../queen';
import { QueenBlack } from './queen.black';

describe('QueenBlack', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new QueenBlack(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Queen"`, () => {
    expect(new QueenBlack(new Board(1, 1))).toBeInstanceOf(Queen);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new QueenBlack(board);
      expect(piece.toString()).toBe('q');
    });
  });
});
