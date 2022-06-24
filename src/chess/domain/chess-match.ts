import { Board } from '@src/board/domain/board';

import createMatrix from '@shared/domain/helpers/create-matrix';

import { ChessPiece } from './chess-piece';

export class ChessMatch {
  private readonly _board: Board;

  constructor() {
    this._board = new Board(8, 8);
  }

  public pieces(): ChessPiece[][] {
    const { rows, columns } = this._board;
    const matrix = createMatrix<ChessPiece>(rows)(columns);
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        matrix[i][j] = this._board.piece({ row: i, column: j }) as ChessPiece;
      }
    }
    return matrix;
  }
}