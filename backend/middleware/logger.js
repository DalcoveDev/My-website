const LOG_LEVELS = {
  DEBUG: 'debug',
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error'
};

function formatTimestamp() {
  return new Date().toISOString();
}

function formatLog(level, message, meta = {}) {
  return JSON.stringify({
    timestamp: formatTimestamp(),
    level,
    message,
    ...meta
  });
}

export function log(level, message, meta = {}) {
  const logEntry = formatLog(level, message, meta);
  
  switch (level) {
    case LOG_LEVELS.ERROR:
      console.error(logEntry);
      break;
    case LOG_LEVELS.WARN:
      console.warn(logEntry);
      break;
    default:
      console.log(logEntry);
  }
}

export function logRequest(req, res, next) {
  const start = Date.now();
  const { method, url, headers } = req;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const level = res.statusCode >= 400 ? LOG_LEVELS.WARN : LOG_LEVELS.INFO;
    
    log(level, `${method} ${url}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: headers['user-agent'],
      ip: headers['x-forwarded-for'] || req.socket.remoteAddress
    });
  });
  
  if (next) next();
}

export function logError(error, context = {}) {
  log(LOG_LEVELS.ERROR, error.message, {
    stack: error.stack,
    ...context
  });
}

export function logInfo(message, meta = {}) {
  log(LOG_LEVELS.INFO, message, meta);
}

export function logDebug(message, meta = {}) {
  if (process.env.NODE_ENV === 'development') {
    log(LOG_LEVELS.DEBUG, message, meta);
  }
}

export default { logRequest, logError, logInfo, logDebug, LOG_LEVELS };