import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { Bishop } from './bishop';

describe('Bishop', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new Bishop(new Board(1, 1), Color.White)).toBeDefined();
  });

  it(`should be a "ChessPiece"`, () => {
    expect(new Bishop(new Board(1, 1), Color.White)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new Bishop(board, Color.White);
      expect(piece.toString()).toBe('♗');
    });

    it('should get black piece', () => {
      const piece = new Bishop(board, Color.Black);
      expect(piece.toString()).toBe('♝');
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves with empty board', () => {
      const piece = new Bishop(board, Color.White);
      (piece as any).position = new Position(3, 3);
      const pieceMoves = (i: number, j: number) =>
        (i === 0 && j === 0) ||
        (i === 1 && j === 1) ||
        (i === 2 && j === 2) ||
        (i === 4 && j === 4) ||
        (i === 5 && j === 5) ||
        (i === 6 && j === 6) ||
        (i === 7 && j === 7) ||
        (i === 0 && j === 6) ||
        (i === 1 && j === 5) ||
        (i === 2 && j === 4) ||
        (i === 4 && j === 2) ||
        (i === 5 && j === 1) ||
        (i === 6 && j === 0);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with opponents around', () => {
      const piece = new Bishop(board, Color.White);
      board.placePiece(piece, new Position(3, 3));
      board.placePiece(new Bishop(board, Color.Black), new Position(2, 2));
      board.placePiece(new Bishop(board, Color.Black), new Position(2, 3));
      board.placePiece(new Bishop(board, Color.Black), new Position(2, 4));
      board.placePiece(new Bishop(board, Color.Black), new Position(3, 2));
      board.placePiece(new Bishop(board, Color.Black), new Position(3, 4));
      board.placePiece(new Bishop(board, Color.Black), new Position(4, 2));
      board.placePiece(new Bishop(board, Color.Black), new Position(4, 3));
      board.placePiece(new Bishop(board, Color.Black), new Position(4, 4));

      const pieceMoves = (i: number, j: number) =>
        (i === 2 && j === 2) ||
        (i === 2 && j === 4) ||
        (i === 4 && j === 2) ||
        (i === 4 && j === 4);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });
  });
});
