import { MatrixIteratorInterface } from './interfaces/matrix.iterator.interface';
import { PositionInterface } from './interfaces/position.interface';

export class MatrixIterator<T = unknown> implements MatrixIteratorInterface<T> {
  #row = 0;
  #column = -1;

  constructor(
    private readonly _items: T[][],
    private readonly _startValue: T,
    private readonly _rowLimit: number,
    private readonly _columnLimit: number,
  ) {}

  reset(): void {
    this.#row = 0;
    this.#column = -1;
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
    const value = done ? this._startValue : this._items[this.#row][this.#column];
    return {
      value,
      done,
    };
  }

  private nextColumn(): void {
    this.#column++;
  }

  private isEndOfColumn(): boolean {
    return this.#column + 1 >= this._columnLimit;
  }

  private nextRow(): void {
    this.#row++;
    if (this.#row < this._rowLimit) {
      this.#column = 0;
    }
  }

  private isDone(): boolean {
    return this.#row == this._rowLimit && this.#column + 1 == this._columnLimit;
  }

  public position(): PositionInterface {
    return {
      row: this.#row,
      column: Math.max(0, this.#column),
    };
  }
}
