import { PositionInterface } from '../interfaces/position.interface';
import { MatrixIterator } from './matrix.iterator';
import { MatrixIteratorInterface } from './matrix.iterator.interface';

export class Matrix<T = unknown> {
  private readonly _items: T[][];
  private readonly _iterator: MatrixIteratorInterface<T>;
  constructor(
    public readonly rows: number,
    public readonly columns: number,
    startValue = null as unknown as T
  ) {
    const items = this.buildItems(startValue);
    this._iterator = new MatrixIterator(items, startValue, rows, columns);
    this._items = items;
  }

  private buildItems(startValue: T): T[][] {
    const matrix: T[][] = [];
    for (let x = 0; x < this.rows; x++) {
      const row: T[] = [];
      for (let y = 0; y < this.columns; y++) {
        row.push(startValue);
      }
      matrix.push(row);
    }
    return matrix;
  }

  get(position: PositionInterface): T {
    return this._items[position.row][position.column];
  }

  set(item: T, position: PositionInterface): void {
    this._items[position.row][position.column] = item;
  }

  fill(resource: Matrix<T>): void {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        const position = { row: i, column: j };
        this.set(resource.get(position), position);
      }
    }
  }

  [Symbol.iterator](): MatrixIteratorInterface<T> {
    this._iterator.reset();
    return this._iterator;
  }
}
