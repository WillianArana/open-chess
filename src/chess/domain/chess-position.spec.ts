import { Position } from '@src/board/domain/position';

import { ChessPosition, Column, Row } from './chess-position';

const entity = ChessPosition.name;
describe(entity, () => {
  it('should be create a chess position', () => {
    expect(new ChessPosition('a', 1)).toBeDefined();
  });

  it('should throw error "ChessPosition" when create position', () => {
    expect(() => new ChessPosition('a', 0 as Row)).toThrowError(
      'Error instantiating ChessPosition. Valid values are from a1 to h8.'
    );

    expect(() => new ChessPosition('a', 9 as Row)).toThrowError(
      'Error instantiating ChessPosition. Valid values are from a1 to h8.'
    );

    expect(() => new ChessPosition('x' as Column, 8)).toThrowError(
      'Error instantiating ChessPosition. Valid values are from a1 to h8.'
    );
  });

  describe('toPosition', () => {
    it('should be transform "ChessPosition" to "Position"', () => {
      expect(new ChessPosition('h', 4).toPosition()).toBeInstanceOf(Position);
    });
  });

  describe('toString', () => {
    it('should be transform to string', () => {
      expect(new ChessPosition('h', 4).toString()).toBe('h4');
    });
  });

  describe('fromPosition', () => {
    it('should be transform "Position" to "ChessPosition"', () => {
      expect(ChessPosition.fromPosition(new Position(4, 7))).toEqual(new ChessPosition('h', 4));
    });
  });
});
