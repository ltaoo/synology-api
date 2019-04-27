/**
 * @file 认证相关的接口
 * @author ltaoo<litaowork@aliyun.com>
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');
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
    // check(username, 'username not exist');
    const params = {
        api,
        method: 'login',
        version: 3,
        account: username || account,
        passwd: password || passwd,
    };
    const url = this.stringify({ path, params });
    console.log(url);
    return new Promise((resolve, reject) => {
        request({ url }, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('auth success', body);
            const data = JSON.parse(body).data;
            this.options.sid = data.sid;
            resolve(response, body);
        });
    });
}

module.exports = (instance) => {
    return {
        auth: auth.bind(instance),
    };
};
