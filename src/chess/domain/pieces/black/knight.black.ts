import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Knight } from '../knight';

export class KnightBlack extends Knight {
  constructor(board: BoardInterface) {
    super(board, Color.Black);
  }

  //@Override
  public toString(): string {
    return '♞';
  }
}
