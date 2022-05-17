export const asyncMap = <T, U>(
  array: T[],
  callback: (item: T, index: number) => Promise<U>
): Promise<U[]> => {
  return Promise.all(array.map(callback));
};
