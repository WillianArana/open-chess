const createMatrix =
  <T>(i: number) =>
  (j: number) =>
    Array<T[]>(i).fill(Array<T>(j).fill(null as unknown as T));
export default createMatrix;
