/**
 * @file synology api
 * @author ltaoo<litaowork@aliyun.com>
 */
require('module-alias/register');
const request = require('request');
const qs = require('qs');

const Auth = require('./api/auth');
const FileStation = require('./api/fileStation');
const ERROR_CODE = require('./constants');
/**
 * @param {string} host
 * @param {number} port
 * @param {string} path
 * @param {Object} params
 * @param {string} search - if exist params, this will be overwrite
 * @return {string}
 */
function url({ host, port, path, params, search: tempSearch }) {
    let search = tempSearch;
    if (params) {
        search = '?' + qs.stringify(params);
    }
    return `http://${host}:${port}${path}${search}`;
}

class Synology {
    constructor(options) {
        this.options = options;

        this.COMMON_PATH = '/entry.cgi';
        this.Auth = Auth(this);
        this.FileStation = FileStation(this);
        console.log(FileStation, this.FileStation);
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
            queryObj._sid = sid;
        }
        const query = qs.stringify(queryObj);
        const search = `?${query}`;
        return `http://${host}:${port}/webapi${path}${search}`;
    }

    /**
     * 发起请求
     */
    fetch() {

    }

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