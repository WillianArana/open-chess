import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';

const above = 1;
const below = -1;

export class Pawn extends ChessPiece {
  private readonly _direction = this.isWhite ? above : below;

  //@Override
  public possibleMoves(): boolean[][] {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possibleDirectionMoves(possibleMoves);
    this.possibleOpponentPositionMoves(possibleMoves);
    return possibleMoves;
  }

  private possibleDirectionMoves(possibleMoves: boolean[][]): void {
    if (this.position) {
      let position = new Position(this.position.row - this._direction, this.position.column);
      if (this.canMoveInEmptyPosition(position)) {
        possibleMoves[position.row][position.column] = true;
        if (this.moveCount == 0) {
          position = new Position(this.position.row - this._direction * 2, this.position.column);
          if (this.canMoveInEmptyPosition(position)) {
            possibleMoves[position.row][position.column] = true;
          }
        }
      }
    }
  }

  private possibleOpponentPositionMoves(possibleMoves: boolean[][]): void {
    let createPosition = (row: number, column: number) =>
      new Position(row - this._direction, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);

    createPosition = (row: number, column: number) =>
      new Position(row - this._direction, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  //@Override
  protected setPossibleMoves(
    possibleMoves: boolean[][],
    createPosition: (row: number, column: number) => Position
  ): void {
    if (this.position) {
      const position = createPosition(this.position.row, this.position.column);
      if (this.canMoveInOpponentPosition(position)) {
        possibleMoves[position.row][position.column] = true;
      }
    }
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♙' : '♟';
  }
}