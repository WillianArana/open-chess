export class Position {
  constructor(public readonly row: number, public readonly column: number) {}

  //@Override
  public toString(): string {
    return `${this.row}, ${this.column}`;
  }
}
