import { ChessMatch } from './chess-match';
import { ChessPosition } from './chess-position';
import { Color } from './color';

describe('ChessMatch', () => {
  it('should be create "ChessMatch"', () => {
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
      expect(pieces.length).toBe(8);
      expect(pieces[0].length).toBe(8);
      expect(pieces[1].length).toBe(8);
      expect(pieces[2].length).toBe(8);
      expect(pieces[3].length).toBe(8);
      expect(pieces[4].length).toBe(8);
      expect(pieces[5].length).toBe(8);
      expect(pieces[6].length).toBe(8);
      expect(pieces[7].length).toBe(8);
      expect(pieces[8]).toBeUndefined();
    });
  });

  describe('possibleMoves', () => {
    it('should get possible moves', () => {
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const possibleMoves = chessMatch.possibleMoves(source);
      expect(possibleMoves.length).toBeGreaterThan(0);
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
      const chessMatch = new ChessMatch();
      const source = new ChessPosition('e', 2);
      const target = new ChessPosition('e', 7);
      const capturedPiece = chessMatch.performChessMove(source, target);
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

    it('should throw an error when player putt yourself in check', () => {
      const chessMatch = new ChessMatch();
      let source = new ChessPosition('e', 2);
      let target = new ChessPosition('e', 7);
      chessMatch.performChessMove(source, target);

      source = new ChessPosition('d', 7);
      target = new ChessPosition('e', 7);
      chessMatch.performChessMove(source, target);

      source = new ChessPosition('d', 2);
      target = new ChessPosition('d', 8);

      expect(() => chessMatch.performChessMove(source, target)).toThrowError(
        `You can't putt yourself in check`
      );
    });
  });
});
