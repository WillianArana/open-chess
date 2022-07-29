import { Position } from '@src/board/domain/position';

import { ChessPiece } from '../chess-piece';

export class Rook extends ChessPiece {
  //@Override
  public possibleMoves(): boolean[][] {
    const possibleMoves = this.createMatrixPossibleMoves();
    this.possibleAboveMoves(possibleMoves);
    this.possibleLeftMoves(possibleMoves);
    this.possibleRightMoves(possibleMoves);
    this.possibleBelowMoves(possibleMoves);
    return possibleMoves;
  }

  private possibleAboveMoves(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => ({
      row: --row,
      column,
    });
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private setPossibleMoves(
    possibleMoves: boolean[][],
    createPosition: (
      row: number,
      column: number
    ) => {
      row: number;
      column: number;
    }
  ): void {
    const piecePosition = this.position as Position;
    let position = createPosition(piecePosition.row, piecePosition.column);
    while (this.canMoveInEmptyPosition(position)) {
      possibleMoves[position.row][position.column] = true;
      position = createPosition(position.row, position.column);
    }
    if (this.canMoveInOpponentPosition(position)) {
      possibleMoves[position.row][position.column] = true;
    }
  }

  private possibleLeftMoves(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => ({
      row,
      column: --column,
    });
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleRightMoves(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => ({
      row,
      column: ++column,
    });
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  private possibleBelowMoves(possibleMoves: boolean[][]): void {
    const createPosition = (row: number, column: number) => ({
      row: ++row,
      column,
    });
    this.setPossibleMoves(possibleMoves, createPosition);
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♖' : '♜';
  }
}
