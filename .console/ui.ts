import { info } from 'console';
import { ChessPiece } from '../src/chess/domain/chess-piece';

export class UI {
  public static printBoard(pieces: ChessPiece[][]): void {
    const size = pieces.length;
    for (let i = 0; i < size; i++) {
      let row = `${8 - i} `;
      for (let j = 0; j < size; j++) {
        const piece = pieces[i][j] as ChessPiece | null;
        row += !!piece ? `${piece}` : '-';
        row += ' ';
      }
      info(row);
    }
    info('  a b c d e f g h');
  }
}
