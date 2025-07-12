import winston from 'winston';
import morgan, { StreamOptions } from 'morgan';
import path from 'path';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `[${timestamp}] [${level}] ${message}\n${stack}`
        : `[${timestamp}] [${level}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: path.join('logs', 'error.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5
    }),
    new winston.transports.File({
      filename: path.join('logs', 'combined.log'),
      maxsize: 5 * 1024 * 1024,
      maxFiles: 5
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return stack
            ? `[${timestamp}] [${level}] ${message}\n${stack}`
            : `[${timestamp}] [${level}] ${message}`;
        })
      )
    })
  ]
});

const stream: StreamOptions = {
  write: (message: string) => {
    logger.info(message.trim());
  }
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', { stream });

export { logger, morganMiddleware };
