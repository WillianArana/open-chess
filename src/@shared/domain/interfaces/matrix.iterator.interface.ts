import { PositionInterface } from './position.interface';

export interface MatrixIteratorInterface<T> extends Iterator<T> {
  reset(): void;
  position(): PositionInterface;
}
