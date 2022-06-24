import { Board } from '../../board/domain/board';
import { Piece } from './piece';

class PieceMock extends Piece {}

describe('Piece', () => {
  it('should be create piece', () => {
    const board = new Board(2, 3);
    const piece = new PieceMock(board);
    expect(piece).toBeDefined();
  });

  it('should get board', () => {
    const board = new Board(2, 3);
    const piece = new PieceMock(board);
    expect(piece.board).toBeInstanceOf(Board);
  });
});
