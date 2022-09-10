import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { ChessMatch } from '../../chess-match';
import { Color } from '../../color';
import { King } from '../king';

export class KingBlack extends King {
  constructor(board: BoardInterface, chessMatch: ChessMatch) {
    super(board, Color.Black, chessMatch);
  }

  //@Override
  public toString(): string {
    return '♚';
  }
}
