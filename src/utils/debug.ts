export const debugLog = {
  log: (...args: any[]) => {
    if (process.env.DEBUG_MODE === 'true') {
      console.log('[DEBUG]', ...args);
    }
  },
  error: (...args: any[]) => {
    if (process.env.DEBUG_MODE === 'true') {
      console.error('[DEBUG ERROR]', ...args);
    }
  },
  info: (...args: any[]) => {
    if (process.env.DEBUG_MODE === 'true') {
      console.info('[DEBUG INFO]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (process.env.DEBUG_MODE === 'true') {
      console.warn('[DEBUG WARN]', ...args);
    }
  }
};