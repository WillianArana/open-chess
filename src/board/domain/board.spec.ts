import { Board } from './board';
import { Position } from './position';

describe('Board', () => {
  it('should be create board', () => {
    expect(new Board(0, 0)).toBeDefined();
  });

  it('should get rows', () => {
    const board = new Board(2, 2);
    expect(board.rows).toBe(2);
  });

  it('should get columns', () => {
    const board = new Board(5, 5);
    expect(board.columns).toBe(5);
  });

  describe('piece', () => {
    it('should get piece', () => {
      const board = new Board(8, 8);
      const position = new Position(4, 4);
      const piece = board.piece(position);
      expect(piece).toBeNull();
    });
  });
});
