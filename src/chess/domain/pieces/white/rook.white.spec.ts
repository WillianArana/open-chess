import { Board } from '@src/board/domain/board';
import { Rook } from '../rook';
import { RookWhite } from './rook.white';

describe('RookWhite', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new RookWhite(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Rook"`, () => {
    expect(new RookWhite(new Board(1, 1))).toBeInstanceOf(Rook);
  });

  describe('toString', () => {
    it('should get white piece', () => {
      const piece = new RookWhite(board);
      expect(piece.toString()).toBe('R');
    });
  });
});
