import { ChessPiece } from '../chess-piece';
import { Color } from '../color';

export class King extends ChessPiece {
  //@Override
  public toString(): string {
    return this.color === Color.White ? '♔' : '♚';
  }
}
