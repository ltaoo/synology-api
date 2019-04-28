/**
 * @file synology api
 * @author ltaoo<litaowork@aliyun.com>
 */
require('module-alias/register');
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
        const { data } = JSON.parse(body);
        if (data.success === false && data.error) {
            data.msg = ERROR_CODE[data.error.code];
        }
        console.log('request success', data);
        resolve(response, data);
    }
}

module.exports = Synology;
