import createMatrix from '@shared/domain/helpers/create-matrix';
import { Piece } from '@shared/domain/piece';
import { Position } from '@shared/domain/position';

import { BoardInterface } from '../../@shared/domain/interfaces/board.interface';

export class Board implements BoardInterface {
  public readonly rows: number;
  public readonly columns: number;

  private readonly _pieces: Piece[][];

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this._pieces = createMatrix<Piece>(rows)(columns);
  }

  public piece(position: Position | { row: number; column: number }): Piece | undefined {
    const { row, column } = position;
    return this._pieces[row][column];
  }
}
