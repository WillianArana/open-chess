import createMatrix from '@shared/domain/helpers/create-matrix';
import { Piece } from '@shared/domain/piece';

import { BoardInterface } from '../../@shared/domain/interfaces/board.interface';
import { Position } from './position';

export class Board implements BoardInterface {
  private readonly _pieces: Piece[][];

  constructor(public readonly rows: number, public readonly columns: number) {
    this._pieces = createMatrix<Piece>(rows)(columns);
  }

  public piece(position: Position | { row: number; column: number }): Piece | undefined {
    const { row, column } = position;
    return this._pieces[row][column];
  }

  public placePiece(piece: Piece, position: Position): Board {
    const { row, column } = position;
    this._pieces[row][column] = piece;
    piece.position = position;
    return this;
  }
}
