const Synology = require('./src');
const { createLogger, transports, format } = require('winston');
require('dotenv').config();

const { printf, timestamp, prettyPrint }= format;
const { NODE_ENV } = process.env;

const myFormat = printf(({ level, message, timestamp }) => {
    const time = new Date(timestamp).toLocaleString();
    return `[${time}] ${level}: ${message}`;
});
const logger = createLogger({
    transports: [new transports.Console()],
    format: format.combine(
        timestamp(),
        prettyPrint(),
        myFormat,
    ),
});
const wrapper = (original) => {
    return (...args) => {
        for (let index = 0; index < args.length; index++) {
            if(args[index] instanceof Error){
                args[index] = args[index].stack;
            }
            if (typeof args[index] === 'object') {
                args[index] = JSON.stringify(args[index]);
            }
        }
        original(args.join(' '));
    }
};
logger.error = wrapper(logger.error);
logger.warn = wrapper(logger.warn);
logger.info = wrapper(logger.info);
logger.verbose = wrapper(logger.verbose);
logger.debug = wrapper(logger.debug);
logger.silly = wrapper(logger.silly);

function noop() {}

global.logger = (NODE_ENV === 'dev' || NODE_ENV === 'test') ? logger : { info: noop, warn: noop, error: noop };

module.exports = Synology;
