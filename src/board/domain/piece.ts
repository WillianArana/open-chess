import { Board } from './board';
import { Position } from './position';

export class Piece {
  protected position!: Position;
  private readonly _board: Board;

  constructor(board: Board) {
    this._board = board;
  }

  get board(): Board {
    return this._board;
  }
}
