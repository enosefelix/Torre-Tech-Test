/**
 * Standard pagination metadata for list responses.
 */
export interface PaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/**
 * Paginated API response wrapper.
 * Extends ApiResponse with pagination metadata.
 */
export interface PaginatedApiResponse<T> {
  data: T[];
  timestamp: string;
  metadata: {
    pagination: PaginationMeta;
    [key: string]: any;
  };
}
