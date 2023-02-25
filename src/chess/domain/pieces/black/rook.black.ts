import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Rook } from '../rook';

export class RookBlack extends Rook {
  constructor(board: BoardInterface) {
    super(board, Color.Black);
  }

  //@Override
  public toString(): string {
    return 'r';
  }
}
