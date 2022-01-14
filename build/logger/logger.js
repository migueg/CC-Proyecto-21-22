"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var _a = require('winston'), createLogger = _a.createLogger, format = _a.format, transports = _a.transports, config = _a.config;
exports.logger = createLogger({
    format: format.combine(format.simple(), format.timestamp(), format.printf(function (info) { return "[" + info.timestamp + "]-" + info.level + " : " + info.message + " "; })),
    transports: [
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: __dirname + "/../../logs/api-info.log",
            level: 'info'
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: __dirname + "/../../logs/api-error.log",
            level: 'error'
        }),
        new transports.File({
            maxsize: 5120000,
            maxFiles: 5,
            filename: __dirname + "/../../logs/api-http.log",
            level: 'http'
        }),
        new transports.Console({ level: 'error' }),
        new transports.Console({ level: 'info' }),
        new transports.Console({ level: 'http' }),
        new transports.Console({ level: 'debug' })
    ]
});
