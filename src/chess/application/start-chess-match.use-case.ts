import { ChessMatch } from '../domain/chess-match';

export class StartChessMatchUseCase {
  execute(): ChessMatch {
    return new ChessMatch();
  }
}
