import { Board } from '@src/board/domain/board';
import { Rook } from '../rook';
import { RookBlack } from './rook.black';

describe('RookBlack', () => {
  let board!: Board;

  beforeEach(() => {
    board = new Board(8, 8);
  });

  it(`should be create`, () => {
    expect(new RookBlack(new Board(1, 1))).toBeDefined();
  });

  it(`should be a "Rook"`, () => {
    expect(new RookBlack(new Board(1, 1))).toBeInstanceOf(Rook);
  });

  describe('toString', () => {
    it('should get black piece', () => {
      const piece = new RookBlack(board);
      expect(piece.toString()).toBe('♜');
    });
  });
});
