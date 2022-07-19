import { Board } from '@src/board/domain/board';
import { Position } from '@src/board/domain/position';

import createMatrix from '@shared/domain/helpers/create-matrix';

import { ChessPiece } from './chess-piece';
import { Color } from './color';
import { King } from './pieces/king';
import { Rook } from './pieces/rook';

export class ChessMatch {
  private readonly _board: Board;

  constructor() {
    this._board = new Board(8, 8);
    this.initialSetup();
  }

  public pieces(): ChessPiece[][] {
    const { rows, columns } = this._board;
    const matrix = createMatrix<ChessPiece>(rows)(columns);
    this.fillPieces(matrix);
    return matrix;
  }

  private fillPieces(pieces: ChessPiece[][]): void {
    const { rows, columns } = this._board;
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        pieces[i][j] = this._board.piece({ row: i, column: j }) as ChessPiece;
      }
    }
  }

  private initialSetup(): void {
    const board = this._board;
    board
      .placePiece(new Rook(board, Color.White), new Position(2, 1))
      .placePiece(new King(board, Color.Black), new Position(0, 4))
      .placePiece(new King(board, Color.White), new Position(7, 4));
  }
}
