import { ChessPiece } from '../domain/chess-piece';
import { ChessPosition } from '../domain/chess-position';
import { PerformChessMoveUseCase } from './perform-chess-move.use-case';
import { StartChessMatchUseCase } from './start-chess-match.use-case';

const useCase = PerformChessMoveUseCase.name;
describe(useCase, () => {
  const chessPieceMock = {} as ChessPiece;

  it(`should be create "${useCase}"`, () => {
    expect(new PerformChessMoveUseCase()).toBeDefined();
  });

  describe('execute', () => {
    it('should be perform chess move', () => {
      const chessMatch = new StartChessMatchUseCase().execute();

      const performChessMoveSpy = jest
        .spyOn(chessMatch, 'performChessMove')
        .mockReturnValue(chessPieceMock);

      const source = new ChessPosition('e', 1);
      const target = new ChessPosition('e', 2);

      const moveTo = new PerformChessMoveUseCase().execute(chessMatch);

      expect(moveTo(source, target)).toEqual(chessPieceMock);
      expect(performChessMoveSpy).toBeCalledWith(source, target);
    });
  });
});
