export interface WithPagination<T> {
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  content: T;
}
