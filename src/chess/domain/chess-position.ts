import { Position } from '@src/board/domain/position';

import CHARS from '@shared/domain/chars';

import { ChessError } from './chess.error';
import ROWS_AMOUNT from './rows-amount';

export type Column = keyof typeof CHARS;
export type Row = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export class ChessPosition {
  public static fromPosition(position: Position): ChessPosition {
    const column = String.fromCharCode(CHARS.a + position.column) as Column;
    const row = (ROWS_AMOUNT - position.row) as Row;
    return new ChessPosition(column, row);
  }

  constructor(public readonly column: Column, public readonly row: Row) {
    column = column[0].toLowerCase() as Column;
    if (!this.isValidColumn(column) || !this.isValidRow(row)) {
      throw new ChessError('Error instantiating ChessPosition. Valid values are from a1 to h8.');
    }
  }

  private isValidColumn(column: Column): boolean {
    return !!CHARS[column];
  }

  private isValidRow(row: Row): boolean {
    return row > 0 && row < ROWS_AMOUNT + 1;
  }

  public toPosition(): Position {
    return new Position(ROWS_AMOUNT - this.row, CHARS[this.column] - CHARS.a);
  }

  //@Override
  public toString(): string {
    return `${this.column}${this.row}`;
  }
}
