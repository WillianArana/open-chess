import { Board } from '@src/board/domain/board';
import { ChessMatch } from '../../chess-match';
import { King } from '../king';

import { KingBlack } from './king.black';

describe('KingBlack', () => {
  let board!: Board;
  let chessMatch!: ChessMatch;

  beforeEach(() => {
    board = new Board(8, 8);
    chessMatch = new ChessMatch();
  });

  it(`should be create`, () => {
    expect(new KingBlack(new Board(1, 1), chessMatch)).toBeDefined();
  });

  it(`should be a "King"`, () => {
    expect(new KingBlack(new Board(1, 1), chessMatch)).toBeInstanceOf(King);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new KingBlack(board, chessMatch);
      expect(piece.toString()).toBe('k');
    });
  });
});
