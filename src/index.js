/**
 * @file synology api
 * @author ltaoo<litaowork@aliyun.com>
 */

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

        this.commonPath = '/entry.cgi';
        this.Auth = Auth(this);
        this.FileStation = FileStation(this);
    }

    stringify({ path, params }) {
        const { host, port } = this.options;
        const query = qs.stringify(params);
        const search = `?${query}`;
        return `http://${host}:${port}/webapi${path}${search}`;
    }
}

module.exports = Synology;