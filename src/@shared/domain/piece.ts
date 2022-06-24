import { BoardInterface } from './interfaces/board.interface';
import { Position } from './position';

export abstract class Piece {
  protected position!: Position;
  private readonly _board: BoardInterface;

  constructor(board: BoardInterface) {
    this._board = board;
  }

  get board(): BoardInterface {
    return this._board;
  }
}
