import { StartChessMatchUseCase } from '../src/chess/application/start-chess-match.use-case';
import { UI } from './ui';

(() => {
  const chessMatch = new StartChessMatchUseCase().execute();
  UI.printBoard(chessMatch.pieces());
})();
