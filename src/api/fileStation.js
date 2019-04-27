/**
 * @file FileStation
 * @author ltaoo<litaowork@aliyun.com>
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const fs = require('fs');

const request = require('request');

/**
 * 上传文件
 * @param {UploadOptions} params
 * @param {string} params.path - 要上传到的目录
 * @param {Path} params.file - 要上传的文件路径
 * @return {Promise}
 */
function upload(params) {
    const api = 'SYNO.FileStation.Upload';
    const path = this.commonPath;
    const { sid } = this.options;

    const queryObj = {
        api,
        method: 'upload',
        version: 2,
    // _sid: sid,
    };

    // const query = qs.stringify({ ...queryObj, _sid: sid });
    // const search = `?${query}`;

    const url = this.stringify({ path, params: { ...queryObj, _sid: sid } });
    console.log(url);
    return new Promise((resolve, reject) => {
        const r = request({ url }, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(response, body);
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

module.exports = instance => ({
    upload: upload.bind(instance),
});
