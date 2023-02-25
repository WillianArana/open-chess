import { Board } from '@src/board/domain/board';
import { ChessMatch } from '../../chess-match';
import { King } from '../king';

import { KingWhite } from './king.white';

describe('KingWhite', () => {
  let board!: Board;
  let chessMatch!: ChessMatch;

  beforeEach(() => {
    board = new Board(8, 8);
    chessMatch = new ChessMatch();
  });

  it(`should be create`, () => {
    expect(new KingWhite(new Board(1, 1), chessMatch)).toBeDefined();
  });

  it(`should be a "King"`, () => {
    expect(new KingWhite(new Board(1, 1), chessMatch)).toBeInstanceOf(King);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new KingWhite(board, chessMatch);
      expect(piece.toString()).toBe('K');
    });
  });
});
