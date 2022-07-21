import { Board } from '@src/board/domain/board';

import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { King } from './king';

describe('King', () => {
  it('should be create "King"', () => {
    expect(new King(new Board(1, 1), Color.White)).toBeDefined();
  });

  it('should be a "ChessPiece"', () => {
    expect(new King(new Board(1, 1), Color.White)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get White King', () => {
      const king = new King(new Board(8, 8), Color.White);
      expect(king.toString()).toBe('♔');
    });

    it('should get White King', () => {
      const king = new King(new Board(8, 8), Color.Black);
      expect(king.toString()).toBe('♚');
    });
  });
});
