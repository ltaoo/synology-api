/**
 * @file synology api
 * @author ltaoo<litaowork@aliyun.com>
 */
require('module-alias/register');
const request = require('request');
const qs = require('qs');

const Auth = require('./api/auth');
const FileStation = require('./api/fileStation');
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
    }

    /**
     * 组装请求地址
     * @param {string} path - 请求的 api 地址
     * @param {Object} params - 查询参数
     * @return {URL}
     */
    stringify({ path, params }) {
        const { host, port } = this.options;
        const query = qs.stringify(params);
        const search = `?${query}`;
        return `http://${host}:${port}/webapi${path}${search}`;
    }

    /**
     * 发起请求
     */
    fetch() {

    }
}

module.exports = Synology;