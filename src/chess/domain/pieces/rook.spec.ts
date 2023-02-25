import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';
import { Color } from '../color';
import { Rook } from './rook';

describe('Rook', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new Rook(new Board(1, 1), Color.White)).toBeDefined();
  });

  it(`should be a "ChessPiece"`, () => {
    expect(new Rook(new Board(1, 1), Color.White)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new Rook(board, Color.White);
      expect(piece.toString()).toBe('♖');
    });

    it('should get black piece', () => {
      const piece = new Rook(board, Color.Black);
      expect(piece.toString()).toBe('♜');
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves with empty board', () => {
      const piece = new Rook(board, Color.White);
      Object.assign(piece, { position: new Position(3, 3) });
      const pieceMoves = (i: number, j: number) =>
        (i === 0 && j === 3) ||
        (i === 1 && j === 3) ||
        (i === 2 && j === 3) ||
        (i === 4 && j === 3) ||
        (i === 5 && j === 3) ||
        (i === 6 && j === 3) ||
        (i === 7 && j === 3) ||
        (i === 3 && j === 0) ||
        (i === 3 && j === 1) ||
        (i === 3 && j === 2) ||
        (i === 3 && j === 4) ||
        (i === 3 && j === 5) ||
        (i === 3 && j === 6) ||
        (i === 3 && j === 7);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with all Rooks', () => {
      const piece = new Rook(board, Color.White);
      board.placePiece(piece, new Position(7, 0));
      board.placePiece(new Rook(board, Color.White), new Position(7, 7));
      board.placePiece(new Rook(board, Color.Black), new Position(0, 0));
      board.placePiece(new Rook(board, Color.Black), new Position(0, 7));
      const pieceMoves = (i: number, j: number) =>
        (i === 0 && j === 0) ||
        (i === 1 && j === 0) ||
        (i === 2 && j === 0) ||
        (i === 3 && j === 0) ||
        (i === 4 && j === 0) ||
        (i === 5 && j === 0) ||
        (i === 6 && j === 0) ||
        (i === 7 && j === 1) ||
        (i === 7 && j === 2) ||
        (i === 7 && j === 3) ||
        (i === 7 && j === 4) ||
        (i === 7 && j === 5) ||
        (i === 7 && j === 6);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with opponents around', () => {
      const piece = new Rook(board, Color.White);
      board.placePiece(piece, new Position(3, 3));
      board.placePiece(new Rook(board, Color.Black), new Position(2, 2));
      board.placePiece(new Rook(board, Color.Black), new Position(2, 3));
      board.placePiece(new Rook(board, Color.Black), new Position(2, 4));
      board.placePiece(new Rook(board, Color.Black), new Position(3, 2));
      board.placePiece(new Rook(board, Color.Black), new Position(3, 4));
      board.placePiece(new Rook(board, Color.Black), new Position(4, 2));
      board.placePiece(new Rook(board, Color.Black), new Position(4, 3));
      board.placePiece(new Rook(board, Color.Black), new Position(4, 4));

      const pieceMoves = (i: number, j: number) =>
        (i === 2 && j === 3) ||
        (i === 4 && j === 3) ||
        (i === 3 && j === 2) ||
        (i === 3 && j === 4);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });
  });
});
