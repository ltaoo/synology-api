const fs = require('fs');
const request = require('request');
const ERROR_CODE = require('@/constants');
/**
 * 上传文件
 * @param {UploadOptions} params
 * @param {string} params.path - 要上传到的目录
 * @param {Path} params.file - 要上传的文件路径
 * @return {Promise}
 */
function upload(params) {
    const api = 'SYNO.FileStation.Upload';
    const path = this.COMMON_PATH;
    const { sid } = this.options;

    const queryObj = {
        api,
        method: 'upload',
        version: 2,
    };

    const url = this.stringify({ path, params: { ...queryObj, _sid: sid } });
    console.log(url);
    return new Promise((resolve, reject) => {
        const r = request({ url }, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            }
            console.log('upload success', body);
            const { data } = JSON.parse(body);
            if (data.success === false && data.error) {
                data.msg = ERROR_CODE[data.error.code];
            }
            resolve(response, data);
        });
        const form = r.form();
        Object.keys(params).forEach((key) => {
            let value = params[key];
            if (key === 'file') {
                value = fs.createReadStream(value);
            }
            form.append(key, value);
        });
    });
}

module.exports = upload;
