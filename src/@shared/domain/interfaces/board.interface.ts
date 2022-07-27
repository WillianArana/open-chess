import { Position } from '../../../board/domain/position';
import { Piece } from '../piece';

export interface BoardInterface {
  piece(position: Position): Piece | null;
}
