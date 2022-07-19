import { Position } from '../../board/domain/position';
import { BoardInterface } from './interfaces/board.interface';

export abstract class Piece {
  public position!: Position;
  constructor(public readonly board: BoardInterface) {}
}
