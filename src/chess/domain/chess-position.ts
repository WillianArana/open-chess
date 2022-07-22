import { Position } from '@src/board/domain/position';

import chars from '@shared/domain/chars';

import { ChessError } from './chess.error';

export type Column = keyof typeof chars;
export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class ChessPosition {
  public static fromPosition(position: Position): ChessPosition {
    const column = String.fromCharCode(chars.a + position.column) as Column;
    const row = (8 - position.row) as Row;
    return new ChessPosition(column, row);
  }

  constructor(public readonly column: Column, public readonly row: Row) {
    column = column[0].toLowerCase() as Column;
    if (!chars[column] || row < 1 || row > 8) {
      throw new ChessError('Error instantiating ChessPosition. Valid values are from a1 to h8.');
    }
  }

  public toPosition(): Position {
    return new Position(8 - this.row, chars[this.column] - chars.a);
  }

  //@Override
  public toString(): string {
    return `${this.column}${this.row}`;
  }
}
