import { Board } from '@src/board/domain/board';
import { Pawn } from '../pawn';
import { PawnWhite } from './pawn.white';

describe('PawnWhite', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new PawnWhite(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Pawn"`, () => {
    expect(new PawnWhite(new Board(1, 1))).toBeInstanceOf(Pawn);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new PawnWhite(board);
      expect(piece.toString()).toBe('♙');
    });
  });
});
