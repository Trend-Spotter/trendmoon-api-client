import { debugLog } from './debug.js';
import { TrendmoonRateLimitError, TrendmoonNetworkError } from './errors.js';

/**
 * Retry configuration options
 */
export interface RetryOptions {
  /** Maximum number of retry attempts */
  maxAttempts: number;
  /** Base delay between retries in milliseconds */
  baseDelay: number;
  /** Maximum delay between retries in milliseconds */
  maxDelay: number;
  /** Whether to use exponential backoff */
  exponentialBackoff: boolean;
  /** Function to determine if an error should trigger a retry */
  shouldRetry?: (error: Error) => boolean;
}

/**
 * Default retry configuration
 */
export const DEFAULT_RETRY_OPTIONS: RetryOptions = {
  maxAttempts: 3,
  baseDelay: 1000,
  maxDelay: 10000,
  exponentialBackoff: true,
  shouldRetry: (error: Error) => {
    // Retry on network errors and rate limit errors
    return error instanceof TrendmoonNetworkError || 
           error instanceof TrendmoonRateLimitError;
  }
};

/**
 * Retry utility function with exponential backoff
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const config = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error;
  
  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      const result = await operation();
      if (attempt > 1) {
        debugLog.info(`Operation succeeded on attempt ${attempt}`);
      }
      return result;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry if this is the last attempt or if shouldRetry returns false
      if (attempt === config.maxAttempts || !config.shouldRetry?.(lastError)) {
        break;
      }
      
      // Calculate delay for next attempt
      let delay = config.baseDelay;
      if (config.exponentialBackoff) {
        delay = Math.min(
          config.baseDelay * Math.pow(2, attempt - 1),
          config.maxDelay
        );
      }
      
      // Add jitter to prevent thundering herd
      delay += Math.random() * 1000;
      
      debugLog.warn(
        `Operation failed on attempt ${attempt}/${config.maxAttempts}. ` +
        `Retrying in ${Math.round(delay)}ms. Error:`,
        lastError.message
      );
      
      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // All attempts failed
  debugLog.error(`Operation failed after ${config.maxAttempts} attempts`);
  throw lastError!;
}

/**
 * Create a retry wrapper for a function
 */
export function createRetryWrapper<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options: Partial<RetryOptions> = {}
): T {
  return ((...args: Parameters<T>) => {
    return withRetry(() => fn(...args), options);
  }) as T;
}