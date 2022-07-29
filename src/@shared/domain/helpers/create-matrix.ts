const createMatrix =
  <T>(i: number) =>
  (j: number, startValue = null as unknown as T) => {
    const matrix: T[][] = [];
    for (let x = 0; x < i; x++) {
      const row: T[] = [];
      for (let y = 0; y < j; y++) {
        row.push(startValue);
      }
      matrix.push(row);
    }
    return matrix;
  };

export default createMatrix;
