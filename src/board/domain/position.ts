export class Position {
  private _row: number;
  private _column: number;

  constructor(row: number, column: number) {
    this._row = row;
    this._column = column;
  }

  //@Override
  public toString(): string {
    return `${this._row}, ${this._column}`;
  }
}
