import { Position } from '../../board/domain/position';
import createMatrix from './helpers/create-matrix';
import { BoardInterface } from './interfaces/board.interface';

export abstract class Piece {
  public position: Position | null;
  constructor(public readonly board: BoardInterface) {
    this.position = null;
  }

  public abstract possibleMoves(): boolean[][];

  public possibleMove(position: Position): boolean {
    return this.possibleMoves()[position.row][position.column];
  }

  public isThereAnyPossibleMove(): boolean {
    const possibleMoves = this.possibleMoves();
    for (let i = 0; i < possibleMoves.length; i++) {
      for (let j = 0; j < possibleMoves.length; j++) {
        if (possibleMoves[i][j]) return true;
      }
    }
    return false;
  }

  protected createMatrixPossibleMoves(): boolean[][] {
    const { rows, columns } = this.board;
    return createMatrix<boolean>(rows)(columns, false);
  }
}
