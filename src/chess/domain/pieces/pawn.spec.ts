import { Matrix } from '@shared/domain/matrix';
import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';
import { ChessMatch } from '../chess-match';

import { ChessPiece } from '../chess-piece';
import { ChessPosition } from '../chess-position';
import { Color } from '../color';
import { Pawn } from './pawn';

class ChessMatchMock extends ChessMatch {
  protected initialSetup(): void {}
}

describe('Pawn', () => {
  let board!: Board;
  let chessMatch!: ChessMatchMock;

  beforeEach(() => {
    board = new Board(8, 8);
    chessMatch = new ChessMatchMock();
  });

  it(`should be create`, () => {
    expect(new Pawn(new Board(1, 1), Color.White, chessMatch)).toBeDefined();
  });

  it(`should be a "ChessPiece"`, () => {
    expect(new Pawn(new Board(1, 1), Color.White, chessMatch)).toBeInstanceOf(ChessPiece);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new Pawn(board, Color.White, chessMatch);
      expect(piece.toString()).toBe('♙');
    });

    it('should get black piece', () => {
      const piece = new Pawn(board, Color.Black, chessMatch);
      expect(piece.toString()).toBe('♟');
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves with empty board (WHITE)', () => {
      const piece = new Pawn(board, Color.White, chessMatch);
      Object.assign(piece, { position: new Position(3, 3) });
      const pieceMoves = (i: number, j: number) => (i === 2 && j === 3) || (i === 1 && j === 3);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves with empty board (BLACK)', () => {
      const piece = new Pawn(board, Color.Black, chessMatch);
      Object.assign(piece, { position: new Position(3, 3) });
      const pieceMoves = (i: number, j: number) => (i === 4 && j === 3) || (i === 5 && j === 3);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    it('should get possible moves when position is null', () => {
      const pawn = new Pawn(board, Color.White, chessMatch);
      expect(pawn.possibleMoves()).toBeInstanceOf(Matrix);
    });

    it('should get possible moves with opponents around', () => {
      const piece = new Pawn(board, Color.White, chessMatch);
      board.placePiece(piece, new Position(3, 3));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(2, 2));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(2, 3));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(2, 4));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(3, 2));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(3, 4));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(4, 2));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(4, 3));
      board.placePiece(new Pawn(board, Color.Black, chessMatch), new Position(4, 4));

      const pieceMoves = (i: number, j: number) => (i === 2 && j === 2) || (i === 2 && j === 4);

      const possibleMoves = piece.possibleMoves();
      for (let i = 0; i < possibleMoves.rows; i++) {
        for (let j = 0; j < possibleMoves.columns; j++) {
          expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
        }
      }
    });

    describe('en passant', () => {
      describe('with white piece', () => {
        it('should get en passant moves possible (RIGHT)', () => {
          const enPassantVulnerable = new Pawn(board, Color.Black, chessMatch);
          board.placePiece(enPassantVulnerable, new ChessPosition('f', 5).toPosition());
          jest.spyOn(chessMatch, 'enPassantVulnerable', 'get').mockReturnValue(enPassantVulnerable);
          jest.spyOn(enPassantVulnerable, 'moveCount', 'get').mockReturnValue(1);
          const pawn = new Pawn(board, Color.White, chessMatch);
          jest.spyOn(pawn, 'moveCount', 'get').mockReturnValue(2);
          board.placePiece(pawn, new ChessPosition('e', 5).toPosition());

          const pieceMoves = (i: number, j: number) => (i === 2 && j === 4) || (i === 2 && j === 5);
          const possibleMoves = pawn.possibleMoves();
          for (let i = 0; i < possibleMoves.rows; i++) {
            for (let j = 0; j < possibleMoves.columns; j++) {
              expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
            }
          }
        });

        it('should get en passant moves possible (LEFT)', () => {
          const enPassantVulnerable = new Pawn(board, Color.Black, chessMatch);
          board.placePiece(enPassantVulnerable, new ChessPosition('d', 5).toPosition());
          jest.spyOn(chessMatch, 'enPassantVulnerable', 'get').mockReturnValue(enPassantVulnerable);
          jest.spyOn(enPassantVulnerable, 'moveCount', 'get').mockReturnValue(1);
          const pawn = new Pawn(board, Color.White, chessMatch);
          jest.spyOn(pawn, 'moveCount', 'get').mockReturnValue(2);
          board.placePiece(pawn, new ChessPosition('e', 5).toPosition());

          const pieceMoves = (i: number, j: number) => (i === 2 && j === 3) || (i === 2 && j === 4);
          const possibleMoves = pawn.possibleMoves();
          for (let i = 0; i < possibleMoves.rows; i++) {
            for (let j = 0; j < possibleMoves.columns; j++) {
              expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
            }
          }
        });
      });

      describe('with black piece', () => {
        it('should get en passant moves possible (RIGHT)', () => {
          const enPassantVulnerable = new Pawn(board, Color.White, chessMatch);
          board.placePiece(enPassantVulnerable, new ChessPosition('e', 4).toPosition());
          jest.spyOn(chessMatch, 'enPassantVulnerable', 'get').mockReturnValue(enPassantVulnerable);
          jest.spyOn(enPassantVulnerable, 'moveCount', 'get').mockReturnValue(1);
          const pawn = new Pawn(board, Color.Black, chessMatch);
          jest.spyOn(pawn, 'moveCount', 'get').mockReturnValue(2);
          board.placePiece(pawn, new ChessPosition('d', 4).toPosition());

          const pieceMoves = (i: number, j: number) => (i === 5 && j === 3) || (i === 5 && j === 4);
          const possibleMoves = pawn.possibleMoves();
          for (let i = 0; i < possibleMoves.rows; i++) {
            for (let j = 0; j < possibleMoves.columns; j++) {
              expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
            }
          }
        });

        it('should get en passant moves possible (LEFT)', () => {
          const enPassantVulnerable = new Pawn(board, Color.White, chessMatch);
          board.placePiece(enPassantVulnerable, new ChessPosition('e', 4).toPosition());
          jest.spyOn(chessMatch, 'enPassantVulnerable', 'get').mockReturnValue(enPassantVulnerable);
          jest.spyOn(enPassantVulnerable, 'moveCount', 'get').mockReturnValue(1);
          const pawn = new Pawn(board, Color.Black, chessMatch);
          jest.spyOn(pawn, 'moveCount', 'get').mockReturnValue(2);
          board.placePiece(pawn, new ChessPosition('f', 4).toPosition());

          const pieceMoves = (i: number, j: number) => (i === 5 && j === 4) || (i === 5 && j === 5);
          const possibleMoves = pawn.possibleMoves();
          for (let i = 0; i < possibleMoves.rows; i++) {
            for (let j = 0; j < possibleMoves.columns; j++) {
              expect(possibleMoves.get({ row: i, column: j })).toBe(pieceMoves(i, j));
            }
          }
        });
      });
    });
  });
});
