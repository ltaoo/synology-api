/**
 * @file 认证相关的接口
 * @author ltaoo<litaowork@aliyun.com>
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');
const exp = require('./utils');
/**
 * @param {string} username
 * @param {string} password
 * @return {Promise}
 */
function auth({
    username,
    account,
    password,
    passwd,

    format = 'sid',
}) {
    const api = 'SYNO.API.Auth';
    const path = '/auth.cgi';
    const params = {
        api,
        method: 'login',
        version: 3,
        account: username || account,
        passwd: password || passwd,
        format,
    };
    const url = this.stringify({ path, params });
    console.log(url);
    return new Promise((resolve, reject) => {
        request({ url }, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            }
            const content = JSON.parse(body);
            console.log('auth success', content);
            if (content.success === true) {
                this.options.sid = content.data.sid;
            }
            resolve(body, response);
        });
    });
}

module.exports = exp({ auth });
