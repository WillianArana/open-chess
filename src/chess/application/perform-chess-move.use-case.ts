import { ChessMatch } from '../domain/chess-match';
import { ChessPosition } from '../domain/chess-position';

export class PerformChessMoveUseCase {
  execute =
    (chessMatch: ChessMatch) => (sourcePosition: ChessPosition, targetPosition: ChessPosition) =>
      chessMatch.performChessMove(sourcePosition, targetPosition);
}
