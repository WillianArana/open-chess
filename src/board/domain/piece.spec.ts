import { Board } from './board';
import { Piece } from './piece';

describe('Piece', () => {
  it('should be create piece', () => {
    const board = new Board(2, 3);
    expect(new Piece(board)).toBeDefined();
  });

  it('should get board', () => {
    const board = new Board(2, 3);
    const piece = new Piece(board);
    expect(piece.board).toBeInstanceOf(Board);
  });
});
