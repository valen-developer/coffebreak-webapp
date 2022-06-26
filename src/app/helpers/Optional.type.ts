/*
  receive example:
    {
      name: string;
      age: number;
    }

  send example:
    {
      name?: string;
      age?: number;
    }
*/

export type Optional<T> = T extends { [key: string]: infer U }
  ? { [key in keyof T]: Optional<U> }
  : T;
