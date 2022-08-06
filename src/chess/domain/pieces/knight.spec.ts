import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { Knight } from './knight';

describe('Knight', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new Knight(new Board(1, 1), Color.White)).toBeDefined();
  });

  it(`should be a "ChessPiece"`, () => {
    expect(new Knight(new Board(1, 1), Color.White)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new Knight(board, Color.White);
      expect(piece.toString()).toBe('♘');
    });

    it('should get black piece', () => {
      const piece = new Knight(board, Color.Black);
      expect(piece.toString()).toBe('♞');
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves with empty board', () => {
      const piece = new Knight(board, Color.White);
      (piece as any).position = new Position(3, 3);
      const pieceMoves = (i: number, j: number) =>
        (i === 1 && j === 2) ||
        (i === 1 && j === 4) ||
        (i === 2 && j === 1) ||
        (i === 2 && j === 5) ||
        (i === 4 && j === 1) ||
        (i === 4 && j === 5) ||
        (i === 5 && j === 2) ||
        (i === 5 && j === 4);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with opponents around', () => {
      const piece = new Knight(board, Color.White);
      board.placePiece(piece, new Position(3, 3));
      board.placePiece(new Knight(board, Color.Black), new Position(2, 2));
      board.placePiece(new Knight(board, Color.Black), new Position(2, 3));
      board.placePiece(new Knight(board, Color.Black), new Position(2, 4));
      board.placePiece(new Knight(board, Color.Black), new Position(3, 2));
      board.placePiece(new Knight(board, Color.Black), new Position(3, 4));
      board.placePiece(new Knight(board, Color.Black), new Position(4, 2));
      board.placePiece(new Knight(board, Color.Black), new Position(4, 3));
      board.placePiece(new Knight(board, Color.Black), new Position(4, 4));

      board.placePiece(new Knight(board, Color.Black), new Position(1, 2));
      board.placePiece(new Knight(board, Color.Black), new Position(1, 4));
      board.placePiece(new Knight(board, Color.Black), new Position(2, 1));
      board.placePiece(new Knight(board, Color.Black), new Position(2, 5));
      board.placePiece(new Knight(board, Color.Black), new Position(4, 1));
      board.placePiece(new Knight(board, Color.Black), new Position(4, 5));
      board.placePiece(new Knight(board, Color.Black), new Position(5, 2));
      board.placePiece(new Knight(board, Color.Black), new Position(5, 4));

      const pieceMoves = (i: number, j: number) =>
        (i === 1 && j === 2) ||
        (i === 1 && j === 4) ||
        (i === 2 && j === 1) ||
        (i === 2 && j === 5) ||
        (i === 4 && j === 1) ||
        (i === 4 && j === 5) ||
        (i === 5 && j === 2) ||
        (i === 5 && j === 4);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });
  });
});
