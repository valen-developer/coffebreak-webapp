export interface Paginator<T> {
  page?: number;
  sort_by?: keyof T;
  order?: 'asc' | 'desc';
}
