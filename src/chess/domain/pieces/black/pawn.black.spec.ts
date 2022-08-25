import { Board } from '@src/board/domain/board';
import { Pawn } from '../pawn';
import { PawnBlack } from './pawn.black';

describe('PawnBlack', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new PawnBlack(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Pawn"`, () => {
    expect(new PawnBlack(new Board(1, 1))).toBeInstanceOf(Pawn);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new PawnBlack(board);
      expect(piece.toString()).toBe('♟');
    });
  });
});
