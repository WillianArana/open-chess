import { ChessPiece } from '../chess-piece';

export class Rook extends ChessPiece {
  //@Override
  public toString(): string {
    return this.isWhite ? '♖' : '♜';
  }
}
