import { Piece } from './piece';

export class Board {
  private _rows: number;
  private _columns: number;
  private _pieces: Piece[][];

  constructor(rows: number, columns: number) {
    this._rows = rows;
    this._columns = columns;
    this._pieces = Array(rows).fill(Array(columns).fill(undefined));
  }
}
