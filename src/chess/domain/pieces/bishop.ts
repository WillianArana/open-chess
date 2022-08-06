import { Position } from '@src/board/domain/position';

import { Matrix } from '@shared/domain/matrix';

import { ChessPiece } from '../chess-piece';

export class Bishop extends ChessPiece {
  //@Override
  public possibleMoves(): Matrix<boolean> {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possibleNorthwestMoves(possibleMoves);
    this.possibleNortheastMoves(possibleMoves);
    this.possibleSouthwestMoves(possibleMoves);
    this.possibleSoutheastMoves(possibleMoves);
    return possibleMoves;
  }

  private possibleNorthwestMoves(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleNortheastMoves(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSouthwestMoves(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSoutheastMoves(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♗' : '♝';
  }
}
