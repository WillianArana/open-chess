import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';
import { ChessMatch } from '../chess-match';

import { ChessPiece } from '../chess-piece';
import { ChessPosition } from '../chess-position';
import { Color } from '../color';
import { King } from './king';
import { Rook } from './rook';

class ChessMatchMock extends ChessMatch {
  protected initialSetup(): void {}
}

describe('King', () => {
  let board!: Board;
  let chessMatch!: ChessMatchMock;

  beforeEach(() => {
    board = new Board(8, 8);
    chessMatch = new ChessMatchMock();
  });

  it(`should be create`, () => {
    expect(new King(new Board(1, 1), Color.White, chessMatch)).toBeDefined();
  });

  it(`should be a "ChessPiece"`, () => {
    expect(new King(new Board(1, 1), Color.White, chessMatch)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new King(board, Color.White, chessMatch);
      expect(piece.toString()).toBe('♔');
    });

    it('should get black piece', () => {
      const piece = new King(board, Color.Black, chessMatch);
      expect(piece.toString()).toBe('♚');
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves with empty board', () => {
      const piece = new King(board, Color.White, chessMatch);
      piece.increaseMoveCount();
      Object.assign(piece, { position: new Position(3, 3) });
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
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with all Kings', () => {
      const piece = new King(board, Color.White, chessMatch);
      board.placePiece(piece, new Position(7, 4));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(0, 4));
      const pieceMoves = (i: number, j: number) =>
        (i === 6 && j === 3) ||
        (i === 6 && j === 4) ||
        (i === 6 && j === 5) ||
        (i === 7 && j === 3) ||
        (i === 7 && j === 5);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with opponents around', () => {
      jest.spyOn(chessMatch, 'isCheck', 'get').mockReturnValue(true);
      const piece = new King(board, Color.White, chessMatch);
      board.placePiece(piece, new Position(3, 3));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(2, 2));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(2, 3));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(2, 4));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(3, 2));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(3, 4));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(4, 2));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(4, 3));
      board.placePiece(new King(board, Color.Black, chessMatch), new Position(4, 4));

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
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    describe('castling', () => {
      it('should get castling moves possible', () => {
        const rook = new Rook(board, Color.White);
        board.placePiece(rook, new ChessPosition('a', 1).toPosition());
        board.placePiece(rook, new ChessPosition('h', 1).toPosition());

        const king = new King(board, Color.White, chessMatch);
        board.placePiece(king, new ChessPosition('e', 1).toPosition());

        const pieceMoves = (i: number, j: number) =>
          (i === 6 && j === 3) ||
          (i === 6 && j === 4) ||
          (i === 6 && j === 5) ||
          (i === 7 && j === 2) ||
          (i === 7 && j === 3) ||
          (i === 7 && j === 5) ||
          (i === 7 && j === 6);

        const possibleMoves = king.possibleMoves();
        for (let i = 0; i < possibleMoves.rows; i++) {
          for (let j = 0; j < possibleMoves.columns; j++) {
            expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
          }
        }
      });

      it('should not get castling moves possible when checked', () => {
        jest.spyOn(chessMatch, 'isCheck', 'get').mockReturnValue(true);
        const rook = new Rook(board, Color.White);
        board.placePiece(rook, new ChessPosition('a', 1).toPosition());
        board.placePiece(rook, new ChessPosition('h', 1).toPosition());

        const king = new King(board, Color.White, chessMatch);
        board.placePiece(king, new ChessPosition('e', 1).toPosition());

        const pieceMoves = (i: number, j: number) =>
          (i === 6 && j === 3) ||
          (i === 6 && j === 4) ||
          (i === 6 && j === 5) ||
          (i === 7 && j === 3) ||
          (i === 7 && j === 5);

        const possibleMoves = king.possibleMoves();
        for (let i = 0; i < possibleMoves.rows; i++) {
          for (let j = 0; j < possibleMoves.columns; j++) {
            expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
          }
        }
      });
    });
  });
});
