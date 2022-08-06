import { Position } from '@src/board/domain/position';

import { Matrix } from '@shared/domain/matrix/matrix';

import { ChessPiece } from '../chess-piece';

export class Knight extends ChessPiece {
  //@Override
  public possibleMoves(): Matrix<boolean> {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possible01Move(possibleMoves);
    this.possible02Move(possibleMoves);
    this.possible03Move(possibleMoves);
    this.possible04Move(possibleMoves);
    this.possible05Move(possibleMoves);
    this.possible06Move(possibleMoves);
    this.possible07Move(possibleMoves);
    this.possible08Move(possibleMoves);
    return possibleMoves;
  }

  private possible01Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column - 2);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possible02Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 2, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possible03Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 2, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possible04Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row - 1, column + 2);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possible05Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column + 2);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possible06Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 2, column + 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possible07Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 2, column - 1);
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possible08Move(possibleMoves: Matrix<boolean>): void {
    const createPosition = (row: number, column: number) => new Position(row + 1, column - 2);
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
    return this.isWhite ? '♘' : '♞';
  }
}
