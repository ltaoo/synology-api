/**
 * @file synology api
 * @author ltaoo<litaowork@aliyun.com>
 */
const qs = require('qs');

const Auth = require('./api/auth');
const FileStation = require('./api/fileStation');
const { appendErrorMessage } = require('./utils');

class Synology {
    constructor(options) {
        this.options = options;

        this.COMMON_PATH = '/entry.cgi';
        this.Auth = Auth(this);
        this.FileStation = FileStation(this);
    }

    /**
     * 使用新的配置项覆盖已有的
     * @param {Object} options
     */
    update(options) {
        this.options = {
            ...this.options,
            ...options,
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
            logger.error(err);
            reject(err);
            return;
        }
        const content = appendErrorMessage(body);
        logger.info('request success', content);
        resolve(content, response);
    }
}

module.exports = Synology;
