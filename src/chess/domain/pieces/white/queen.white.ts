import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { Queen } from '../queen';

export class QueenWhite extends Queen {
  constructor(board: BoardInterface) {
    super(board, Color.White);
  }

  //@Override
  public toString(): string {
    return '♕';
  }
}
