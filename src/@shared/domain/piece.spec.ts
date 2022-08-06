import { Board } from '../../board/domain/board';
import { Matrix } from './matrix/matrix';
import { Piece } from './piece';

class PieceMock extends Piece {
  public possibleMoves(): Matrix<boolean> {
    return this.createMatrixPossibleMoves();
  }
}

class FoolPieceMock extends PieceMock {
  protected createMatrixPossibleMoves(): Matrix<boolean> {
    return new Matrix<boolean>(this.board.rows, this.board.columns, true);
  }
}

describe('Piece', () => {
  it('should be create', () => {
    const board = new Board(2, 2);
    const piece = new PieceMock(board);
    expect(piece).toBeDefined();
  });

  it('should get board', () => {
    const board = new Board(3, 3);
    const piece = new PieceMock(board);
    expect(piece.board).toBeInstanceOf(Board);
  });

  describe('isThereAnyPossibleMove', () => {
    it('should check if is there any possible move', () => {
      const board = new Board(3, 3);
      const piece = new PieceMock(board);
      const chessPiece = new FoolPieceMock(board);
      expect(piece.isThereAnyPossibleMove()).toBeFalsy();
      expect(chessPiece.isThereAnyPossibleMove()).toBeTruthy();
    });
  });
});
