/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const fs = require('fs');
const request = require('request');
/**
 * 上传文件
 * @param {UploadOptions} params
 * @param {string} params.path - 要上传到的目录
 * @param {Path} params.file - 要上传的文件路径
 * @param {string} [params.overwrite=false] - 文件已存在是否覆盖
 * @return {Promise}
 */
function upload(params) {
    const api = 'SYNO.FileStation.Upload';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'upload',
        version: 2,
    };

    const url = this.stringify({ path, params: queryObj });
    console.log(url);
    return new Promise((resolve, reject) => {
        const r = request({ url }, this.callback.bind(this, resolve, reject));
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
