import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { King } from '../king';

export class KingWhite extends King {
  constructor(board: BoardInterface) {
    super(board, Color.White);
  }

  //@Override
  public toString(): string {
    return '♔';
  }
}
