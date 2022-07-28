import { ChessPosition, Column, Row } from '../src/chess/domain/chess-position';
import { info, clear } from 'console';
import { ChessPiece } from '../src/chess/domain/chess-piece';

export class UI {
  public static readonly ANSI_RESET = '\u001B[0m';
  public static readonly ANSI_BLACK = '\u001B[30m';
  public static readonly ANSI_RED = '\u001B[31m';
  public static readonly ANSI_GREEN = '\u001B[32m';
  public static readonly ANSI_YELLOW = '\u001B[33m';
  public static readonly ANSI_BLUE = '\u001B[34m';
  public static readonly ANSI_PURPLE = '\u001B[35m';
  public static readonly ANSI_CYAN = '\u001B[36m';
  public static readonly ANSI_WHITE = '\u001B[37m';

  public static readonly ANSI_BLACK_BACKGROUND = '\u001B[40m';
  public static readonly ANSI_RED_BACKGROUND = '\u001B[41m';
  public static readonly ANSI_GREEN_BACKGROUND = '\u001B[42m';
  public static readonly ANSI_YELLOW_BACKGROUND = '\u001B[43m';
  public static readonly ANSI_BLUE_BACKGROUND = '\u001B[44m';
  public static readonly ANSI_PURPLE_BACKGROUND = '\u001B[45m';
  public static readonly ANSI_CYAN_BACKGROUND = '\u001B[46m';
  public static readonly ANSI_WHITE_BACKGROUND = '\u001B[47m';

  public static printBoard(pieces: ChessPiece[][]): void {
    info('\n');
    for (let i = 0; i < pieces.length; i++) {
      let row = `${8 - i} `;
      for (let j = 0; j < pieces.length; j++) {
        const piece = pieces[i][j] as ChessPiece | null;
        if (piece) {
          row += piece.isWhite ? `${UI.ANSI_WHITE}${piece}` : `${UI.ANSI_YELLOW}${piece}`;
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

  public static readChessPosition(line: string): ChessPosition {
    try {
      const column = line[0] as Column;
      const row = Number(line[1]) as Row;
      return new ChessPosition(column, row);
    } catch {
      throw new Error('Reading ChessPosition. Valid values are from a1 to h8.');
    }
  }

  public static clearScreen(): void {
    clear();
  }
}
