const {createLogger, format, transports, config} = require('winston');

export const  logger = createLogger({
    format: format.combine(
        format.simple(), 
        format.timestamp(), 
        format.printf((info : any) => `[${info.timestamp}]-${info.level} : ${info.message} `)
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
        new transports.File({
            maxsize: 5120000, //5MB
            maxFiles: 5,
            filename: `${__dirname}/../../logs/api-http.log`,
            level: 'http'
        }),
        new transports.Console({level: 'error'}),
        new transports.Console({level: 'info'}),
        new transports.Console({level: 'http'}),
        new transports.Console({level: 'debug'})
    ]
})

