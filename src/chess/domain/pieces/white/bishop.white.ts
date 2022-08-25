import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Bishop } from '../bishop';

export class BishopWhite extends Bishop {
  constructor(board: BoardInterface) {
    super(board, Color.White);
  }
  //@Override
  public toString(): string {
    return '♗';
  }
}
