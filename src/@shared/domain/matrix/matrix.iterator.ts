import { MatrixIteratorInterface } from './matrix.iterator.interface';

export class MatrixIterator<T = unknown> implements MatrixIteratorInterface<T> {
  private _row = 0;
  private _column = -1;

  constructor(
    private readonly _items: T[][],
    private readonly _startValue: T,
    private readonly _rowLimit: number,
    private readonly _columnLimit: number
  ) {}

  reset(): void {
    this._row = 0;
    this._column = -1;
  }

  next(): IteratorResult<T> {
    const isEndOfColumn = this.isEndOfColumn();
    !isEndOfColumn && this.nextColumn();
    isEndOfColumn && this.nextRow();
    const result = this.makeResult();
    return result;
  }

  private makeResult(): IteratorResult<T> {
    const done = this.isDone();
    const value = done ? this._startValue : this._items[this._row][this._column];
    return {
      value,
      done,
    };
  }

  private nextColumn(): void {
    this._column++;
  }

  private isEndOfColumn(): boolean {
    return this._column + 1 >= this._columnLimit;
  }

  private nextRow(): void {
    this._row++;
    if (this._row < this._rowLimit) {
      this._column = 0;
    }
  }

  private isDone(): boolean {
    return this._row == this._rowLimit && this._column + 1 == this._columnLimit;
  }
}
