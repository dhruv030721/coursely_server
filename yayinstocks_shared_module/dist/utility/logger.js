"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const logger = winston_1.default.createLogger({
    level: "info",
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.errors({ stack: true }), winston_1.default.format.printf((_a) => {
        var { timestamp, level, message, stack } = _a, meta = __rest(_a, ["timestamp", "level", "message", "stack"]);
        const metaInfo = Object.keys(meta).length
            ? ` ${JSON.stringify(meta)}`
            : "";
        return stack
            ? `[${timestamp}] [${level}] ${message}${metaInfo}\n${stack}`
            : `[${timestamp}] [${level}] ${message}${metaInfo}`;
    })),
    transports: [
        new winston_1.default.transports.File({
            filename: path_1.default.join("logs", "error.log"),
            level: "error",
            maxsize: 5 * 1024 * 1024,
            maxFiles: 5,
        }),
        new winston_1.default.transports.File({
            filename: path_1.default.join("logs", "combined.log"),
            maxsize: 5 * 1024 * 1024,
            maxFiles: 5,
        }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf((_a) => {
                var { timestamp, level, message, stack } = _a, meta = __rest(_a, ["timestamp", "level", "message", "stack"]);
                const metaInfo = Object.keys(meta).length
                    ? ` ${JSON.stringify(meta)}`
                    : "";
                return stack
                    ? `[${timestamp}] [${level}] ${message}${metaInfo}\n${stack}`
                    : `[${timestamp}] [${level}] ${message}${metaInfo}`;
            })),
        }),
    ],
});
exports.logger = logger;
const stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};
const morganMiddleware = (0, morgan_1.default)(":method :url :status :res[content-length] - :response-time ms", { stream });
exports.morganMiddleware = morganMiddleware;
