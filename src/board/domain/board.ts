import createMatrix from '@shared/domain/helpers/create-matrix';
import { Piece } from '@shared/domain/piece';
import { Position } from '@shared/domain/position';

import { BoardInterface } from '../../@shared/domain/interfaces/board.interface';

export class Board implements BoardInterface {
  private _rows: number;
  private _columns: number;
  private _pieces: Piece[][];

  constructor(rows: number, columns: number) {
    this._rows = rows;
    this._columns = columns;
    this._pieces = createMatrix<Piece>(rows)(columns);
  }

  get rows(): number {
    return this._rows;
  }

  get columns(): number {
    return this._columns;
  }

  public piece(position: Position | { row: number; column: number }): Piece | undefined {
    const { row, column } = position;
    return this._pieces[row][column];
  }
}
