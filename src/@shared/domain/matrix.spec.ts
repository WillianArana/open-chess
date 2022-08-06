import { Matrix } from './matrix';

describe('Matrix', () => {
  it('should be create', () => {
    expect(new Matrix(0, 0)).toBeDefined();
  });

  describe('iterator', () => {
    it('should get all items', () => {
      const matrix = new Matrix<boolean>(2, 2, false);
      let count = 0;
      for (let item of matrix) {
        expect(item).toBeFalsy();
        count++;
      }
      expect(count).toBe(4);
    });
  });

  describe('get', () => {
    it('should get item', () => {
      const matrix = new Matrix<boolean>(2, 2, true);
      expect(matrix.get({ row: 0, column: 0 })).toBeTruthy();
      expect(matrix.position).toEqual({ row: 0, column: 0 });
    });
  });

  describe('set', () => {
    it('should set item', () => {
      const matrix = new Matrix<number>(2, 2);
      matrix.set(42, { row: 1, column: 0 });

      expect(matrix.position).toEqual({ row: 0, column: 0 });
      expect(matrix.get({ row: 0, column: 0 })).toBeNull();
      expect(matrix.get({ row: 0, column: 1 })).toBeNull();
      expect(matrix.get({ row: 1, column: 1 })).toBeNull();
      expect(matrix.get({ row: 1, column: 0 })).toBe(42);
    });
  });
});
