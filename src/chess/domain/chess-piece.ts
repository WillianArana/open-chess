import { BoardInterface } from '@shared/domain/interfaces/board.interface';
import { Piece } from '@shared/domain/piece';

import { Color } from './color';

export class ChessPiece extends Piece {
  public readonly color: Color;
  constructor(board: BoardInterface, color: Color) {
    super(board);
    this.color = color;
  }

  public get isWhite(): boolean {
    return this.color === Color.White;
  }
}
