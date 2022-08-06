import { MatrixIteratorInterface } from './interfaces/matrix.iterator.interface';
import { PositionInterface } from './interfaces/position.interface';
import { MatrixIterator } from './matrix.iterator';

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

  get position(): PositionInterface {
    return this._iterator.position();
  }

  private buildItems(startValue: T): T[][] {
    const items: T[][] = [];
    for (let row = 0; row < this.rows; row++) {
      const item: T[] = [];
      for (let column = 0; column < this.columns; column++) {
        item.push(startValue);
      }
      items.push(item);
    }
    return items;
  }

  get(position: PositionInterface): T {
    return this._items[position.row][position.column];
  }

  set(item: T, position: PositionInterface): void {
    this._items[position.row][position.column] = item;
  }

  fill(resource: Matrix<T>): void {
    for (let row = 0; row < this.rows; row++) {
      for (let column = 0; column < this.columns; column++) {
        const position = { row, column };
        this.set(resource.get(position), position);
      }
    }
  }

  [Symbol.iterator](): MatrixIteratorInterface<T> {
    this._iterator.reset();
    return this._iterator;
  }
}
