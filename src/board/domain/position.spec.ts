import { Position } from './position';

describe('Position', () => {
  it('should be create position', () => {
    const row = 0;
    const column = 1;
    expect(new Position(row, column)).toBeDefined();
  });

  describe('toString', () => {
    it('should be get position as string', () => {
      const position = new Position(10, 20);
      expect(position.toString()).toBe('10, 20');
    });
  });
});
