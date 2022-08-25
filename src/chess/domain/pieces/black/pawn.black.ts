import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Pawn } from '../pawn';

export class PawnBlack extends Pawn {
  constructor(board: BoardInterface) {
    super(board, Color.Black);
  }

  //@Override
  public toString(): string {
    return '♟';
  }
}
