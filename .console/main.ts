import { createInterface } from 'readline';
import { stdin as input, stdout as output } from 'node:process';

import { PerformChessMoveUseCase } from '../src/chess/application/perform-chess-move.use-case';
import { UI } from './ui';
import { ChessMatchCMD } from '@src/chess/domain/chess-match.cmd';

(() => {
  const chessMatch = new ChessMatchCMD();
  const chessMove = new PerformChessMoveUseCase().execute(chessMatch);
  const rl = createInterface({ input, output });

  rl.on('close', () => {
    process.exit(0);
  });

  const question = (query: string): Promise<string> =>
    new Promise((resolve, rejects) => {
      try {
        rl.question(query, (answer) => {
          resolve(answer);
        });
      } catch (error) {
        rejects(error);
      }
    });

  const checkIfExitCommand = (answer: string) => {
    if (answer.trim() === 'exit') {
      rl.close();
    }
  };

  const readLine = async () => {
    try {
      rl.prompt();
      UI.clearScreen();
      UI.printMatch(chessMatch);
      const sourceAnswer = (await question('\nSource: ')).toLowerCase();
      checkIfExitCommand(sourceAnswer);

      const source = UI.readChessPosition(sourceAnswer);
      const possibleMoves = chessMatch.possibleMoves(source);
      UI.clearScreen();
      UI.printBoardWithPossibleMoves(chessMatch.pieces(), possibleMoves);

      const targetAnswer = (await question('\nTarget: ')).toLowerCase();
      checkIfExitCommand(targetAnswer);

      const target = UI.readChessPosition(targetAnswer);

      chessMove(source, target);
    } catch (error) {
      await question(`${error}`);
    } finally {
      if (chessMatch.isCheckMate) {
        UI.clearScreen();
        UI.printMatch(chessMatch);
        rl.close();
      } else {
        readLine();
      }
    }
  };

  readLine();
})();
