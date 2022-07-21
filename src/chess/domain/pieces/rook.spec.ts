import { Board } from '@src/board/domain/board';

import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { Rook } from './rook';

describe('Rook', () => {
  it('should be create "Rook"', () => {
    expect(new Rook(new Board(1, 1), Color.White)).toBeDefined();
  });

  it('should be a "ChessPiece"', () => {
    expect(new Rook(new Board(1, 1), Color.White)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get White Rook', () => {
      const king = new Rook(new Board(8, 8), Color.White);
      expect(king.toString()).toBe('♖');
    });

    it('should get White Rook', () => {
      const king = new Rook(new Board(8, 8), Color.Black);
      expect(king.toString()).toBe('♜');
    });
  });
});
