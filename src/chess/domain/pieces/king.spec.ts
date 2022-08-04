import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { King } from './king';

describe('King', () => {
  it(`should be a "King"`, () => {
    expect(new King(new Board(1, 1), Color.White)).toBeDefined();
  });

  it(`should be a "ChessPiece"`, () => {
    expect(new King(new Board(1, 1), Color.White)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new King(new Board(8, 8), Color.White);
      expect(piece.toString()).toBe('♔');
    });

    it('should get black piece', () => {
      const piece = new King(new Board(8, 8), Color.Black);
      expect(piece.toString()).toBe('♚');
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves with empty board', () => {
      const piece = new King(new Board(8, 8), Color.White);
      (piece as any).position = new Position(3, 3);
      const kingPossibleMoves = (i: number, j: number) =>
        (i === 2 && j === 2) ||
        (i === 2 && j === 3) ||
        (i === 2 && j === 4) ||
        (i === 3 && j === 2) ||
        (i === 3 && j === 4) ||
        (i === 4 && j === 2) ||
        (i === 4 && j === 3) ||
        (i === 4 && j === 4);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.length; i++) {
        for (let j = 0; j < possibleMoves.length; j++) {
          if (kingPossibleMoves(i, j)) {
            expect(possibleMoves[i][j]).toBeTruthy();
          } else {
            expect(possibleMoves[i][j]).toBeFalsy();
          }
        }
      }
    });

    it('should get possible moves with all Kings', () => {
      const board = new Board(8, 8);
      const piece = new King(board, Color.White);
      board.placePiece(piece, new Position(7, 4));
      board.placePiece(new King(board, Color.Black), new Position(0, 4));
      const kingPossibleMoves = (i: number, j: number) =>
        (i === 6 && j === 3) ||
        (i === 6 && j === 4) ||
        (i === 6 && j === 5) ||
        (i === 7 && j === 3) ||
        (i === 7 && j === 5);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.length; i++) {
        for (let j = 0; j < possibleMoves.length; j++) {
          if (kingPossibleMoves(i, j)) {
            expect(possibleMoves[i][j]).toBeTruthy();
          } else {
            expect(possibleMoves[i][j]).toBeFalsy();
          }
        }
      }
    });

    it('should get possible moves with opponents around', () => {
      const board = new Board(8, 8);
      const piece = new King(board, Color.White);
      board.placePiece(piece, new Position(3, 3));
      board.placePiece(new King(board, Color.Black), new Position(3, 2));
      board.placePiece(new King(board, Color.Black), new Position(3, 4));
      board.placePiece(new King(board, Color.Black), new Position(2, 3));
      board.placePiece(new King(board, Color.Black), new Position(4, 3));

      const kingPossibleMoves = (i: number, j: number) =>
        (i === 2 && j === 2) ||
        (i === 2 && j === 3) ||
        (i === 2 && j === 4) ||
        (i === 3 && j === 2) ||
        (i === 3 && j === 4) ||
        (i === 4 && j === 2) ||
        (i === 4 && j === 3) ||
        (i === 4 && j === 4);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.length; i++) {
        for (let j = 0; j < possibleMoves.length; j++) {
          if (kingPossibleMoves(i, j)) {
            expect(possibleMoves[i][j]).toBeTruthy();
          } else {
            expect(possibleMoves[i][j]).toBeFalsy();
          }
        }
      }
    });
  });
});
