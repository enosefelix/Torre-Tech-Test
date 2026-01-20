import { PaginatedApiResponse } from '@torre/shared';

/**
 * DataTransformer - Utility class for transforming external API data to internal format.
 * 
 * This is a placeholder implementation that will be customized once the external API
 * documentation is provided. The transform method can be extended to handle:
 * - Field mapping/renaming
 * - Data type conversions
 * - Nested object restructuring
 * - Data validation and sanitization
 * - Default value handling
 * 
 * @example
 * // Future implementation example:
 * transform(rawData: ExternalUserDto): InternalUser {
 *   return {
 *     id: rawData.user_id,
 *     fullName: `${rawData.first_name} ${rawData.last_name}`,
 *     email: rawData.email_address,
 *     createdAt: new Date(rawData.created_timestamp),
 *   };
 * }
 */
export class DataTransformer {
  /**
   * Transform raw external API data to internal format.
   * 
   * @param rawData - The raw data received from external API
   * @returns Transformed data in internal format
   * 
   * @remarks
   * This is a placeholder method. Implement specific transformation logic
   * based on the external API documentation when available.
   */
  transform(rawData: any): any {
    return rawData;
  }

  /**
   * Transform an array of items.
   * 
   * @param rawDataArray - Array of raw data items
   * @returns Array of transformed items
   */
  transformMany(rawDataArray: any[]): any[] {
    if (!Array.isArray(rawDataArray)) {
      return [];
    }
    return rawDataArray.map((item) => this.transform(item));
  }

  /**
   * Apply a custom transformation function.
   * 
   * @param rawData - The raw data to transform
   * @param transformFn - Custom transformation function
   * @returns Transformed data
   */
  transformWith<T, R>(rawData: T, transformFn: (data: T) => R): R {
    return transformFn(rawData);
  }
}

/**
 * Singleton instance of DataTransformer for convenience.
 */
export const dataTransformer = new DataTransformer();

/**
 * Helper to create a standardized paginated response.
 * 
 * @param data - The array of items for the current page
 * @param totalItems - The total number of items across all pages
 * @param page - The current page number (1-based)
 * @param limit - The number of items per page
 * @returns A PaginatedApiResponse object with calculated metadata
 */
export function createPaginatedResponse<T>(
  data: T[],
  totalItems: number,
  page: number,
  limit: number,
): PaginatedApiResponse<T> {
  const totalPages = Math.ceil(totalItems / limit);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    data,
    timestamp: new Date().toISOString(),
    metadata: {
      pagination: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
    },
  };
}
