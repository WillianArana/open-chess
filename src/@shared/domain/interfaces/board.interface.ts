import { Piece } from '../piece';
import { Position } from '../position';

export interface BoardInterface {
  piece(position: Position): Piece | undefined;
}
