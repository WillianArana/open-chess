import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Rook } from '../rook';

export class RookWhite extends Rook {
  constructor(board: BoardInterface) {
    super(board, Color.White);
  }

  //@Override
  public toString(): string {
    return '♖';
  }
}
