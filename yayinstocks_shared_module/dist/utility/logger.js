"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const logger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.printf(({ timestamp, level, message, stack }) => {
        return stack
            ? `[${timestamp}] [${level}] ${message}\n${stack}`
            : `[${timestamp}] [${level}] ${message}`;
    })),
    transports: [
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'error.log'),
            level: 'error',
            maxsize: 5 * 1024 * 1024,
            maxFiles: 5
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join('logs', 'combined.log'),
            maxsize: 5 * 1024 * 1024,
            maxFiles: 5
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston_1.default.format.printf(({ timestamp, level, message, stack }) => {
                return stack
                    ? `[${timestamp}] [${level}] ${message}\n${stack}`
                    : `[${timestamp}] [${level}] ${message}`;
            }))
        })
    ]
});
exports.logger = logger;
const stream = {
    write: (message) => {
        logger.info(message.trim());
    }
};
const morganMiddleware = (0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms', { stream });
exports.morganMiddleware = morganMiddleware;
