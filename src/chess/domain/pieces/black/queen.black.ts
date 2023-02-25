import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Queen } from '../queen';

export class QueenBlack extends Queen {
  constructor(board: BoardInterface) {
    super(board, Color.Black);
  }

  //@Override
  public toString(): string {
    return 'q';
  }
}
