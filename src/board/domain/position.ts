export class Position {
  private _row: number;
  private _column: number;

  constructor(row: number, column: number) {
    this._row = row;
    this._column = column;
  }

  get row(): number {
    return this._row;
  }

  get column(): number {
    return this._column;
  }

  //@Override
  public toString(): string {
    return `${this._row}, ${this._column}`;
  }
}
