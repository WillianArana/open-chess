import { Obj } from './obj';

describe('test obj', () => {
  it('should be defined', () => {
    const obj = new Obj();
    expect(obj).toBeDefined();
  });
});
