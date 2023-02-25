import { Board } from '@src/board/domain/board';

import { Knight } from '../knight';
import { KnightWhite } from './knight.white';

describe('KnightWhite', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new KnightWhite(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Knight"`, () => {
    expect(new KnightWhite(new Board(1, 1))).toBeInstanceOf(Knight);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new KnightWhite(board);
      expect(piece.toString()).toBe('N');
    });
  });
});
