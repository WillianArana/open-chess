import createMatrix from '@shared/domain/helpers/create-matrix';

import { ChessMatch } from './chess-match';

describe('ChessMatch', () => {
  it('should be create "ChessMatch"', () => {
    expect(new ChessMatch()).toBeDefined();
  });

  describe('pieces', () => {
    it('should get pieces', () => {
      const chessMatch = new ChessMatch();
      const pieces = chessMatch.pieces();
      expect(pieces).toEqual(createMatrix(8)(8));
    });
  });
});
