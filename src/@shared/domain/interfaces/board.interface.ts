import { Matrix } from '../matrix';
import { Piece } from '../piece';
import { PositionInterface } from './position.interface';

export interface BoardInterface {
  readonly rows: number;
  readonly columns: number;
  pieces(): Matrix<Piece | null>;
  piece(position: PositionInterface): Piece | null;
  positionExists(position: PositionInterface): boolean;
  thereIsAPiece(position: PositionInterface): boolean;
}
