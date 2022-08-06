import { Position } from '@src/board/domain/position';

import { Matrix } from '@shared/domain/matrix/matrix';

import { ChessPiece } from '../chess-piece';

export class King extends ChessPiece {
  //@Override
  public possibleMoves(): Matrix<boolean> {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possibleAboveMove(possibleMoves);
    this.possibleBelowMove(possibleMoves);
    this.possibleLeftMove(possibleMoves);
    this.possibleRightMove(possibleMoves);
    this.possibleNorthwestMove(possibleMoves);
    this.possibleNortheastMove(possibleMoves);
    this.possibleSouthwestMove(possibleMoves);
    this.possibleSoutheastMove(possibleMoves);
    return possibleMoves;
  }

  private possibleAboveMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleBelowMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleLeftMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleRightMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleNorthwestMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleNortheastMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSouthwestMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSoutheastMove(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  //@Override
  protected setPossibleMoves(
    possibleMoves: Matrix<boolean>,
    createPosition: (row: number, column: number) => Position
  ): void {
    if (this.position) {
      const position = createPosition(this.position.row, this.position.column);
      if (this.canMove(position)) {
        possibleMoves.set(true, position);
      }
    }
  }

  private canMove(position: Position): boolean {
    return this.canMoveInEmptyPosition(position) || this.canMoveInOpponentPosition(position);
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♔' : '♚';
  }
}
