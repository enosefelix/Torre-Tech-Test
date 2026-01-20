/**
 * Standard API response wrapper for consistent response structure across the application.
 * 
 * @template T - The type of the data payload
 * 
 * @example
 * // Success response with user data
 * const response: ApiResponse<User> = {
 *   data: { id: 1, name: 'John Doe' },
 *   timestamp: new Date().toISOString(),
 *   metadata: { requestId: 'abc123' }
 * };
 * 
 * @example
 * // Response with array data
 * const listResponse: ApiResponse<User[]> = {
 *   data: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }],
 *   timestamp: new Date().toISOString(),
 *   metadata: { total: 2, page: 1, limit: 10 }
 * };
 */
export interface ApiResponse<T = any> {
  /**
   * HTTP status code of the response
   */
  statusCode: number;

  /**
   * The main data payload of the response
   */
  data: T;

  /**
   * ISO 8601 formatted timestamp of when the response was generated
   */
  timestamp: string;

  /**
   * Optional metadata for additional response information
   * (e.g., pagination, request tracking, etc.)
   */
  metadata?: any;
}
