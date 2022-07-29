import { ChessPiece } from '../chess-piece';

export class King extends ChessPiece {
  //@Override
  public possibleMoves(): boolean[][] {
    return this.createMatrixPossibleMoves();
  }

  //@Override
  public toString(): string {
    return this.isWhite ? '♔' : '♚';
  }
}
