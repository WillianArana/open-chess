import { ChessMatch } from './chess-match';
import { ChessPosition } from './chess-position';
import { Color } from './color';
import { Bishop } from './pieces/bishop';
import { King } from './pieces/king';
import { Knight } from './pieces/knight';
import { Pawn } from './pieces/pawn';
import { Queen } from './pieces/queen';
import { Rook } from './pieces/rook';

describe('ChessMatch', () => {
  it('should be create', () => {
    expect(new ChessMatch()).toBeDefined();
  });

  it('should be start match with "WHITE" player', () => {
    const chessMatch = new ChessMatch();
    expect(chessMatch.currentPlayer).toBe(Color.White);
  });

  it('should be start match with turn one', () => {
    const chessMatch = new ChessMatch();
    expect(chessMatch.turn).toBe(1);
  });

  it('should be not is check', () => {
    const chessMatch = new ChessMatch();
    expect(chessMatch.isCheck).toBe(false);
  });

  describe('pieces', () => {
    it('should get pieces', () => {
      const chessMatch = new ChessMatch();
      const pieces = chessMatch.pieces();
      expect(pieces).toBeDefined();
      expect(pieces.rows).toBe(8);
      expect(pieces.columns).toBe(8);
    });

    it('should get pieces in right places (WHITE)', () => {
      const white = Color.White;
      const chessMatch = new ChessMatch();
      const pieces = chessMatch.pieces();

      let position = new ChessPosition('a', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Rook);
      expect(pieces.get(position).color).toBe(white);

      position = new ChessPosition('b', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Knight);
      expect(pieces.get(position).color).toBe(white);

      position = new ChessPosition('c', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Bishop);
      expect(pieces.get(position).color).toBe(white);

      position = new ChessPosition('d', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Queen);
      expect(pieces.get(position).color).toBe(white);

      position = new ChessPosition('e', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(King);
      expect(pieces.get(position).color).toBe(white);

      position = new ChessPosition('f', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Bishop);
      expect(pieces.get(position).color).toBe(white);

      position = new ChessPosition('g', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Knight);
      expect(pieces.get(position).color).toBe(white);

      position = new ChessPosition('h', 1).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Rook);
      expect(pieces.get(position).color).toBe(white);

      for (let row of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
        position = new ChessPosition(row as any, 2).toPosition();
        expect(pieces.get(position)).toBeInstanceOf(Pawn);
        expect(pieces.get(position).color).toBe(white);

        for (let i = 3; i < 5; i++) {
          position = new ChessPosition(row as any, i as any).toPosition();
          expect(pieces.get(position)).toBeNull();
        }
      }
    });

    it('should get pieces in right places (BLACK)', () => {
      const black = Color.Black;
      const chessMatch = new ChessMatch();
      const pieces = chessMatch.pieces();

      let position = new ChessPosition('a', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Rook);
      expect(pieces.get(position).color).toBe(black);

      position = new ChessPosition('b', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Knight);
      expect(pieces.get(position).color).toBe(black);

      position = new ChessPosition('c', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Bishop);
      expect(pieces.get(position).color).toBe(black);

      position = new ChessPosition('d', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Queen);
      expect(pieces.get(position).color).toBe(black);

      position = new ChessPosition('e', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(King);
      expect(pieces.get(position).color).toBe(black);

      position = new ChessPosition('f', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Bishop);
      expect(pieces.get(position).color).toBe(black);

      position = new ChessPosition('g', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Knight);
      expect(pieces.get(position).color).toBe(black);

      position = new ChessPosition('h', 8).toPosition();
      expect(pieces.get(position)).toBeInstanceOf(Rook);
      expect(pieces.get(position).color).toBe(black);

      for (let row of ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']) {
        position = new ChessPosition(row as any, 7).toPosition();
        expect(pieces.get(position)).toBeInstanceOf(Pawn);
        expect(pieces.get(position).color).toBe(black);

        for (let i = 5; i < 7; i++) {
          position = new ChessPosition(row as any, i as any).toPosition();
          expect(pieces.get(position)).toBeNull();
        }
      }
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const possibleMoves = chessMatch.possibleMoves(source);
      expect(possibleMoves.get(new ChessPosition('e', 3).toPosition())).toBeTruthy();
      expect(possibleMoves.get(new ChessPosition('e', 4).toPosition())).toBeTruthy();
      expect(possibleMoves.get(new ChessPosition('e', 5).toPosition())).toBeFalsy();
    });
  });

  describe('performChessMove', () => {
    it('should be perform chess move', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const target = new ChessPosition('e', 3);
      const capturedPiece = chessMatch.performChessMove(source, target);
      expect(capturedPiece).toEqual(null);
    });

    it('should be captured piece', () => {
      class ChessMatchMock extends ChessMatch {
        protected initialSetup(): void {
          const board = this.board;
          this.placeNewPiece('e', 1, new King(board, Color.White));
          this.placeNewPiece('e', 2, new Rook(board, Color.White));

          this.placeNewPiece('e', 8, new King(board, Color.Black));
          this.placeNewPiece('e', 7, new Rook(board, Color.Black));
        }
      }

      const chessMatchMock = new ChessMatchMock();
      const source = new ChessPosition('e', 2);
      const target = new ChessPosition('e', 7);
      const capturedPiece = chessMatchMock.performChessMove(source, target);
      expect(capturedPiece).not.toEqual(null);
    });

    it('should throw an error when there is no piece on source position', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('a', 3);
      const target = new ChessPosition('a', 5);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        'There is no piece on source position'
      );
    });

    it('should throw an error when there is no possible moves for the chosen piece', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 1);
      const target = new ChessPosition('e', 2);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        'There is no possible moves for the chosen piece'
      );
    });

    it(`should throw an error when there chose piece can't move to target position`, () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const target = new ChessPosition('e', 1);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        `There chose piece can't move to target position`
      );
    });

    it('should throw an error when piece is not yours', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 7);
      const target = new ChessPosition('e', 6);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        'The chosen piece is not yours'
      );
    });

    it('should throw an error when player put yourself in check', () => {
      class ChessMatchMock extends ChessMatch {
        protected initialSetup(): void {
          const board = this.board;
          this.placeNewPiece('e', 1, new King(board, Color.White));
          this.placeNewPiece('e', 2, new Rook(board, Color.White));
          this.placeNewPiece('d', 2, new Rook(board, Color.White));
          this.placeNewPiece('f', 2, new Rook(board, Color.White));
          this.placeNewPiece('d', 1, new Rook(board, Color.White));
          this.placeNewPiece('f', 1, new Rook(board, Color.White));

          this.placeNewPiece('e', 8, new King(board, Color.Black));
          this.placeNewPiece('d', 8, new Rook(board, Color.Black));
          this.placeNewPiece('f', 8, new Rook(board, Color.Black));
          this.placeNewPiece('d', 7, new Rook(board, Color.Black));
          this.placeNewPiece('e', 7, new Rook(board, Color.Black));
          this.placeNewPiece('f', 7, new Rook(board, Color.Black));
        }
      }

      const chessMatchMock = new ChessMatchMock();
      let source = new ChessPosition('e', 2);
      let target = new ChessPosition('e', 7);
      chessMatchMock.performChessMove(source, target);

      source = new ChessPosition('d', 7);
      target = new ChessPosition('e', 7);
      chessMatchMock.performChessMove(source, target);

      source = new ChessPosition('d', 2);
      target = new ChessPosition('d', 8);

      expect(() => chessMatchMock.performChessMove(source, target)).toThrowError(
        `You can't put yourself in check`
      );
    });

    it('should be checkmate', () => {
      class ChessMatchMock extends ChessMatch {
        protected initialSetup(): void {
          const board = this.board;
          this.placeNewPiece('h', 7, new Rook(board, Color.White));
          this.placeNewPiece('d', 1, new Rook(board, Color.White));
          this.placeNewPiece('e', 1, new King(board, Color.White));

          this.placeNewPiece('b', 8, new Rook(board, Color.Black));
          this.placeNewPiece('a', 8, new King(board, Color.Black));
        }
      }

      const chessMatchMock = new ChessMatchMock();
      let source = new ChessPosition('d', 1);
      let target = new ChessPosition('a', 1);
      chessMatchMock.performChessMove(source, target);

      expect(chessMatchMock.isCheck).toBeTruthy();
      expect(chessMatchMock.isCheckMate).toBeTruthy();
    });
  });
});
