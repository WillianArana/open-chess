import { Board } from '@src/board/domain/board';
import { ChessMatch } from '../../chess-match';
import { Pawn } from '../pawn';
import { PawnBlack } from './pawn.black';

describe('PawnBlack', () => {
  let board!: Board;
  let chessMatch!: ChessMatch;

  beforeEach(() => {
    board = new Board(8, 8);
    chessMatch = new ChessMatch();
  });

  it(`should be create`, () => {
    expect(new PawnBlack(new Board(1, 1), chessMatch)).toBeDefined();
  });

  it(`should be a "Pawn"`, () => {
    expect(new PawnBlack(new Board(1, 1), chessMatch)).toBeInstanceOf(Pawn);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new PawnBlack(board, chessMatch);
      expect(piece.toString()).toBe('p');
    });
  });
});
