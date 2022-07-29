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
    const piecePosition = this.position as Position;
    const column = piecePosition.column;
    let row = piecePosition.row;
    let position = new Position(--row, column);
    while (this.canMoveInEmptyPosition(position)) {
      possibleMoves[position.row][position.column] = true;
      position = new Position(--row, column);
    }
    if (this.canMoveInOpponentPosition(position)) {
      possibleMoves[position.row][position.column] = true;
    }
  }

  private possibleLeftMoves(possibleMoves: boolean[][]): void {
    const piecePosition = this.position as Position;
    let column = piecePosition.column;
    const row = piecePosition.row;
    let position = new Position(row, --column);
    while (this.canMoveInEmptyPosition(position)) {
      possibleMoves[position.row][position.column] = true;
      position = new Position(row, --column);
    }
    if (this.canMoveInOpponentPosition(position)) {
      possibleMoves[position.row][position.column] = true;
    }
  }

  private possibleRightMoves(possibleMoves: boolean[][]): void {
    const piecePosition = this.position as Position;
    let column = piecePosition.column;
    const row = piecePosition.row;
    let position = new Position(row, ++column);
    while (this.canMoveInEmptyPosition(position)) {
      possibleMoves[position.row][position.column] = true;
      position = new Position(row, ++column);
    }
    if (this.canMoveInOpponentPosition(position)) {
      possibleMoves[position.row][position.column] = true;
    }
  }

  private possibleBelowMoves(possibleMoves: boolean[][]): void {
    const piecePosition = this.position as Position;
    const column = piecePosition.column;
    let row = piecePosition.row;
    let position = new Position(++row, column);
    while (this.canMoveInEmptyPosition(position)) {
      possibleMoves[position.row][position.column] = true;
      position = new Position(++row, column);
    }
    if (this.canMoveInOpponentPosition(position)) {
      possibleMoves[position.row][position.column] = true;
    }
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♖' : '♜';
  }
}
