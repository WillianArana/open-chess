import { Position } from '../../board/domain/position';
import { BoardInterface } from './interfaces/board.interface';
import { Matrix } from './matrix';

export abstract class Piece {
  protected position: Position | null;
  constructor(public readonly board: BoardInterface) {
    this.position = null;
  }

  public abstract possibleMoves(): Matrix<boolean>;

  public possibleMove(position: Position): boolean {
    return this.possibleMoves().get(position);
  }

  public isThereAnyPossibleMove(): boolean {
    for (const isPossibleMove of this.possibleMoves()) {
      if (isPossibleMove) return true;
    }
    return false;
  }

  protected createMatrixPossibleMoves(): Matrix<boolean> {
    return new Matrix<boolean>(this.board.rows, this.board.columns, false);
  }
}
