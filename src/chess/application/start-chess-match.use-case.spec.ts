import { ChessMatch } from '../domain/chess-match';
import { StartChessMatchUseCase } from './start-chess-match.use-case';

describe('StartChessMatchUseCase', () => {
  it('should be create "StartChessMatchUseCase"', () => {
    expect(new StartChessMatchUseCase()).toBeDefined();
  });

  describe('execute', () => {
    it('should start chess game', () => {
      const useCase = new StartChessMatchUseCase();
      const chessMatch = useCase.execute();
      expect(chessMatch).toBeInstanceOf(ChessMatch);
    });
  });
});
