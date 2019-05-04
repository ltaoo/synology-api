require('dotenv').config({
    path: '.env',
    // overwrite: true,
});
const { createLogger, transports, format } = require('winston');
const Synology = require('./src');

const { printf, timestamp, prettyPrint } = format;
const { NODE_ENV } = process.env;

const myFormat = printf(({ level, message, _timestamp }) => {
    const time = new Date(_timestamp).toLocaleString();
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
const wrapper = original => (...args) => {
    const argAry = args;
    for (let index = 0; index < args.length; index += 1) {
        if (args[index] instanceof Error) {
            argAry[index] = args[index].stack;
        }
        if (typeof args[index] === 'object') {
            argAry[index] = JSON.stringify(args[index]);
        }
    }
    original(argAry.join(' '));
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
