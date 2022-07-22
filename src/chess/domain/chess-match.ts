import { Board } from '@src/board/domain/board';

import createMatrix from '@shared/domain/helpers/create-matrix';

import { ChessPiece } from './chess-piece';
import { ChessPosition, Column, Row } from './chess-position';
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

    //#region WHITE PIECES
    this.placeNewPiece('e', 1, new King(board, Color.White));
    //#endregion

    //#region BLACK PIECES
    this.placeNewPiece('e', 8, new King(board, Color.Black));
    this.placeNewPiece('b', 6, new Rook(board, Color.White));
    //#endregion
  }

  private placeNewPiece(column: Column, row: Row, piece: ChessPiece): void {
    const position = new ChessPosition(column, row).toPosition();
    this._board.placePiece(piece, position);
  }
}
