import { ChessMatch } from '../domain/chess-match';
import { StartChessMatchUseCase } from './start-chess-match.use-case';

const useCase = StartChessMatchUseCase.name;
describe(useCase, () => {
  it(`should be create "${useCase}"`, () => {
    expect(new StartChessMatchUseCase()).toBeDefined();
  });

  describe('execute', () => {
    it('should start chess game', () => {
      const chessMatch = new StartChessMatchUseCase().execute();

      expect(chessMatch).toBeInstanceOf(ChessMatch);
    });
  });
});
