/**
 * Enhanced logging utility for the Trendmoon SDK
 */

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
  TRACE = 4
}

export interface LogContext {
  [key: string]: any;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: Error;
}

class Logger {
  private readonly logLevel: LogLevel;
  private readonly enableConsole: boolean;
  private readonly enableStructured: boolean;

  constructor() {
    // Determine log level from environment
    const envLevel = process.env.TRENDMOON_LOG_LEVEL?.toUpperCase();
    this.logLevel = this.parseLogLevel(envLevel);
    
    // Enable console output in debug mode or when explicitly enabled
    this.enableConsole = process.env.DEBUG_MODE === 'true' || 
                        process.env.TRENDMOON_ENABLE_LOGGING === 'true';
    
    // Enable structured logging for production
    this.enableStructured = process.env.NODE_ENV === 'production' ||
                           process.env.TRENDMOON_STRUCTURED_LOGS === 'true';
  }

  private parseLogLevel(level?: string): LogLevel {
    if (!level) return LogLevel.WARN; // Default level
    
    switch (level) {
      case 'ERROR': return LogLevel.ERROR;
      case 'WARN': return LogLevel.WARN;
      case 'INFO': return LogLevel.INFO;
      case 'DEBUG': return LogLevel.DEBUG;
      case 'TRACE': return LogLevel.TRACE;
      default: return LogLevel.WARN;
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.logLevel;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    return `[${timestamp}] [${levelName}] ${message}`;
  }

  private createLogEntry(
    level: LogLevel, 
    message: string, 
    context?: LogContext, 
    error?: Error
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error
    };
  }

  private output(entry: LogEntry): void {
    if (!this.enableConsole) return;

    if (this.enableStructured) {
      // Structured JSON output
      const structuredLog = {
        timestamp: entry.timestamp,
        level: LogLevel[entry.level],
        message: entry.message,
        ...(entry.context && { context: entry.context }),
        ...(entry.error && { 
          error: {
            name: entry.error.name,
            message: entry.error.message,
            stack: entry.error.stack
          }
        })
      };
      console.log(JSON.stringify(structuredLog));
    } else {
      // Human-readable console output
      const formattedMessage = this.formatMessage(entry.level, entry.message);
      const consoleMethod = this.getConsoleMethod(entry.level);
      
      if (entry.context || entry.error) {
        consoleMethod(formattedMessage, {
          ...(entry.context && { context: entry.context }),
          ...(entry.error && { error: entry.error })
        });
      } else {
        consoleMethod(formattedMessage);
      }
    }
  }

  private getConsoleMethod(level: LogLevel): (...args: any[]) => void {
    switch (level) {
      case LogLevel.ERROR: return console.error;
      case LogLevel.WARN: return console.warn;
      case LogLevel.INFO: return console.info;
      case LogLevel.DEBUG: return console.debug;
      case LogLevel.TRACE: return console.trace;
      default: return console.log;
    }
  }

  public error(message: string, context?: LogContext, error?: Error): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      this.output(this.createLogEntry(LogLevel.ERROR, message, context, error));
    }
  }

  public warn(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.WARN)) {
      this.output(this.createLogEntry(LogLevel.WARN, message, context));
    }
  }

  public info(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.INFO)) {
      this.output(this.createLogEntry(LogLevel.INFO, message, context));
    }
  }

  public debug(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      this.output(this.createLogEntry(LogLevel.DEBUG, message, context));
    }
  }

  public trace(message: string, context?: LogContext): void {
    if (this.shouldLog(LogLevel.TRACE)) {
      this.output(this.createLogEntry(LogLevel.TRACE, message, context));
    }
  }

  // Convenience method for API requests
  public apiRequest(method: string, url: string, params?: any): void {
    this.debug('API Request', {
      method,
      url,
      params: params ? JSON.stringify(params).substring(0, 200) : undefined
    });
  }

  // Convenience method for API responses
  public apiResponse(status: number, duration?: number, size?: number): void {
    this.debug('API Response', {
      status,
      duration: duration ? `${duration}ms` : undefined,
      size: size ? `${size} bytes` : undefined
    });
  }

  // Convenience method for errors with context
  public errorWithContext(message: string, error: Error, context?: LogContext): void {
    this.error(message, context, error);
  }
}

// Create singleton instance
export const logger = new Logger();

// Backward compatibility - maintain the old debugLog interface
export const debugLog = {
  log: (message: string, ...args: any[]) => {
    if (args.length > 0) {
      logger.debug(message, { args });
    } else {
      logger.debug(message);
    }
  },
  error: (message: string, ...args: any[]) => {
    if (args.length > 0) {
      logger.error(message, { args });
    } else {
      logger.error(message);
    }
  },
  info: (message: string, ...args: any[]) => {
    if (args.length > 0) {
      logger.info(message, { args });
    } else {
      logger.info(message);
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (args.length > 0) {
      logger.warn(message, { args });
    } else {
      logger.warn(message);
    }
  },
};