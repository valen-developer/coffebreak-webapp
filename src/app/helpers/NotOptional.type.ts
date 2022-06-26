/*
  receive example:
    {
      name?: string;
      age?: number;
    }

  send example:
    {
      name: string;
      age: number;
    }
*/

// type that return a type with all properties of T but with all properties not optional
export type NotOptional<T> = {
  [P in keyof Required<T>]: Pick<T, P> extends Required<Pick<T, P>>
    ? T[P]
    : T[P] | undefined;
};
