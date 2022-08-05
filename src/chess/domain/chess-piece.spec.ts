import { Board } from '@src/board/domain/board';

import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { ChessPiece } from './chess-piece';
import { Color } from './color';

class ChessPieceMock extends ChessPiece {
  public possibleMoves(): boolean[][] {
    return this.createMatrixPossibleMoves();
  }
}

describe('ChessPiece', () => {
  it('should be create', () => {
    const board = {} as BoardInterface;
    expect(new ChessPieceMock(board, Color.Black)).toBeDefined();
  });

  it('should get board', () => {
    const board = new Board(9, 9);
    const piece = new ChessPieceMock(board, Color.White);
    expect(piece.board).toBeInstanceOf(Board);
  });

  it('should get color', () => {
    const board = new Board(6, 6);
    const piece = new ChessPieceMock(board, Color.White);
    expect(piece.color).toBe(Color.White);
    expect(piece.isWhite).toBeTruthy();
  });
});
