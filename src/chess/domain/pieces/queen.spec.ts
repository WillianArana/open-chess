import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { Queen } from './queen';

describe('Queen', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create king`, () => {
    expect(new Queen(new Board(1, 1), Color.White)).toBeDefined();
  });

  it(`should be a "ChessPiece"`, () => {
    expect(new Queen(new Board(1, 1), Color.White)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new Queen(board, Color.White);
      expect(piece.toString()).toBe('♕');
    });

    it('should get black piece', () => {
      const piece = new Queen(board, Color.Black);
      expect(piece.toString()).toBe('♛');
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves with empty board', () => {
      const piece = new Queen(board, Color.White);
      (piece as any).position = new Position(3, 3);
      const pieceMoves = (i: number, j: number) =>
        (i === 0 && j === 0) ||
        (i === 0 && j === 3) ||
        (i === 0 && j === 6) ||
        (i === 1 && j === 1) ||
        (i === 1 && j === 3) ||
        (i === 1 && j === 5) ||
        (i === 2 && j === 2) ||
        (i === 2 && j === 3) ||
        (i === 2 && j === 4) ||
        (i === 3 && j === 0) ||
        (i === 3 && j === 1) ||
        (i === 3 && j === 2) ||
        (i === 3 && j === 4) ||
        (i === 3 && j === 5) ||
        (i === 3 && j === 6) ||
        (i === 3 && j === 7) ||
        (i === 4 && j === 2) ||
        (i === 4 && j === 3) ||
        (i === 4 && j === 4) ||
        (i === 5 && j === 1) ||
        (i === 5 && j === 3) ||
        (i === 5 && j === 5) ||
        (i === 6 && j === 0) ||
        (i === 6 && j === 3) ||
        (i === 6 && j === 6) ||
        (i === 7 && j === 3) ||
        (i === 7 && j === 7);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.length; i++) {
        for (let j = 0; j < possibleMoves.length; j++) {
          expect(possibleMoves[i][j]).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with opponents around', () => {
      const piece = new Queen(board, Color.White);
      board.placePiece(piece, new Position(3, 3));
      board.placePiece(new Queen(board, Color.Black), new Position(2, 2));
      board.placePiece(new Queen(board, Color.Black), new Position(2, 3));
      board.placePiece(new Queen(board, Color.Black), new Position(2, 4));
      board.placePiece(new Queen(board, Color.Black), new Position(3, 2));
      board.placePiece(new Queen(board, Color.Black), new Position(3, 4));
      board.placePiece(new Queen(board, Color.Black), new Position(4, 2));
      board.placePiece(new Queen(board, Color.Black), new Position(4, 3));
      board.placePiece(new Queen(board, Color.Black), new Position(4, 4));

      const pieceMoves = (i: number, j: number) =>
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
          expect(possibleMoves[i][j]).toBe(pieceMoves(i, j));
        }
      }
    });
  });
});
