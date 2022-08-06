import { Piece } from '@shared/domain/piece';

import { Board } from './board';
import { Position } from './position';

describe('Board', () => {
  it('should be create', () => {
    expect(new Board(1, 1)).toBeDefined();
  });

  it('should get rows', () => {
    const board = new Board(2, 2);
    expect(board.rows).toBe(2);
  });

  it('should get columns', () => {
    const board = new Board(5, 5);
    expect(board.columns).toBe(5);
  });

  describe('piece', () => {
    it('should get piece', () => {
      const board = new Board(8, 8);
      const position = new Position(4, 4);
      const piece = board.piece(position);
      expect(piece).toBeNull();
    });

    it('should throw error position when get a piece', () => {
      const board = new Board(2, 2);
      const position = new Position(4, 4);
      expect(() => board.piece(position)).toThrowError('Position not on the board');
    });
  });

  describe('placePiece', () => {
    it('should be place a piece', () => {
      const board = new Board(8, 8);
      const position = new Position(3, 2);
      const piece = { position, board } as unknown as Piece;
      board.placePiece(piece, position);
      expect(board.thereIsAPiece(position)).toBeTruthy();
    });

    it('should throw error when place a piece', () => {
      const board = new Board(8, 8);
      const position = new Position(5, 5);
      const piece = { position, board } as unknown as Piece;
      board.placePiece(piece, position);
      expect(() => board.placePiece(piece, position)).toThrowError(
        `There is already a piece on position ${position}`
      );
    });
  });

  describe('removePiece', () => {
    it('should remove a piece', () => {
      const board = new Board(8, 8);
      const position = new Position(3, 2);
      const piece = { position, board } as unknown as Piece;
      board.placePiece(piece, position);
      expect(board.removePiece(position)).toEqual(piece);
    });
  });
});
