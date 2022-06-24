import { Board } from '@src/board/domain/board';

import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { ChessPiece } from './chess-piece';
import { Color } from './color';

describe('ChessPiece', () => {
  it('should be create a chess piece', () => {
    const board = {} as BoardInterface;
    expect(new ChessPiece(board, Color.Black)).toBeDefined();
  });

  it('should get board', () => {
    const board = new Board(2, 3);
    const piece = new ChessPiece(board, Color.White);
    expect(piece.board).toBeInstanceOf(Board);
  });

  it('should get color', () => {
    const board = new Board(2, 3);
    const piece = new ChessPiece(board, Color.White);
    expect(piece.color).toBe(Color.White);
  });
});
