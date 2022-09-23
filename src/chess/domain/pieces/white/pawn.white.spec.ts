import { Board } from '@src/board/domain/board';
import { ChessMatch } from '../../chess-match';
import { Pawn } from '../pawn';
import { PawnWhite } from './pawn.white';

describe('PawnWhite', () => {
  let board!: Board;
  let chessMatch!: ChessMatch;

  beforeEach(() => {
    board = new Board(8, 8);
    chessMatch = new ChessMatch();
  });

  it(`should be create`, () => {
    expect(new PawnWhite(new Board(1, 1), chessMatch)).toBeDefined();
  });

  it(`should be a "Pawn"`, () => {
    expect(new PawnWhite(new Board(1, 1), chessMatch)).toBeInstanceOf(Pawn);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new PawnWhite(board, chessMatch);
      expect(piece.toString()).toBe('♙');
    });
  });
});
