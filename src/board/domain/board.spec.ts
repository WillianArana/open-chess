import { Board } from './board';

describe('Board', () => {
  it('should be create board', () => {
    expect(new Board(0, 0)).toBeDefined();
  });
});
