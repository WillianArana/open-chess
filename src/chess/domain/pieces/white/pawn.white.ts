import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Pawn } from '../pawn';

export class PawnWhite extends Pawn {
  constructor(board: BoardInterface) {
    super(board, Color.White);
  }

  //@Override
  public toString(): string {
    return '♙';
  }
}
