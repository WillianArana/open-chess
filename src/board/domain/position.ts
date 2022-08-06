import { PositionInterface } from '@shared/domain/interfaces/position.interface';

export class Position implements PositionInterface {
  constructor(public readonly row: number, public readonly column: number) {}

  //@Override
  public toString(): string {
    return `${this.row}, ${this.column}`;
  }
}
