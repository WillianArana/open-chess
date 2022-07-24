import { info } from 'console';
import { ChessPiece } from '../src/chess/domain/chess-piece';

type UI_COLOR = keyof typeof UI;

export class UI {
  public static ANSI_RESET = '\u001B[0m';
  public static ANSI_BLACK = '\u001B[30m';
  public static ANSI_RED = '\u001B[31m';
  public static ANSI_GREEN = '\u001B[32m';
  public static ANSI_YELLOW = '\u001B[33m';
  public static ANSI_BLUE = '\u001B[34m';
  public static ANSI_PURPLE = '\u001B[35m';
  public static ANSI_CYAN = '\u001B[36m';
  public static ANSI_WHITE = '\u001B[37m';

  public static ANSI_BLACK_BACKGROUND = '\u001B[40m';
  public static ANSI_RED_BACKGROUND = '\u001B[41m';
  public static ANSI_GREEN_BACKGROUND = '\u001B[42m';
  public static ANSI_YELLOW_BACKGROUND = '\u001B[43m';
  public static ANSI_BLUE_BACKGROUND = '\u001B[44m';
  public static ANSI_PURPLE_BACKGROUND = '\u001B[45m';
  public static ANSI_CYAN_BACKGROUND = '\u001B[46m';
  public static ANSI_WHITE_BACKGROUND = '\u001B[47m';

  public static printBoard(
    pieces: ChessPiece[][],
    piecesColors: { white: UI_COLOR; black: UI_COLOR } = {
      white: 'ANSI_WHITE',
      black: 'ANSI_YELLOW',
    }
  ): void {
    const { white, black } = piecesColors;
    for (let i = 0; i < pieces.length; i++) {
      let row = `${8 - i} `;
      for (let j = 0; j < pieces.length; j++) {
        const piece = pieces[i][j] as ChessPiece | null;
        if (piece) {
          row += piece.isWhite ? `${UI[white]}${piece}` : `${UI[black]}${piece}`;
          row += UI.ANSI_RESET;
        } else {
          row += '-';
        }
        row += ' ';
      }
      info(row);
    }
    info('  a b c d e f g h');
  }
}
