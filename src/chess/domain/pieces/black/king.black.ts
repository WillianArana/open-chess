import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { Color } from '../../color';
import { King } from '../king';

export class KingBlack extends King {
  constructor(board: BoardInterface) {
    super(board, Color.Black);
  }

  //@Override
  public toString(): string {
    return '♚';
  }
}
