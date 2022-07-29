import { Position } from '../../../board/domain/position';
import { Piece } from '../piece';

export interface BoardInterface {
  readonly rows: number;
  readonly columns: number;
  piece(position: Position): Piece | null;
  positionExists(position: Position): boolean;
  thereIsAPiece(position: Position): boolean;
}
