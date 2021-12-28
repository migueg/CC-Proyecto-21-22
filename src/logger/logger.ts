import { addColors } from "winston/lib/winston/config";

const {createLogger, format, transports, config,Winston} = require('winston');

export const  logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.simple(), 
        format.timestamp(), 
        format.printf((info : any) => `[${info.timestamp}]-${info.level} : ${info.message} `),
        ),

    transports: [
        new transports.File({
            maxsize: 5120000, //5MB
            maxFiles: 5,
            filename: `${__dirname}/../../logs/api-info.log`,
            level: 'info'
        }),
        new transports.File({
            maxsize: 5120000, //5MB
            maxFiles: 5,
            filename: `${__dirname}/../../logs/api-error.log`,
            level: 'error'
        }),
        new transports.Console({
            level: 'info',
            colorize: true,
            prettyPrint: true,
        }),
    ]
})

