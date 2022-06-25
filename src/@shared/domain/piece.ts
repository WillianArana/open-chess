import { Position } from '../../board/domain/position';
import { BoardInterface } from './interfaces/board.interface';

export abstract class Piece {
  protected position!: Position;
  constructor(public readonly board: BoardInterface) {}
}
