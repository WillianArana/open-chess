import { info } from 'console';
import { ChessPiece } from '../src/chess/domain/chess-piece';

export class UI {
  public static printBoard(pieces: ChessPiece[][]): void {
    const size = pieces.length;
    for (let i = 0; i < size; i++) {
      info(8 - i, ' ');
      for (let j = 0; j < size; j++) {
        UI.printPiece(pieces[i][j]);
      }
      info('\n');
    }
    info('  a b c d e f g h');
  }

  public static printPiece(piece: ChessPiece | null): void {
    !!piece ? info(piece) : info('-');
    info(' ');
  }
}
