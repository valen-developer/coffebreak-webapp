import { Union } from './Union';

/**
 * Paginated type
 * @param T - Type of the items
 * @param K - key of the items
 * @returns Union type between {K: T} and {pages: number}
 */
export type Paginated<T, K extends keyof any> = Union<
  {
    [key in K]: T;
  },
  Page
>;

interface Page {
  pages: number;
}
