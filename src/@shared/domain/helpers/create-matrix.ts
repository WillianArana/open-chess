const createMatrix =
  <T>(i: number) =>
  (j: number) => {
    const matrix: T[][] = [];
    for (let x = 0; x < i; x++) {
      const row: T[] = [];
      for (let y = 0; y < j; y++) {
        row.push(null as unknown as T);
      }
      matrix.push(row);
    }
    return matrix;
  };

export default createMatrix;
