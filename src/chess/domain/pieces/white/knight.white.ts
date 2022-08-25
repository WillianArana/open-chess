import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Knight } from '../knight';

export class KnightWhite extends Knight {
  constructor(board: BoardInterface) {
    super(board, Color.White);
  }

  //@Override
  public toString(): string {
    return '♘';
  }
}
