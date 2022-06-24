import { BoardInterface } from './interfaces/board.interface';
import { Position } from './position';

export abstract class Piece {
  protected position!: Position;
  constructor(public readonly board: BoardInterface) {}
}
