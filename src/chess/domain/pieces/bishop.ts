import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';

export class Bishop extends ChessPiece {
  //@Override
  public possibleMoves(): boolean[][] {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possibleNorthwestMove(possibleMoves);
    this.possibleNortheastMove(possibleMoves);
    this.possibleSouthwestMove(possibleMoves);
    this.possibleSoutheastMove(possibleMoves);
    return possibleMoves;
  }

  private possibleNorthwestMove(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleNortheastMove(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSouthwestMove(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleSoutheastMove(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♗' : '♝';
  }
}
