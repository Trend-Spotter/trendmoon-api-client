/**
 * Custom error classes for the Trendmoon SDK
 */

/**
 * Base error class for all Trendmoon SDK errors
 */
export class TrendmoonError extends Error {
  public readonly timestamp: string;

  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'TrendmoonError';
    this.timestamp = new Date().toISOString();
    Object.setPrototypeOf(this, TrendmoonError.prototype);
  }
}

/**
 * Error thrown when API requests fail
 */
export class TrendmoonApiError extends TrendmoonError {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly responseBody?: string,
    code?: string
  ) {
    super(message, code);
    this.name = 'TrendmoonApiError';
    Object.setPrototypeOf(this, TrendmoonApiError.prototype);
  }
}

/**
 * Error thrown when network requests fail
 */
export class TrendmoonNetworkError extends TrendmoonError {
  constructor(message: string, public readonly originalError?: Error) {
    super(message, 'NETWORK_ERROR');
    this.name = 'TrendmoonNetworkError';
    Object.setPrototypeOf(this, TrendmoonNetworkError.prototype);
  }
}

/**
 * Error thrown when request validation fails
 */
export class TrendmoonValidationError extends TrendmoonError {
  constructor(message: string, public readonly field?: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'TrendmoonValidationError';
    Object.setPrototypeOf(this, TrendmoonValidationError.prototype);
  }
}

/**
 * Error thrown when rate limits are exceeded
 */
export class TrendmoonRateLimitError extends TrendmoonApiError {
  constructor(
    message: string = 'API rate limit exceeded',
    public readonly retryAfter?: number
  ) {
    super(message, 429, undefined, 'RATE_LIMIT_EXCEEDED');
    this.name = 'TrendmoonRateLimitError';
    Object.setPrototypeOf(this, TrendmoonRateLimitError.prototype);
  }
}

/**
 * Error thrown when authentication fails
 */
export class TrendmoonAuthError extends TrendmoonApiError {
  constructor(message: string = 'Authentication failed') {
    super(message, 401, undefined, 'AUTH_ERROR');
    this.name = 'TrendmoonAuthError';
    Object.setPrototypeOf(this, TrendmoonAuthError.prototype);
  }
}

/**
 * Utility function to determine error type from HTTP status code
 */
export function createErrorFromResponse(
  status: number,
  statusText: string,
  responseBody?: string
): TrendmoonApiError {
  const message = `API Error: ${status} - ${statusText}`;
  
  switch (status) {
    case 401:
      return new TrendmoonAuthError(message);
    case 429:
      return new TrendmoonRateLimitError(message);
    default:
      return new TrendmoonApiError(message, status, responseBody);
  }
}