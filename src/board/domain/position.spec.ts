import { Position } from './position';

describe('Position', () => {
  it('should be create', () => {
    const row = 0;
    const column = 1;
    expect(new Position(row, column)).toBeDefined();
  });

  it('should get row', () => {
    const position = new Position(10, 20);
    expect(position.row).toBe(10);
  });

  it('should get column', () => {
    const position = new Position(8, 8);
    expect(position.column).toBe(8);
  });

  describe('toString', () => {
    it('should get position as string', () => {
      const position = new Position(10, 20);
      expect(position.toString()).toBe('10, 20');
    });
  });
});
