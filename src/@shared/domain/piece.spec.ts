import { Board } from '../../board/domain/board';
import createMatrix from './helpers/create-matrix';
import { Piece } from './piece';

class PieceMock extends Piece {
  public possibleMoves(): boolean[][] {
    return this.createMatrixPossibleMoves();
  }
}

class FoolPieceMock extends PieceMock {
  protected createMatrixPossibleMoves(): boolean[][] {
    const { rows, columns } = this.board;
    return createMatrix<boolean>(rows)(columns, true);
  }
}

const entity = Piece.name;
describe(entity, () => {
  it('should be create piece', () => {
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
