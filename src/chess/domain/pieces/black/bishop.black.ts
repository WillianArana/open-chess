import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Bishop } from '../bishop';

export class BishopBlack extends Bishop {
  constructor(board: BoardInterface) {
    super(board, Color.Black);
  }
  //@Override
  public toString(): string {
    return 'b';
  }
}
