import { ChessMatch } from './chess-match';
import { ChessPosition } from './chess-position';

const entity = ChessMatch.name;
describe(entity, () => {
  it('should be create "ChessMatch"', () => {
    expect(new ChessMatch()).toBeDefined();
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
  });
});
