/**
 * @file synology api
 * @author ltaoo<litaowork@aliyun.com>
 */
const qs = require('qs');

const Auth = require('./api/auth');
const FileStation = require('./api/fileStation');
const ERROR_CODE = require('./constants');


class Synology {
    constructor(options) {
        this.options = options;

        this.COMMON_PATH = '/entry.cgi';
        this.Auth = Auth(this);
        this.FileStation = FileStation(this);

        this.init();
    }

    init() {
        const { NODE_ENV } = this.options;
        const { log } = console;
        console.log = function logger(...args) {
            if (NODE_ENV === 'dev' || process.env.NODE_ENV === 'dev') {
                log.apply(console, args);
            }
        };
    }

    /**
     * 组装请求地址
     * @param {string} path - 请求的 api 地址
     * @param {Object} params - 查询参数
     * @return {URL}
     */
    stringify({ path, params }) {
        const { host, port, sid } = this.options;
        const queryObj = params;
        if (queryObj.api !== 'SYNO.API.Auth') {
            /* eslint-disable no-underscore-dangle */
            queryObj._sid = sid;
        }
        const query = qs.stringify(queryObj);
        const search = `?${query}`;
        return `http://${host}:${port}/webapi${path}${search}`;
    }

    /* eslint-disable class-methods-use-this */
    /**
     * 共用的请求后回调函数
     */
    callback(resolve, reject, err, response, body) {
        if (err) {
            reject(err);
            return;
        }
        const content = JSON.parse(body);
        if (content.success === false && content.error) {
            content.msg = ERROR_CODE[content.error.code];
        }
        console.log('request success', content);
        resolve(content, response);
    }
}

module.exports = Synology;
