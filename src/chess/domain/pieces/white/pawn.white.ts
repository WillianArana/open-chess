import { BoardInterface } from '@shared/domain/interfaces/board.interface';

import { ChessMatch } from '../../chess-match';
import { Color } from '../../color';
import { Pawn } from '../pawn';

export class PawnWhite extends Pawn {
  constructor(board: BoardInterface, chessMatch: ChessMatch) {
    super(board, Color.White, chessMatch);
  }

  //@Override
  public toString(): string {
    return '♙';
  }
}
