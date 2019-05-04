/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const fs = require('fs');
const path = require('path');
const request = require('request');

/**
 * 获取上传文件的文件名
 * @param {*} p
 * @param {*} defaultName
 */
function basename(p, defaultName) {
    if (defaultName) {
        return defaultName;
    }
    if (p.slice(0, 4) === 'http') {
        const paths = p.split('/');
        const filename = paths[paths.length - 1];
        // 如果没有文件名，应该随机生成一个，但是后缀又不知道是什么
        if (!filename.includes('.')) {
            return Date.now().toString();
        }
        return filename;
    }
    return path.basename(p);
}

/**
 * 上传文件
 * @param {UploadOptions} params
 * @param {string} params.path - 要上传到的目录
 * @param {string} params.file - 要上传的文件路径
 * @param {string} [name] - 文件名，如果网络地址最后没有后缀，那 name 就是必选项
 * @param {string} [params.overwrite=false] - 文件已存在是否覆盖
 * @return {Promise}
 */
function upload(params) {
    const api = 'SYNO.FileStation.Upload';
    const reqPath = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'upload',
        version: 2,
    };

    const url = this.stringify({ path: reqPath, params: queryObj });
    logger.info(url);
    return new Promise(async (resolve, reject) => {
        const r = request({ url }, this.callback.bind(this, resolve, reject));
        const form = r.form();
        const { file, name, ...restParams } = params;
        Object.keys(restParams).forEach((key) => {
            const value = restParams[key];
            form.append(key, value);
        });
        // 文件需要特殊处理
        const filename = basename(file, name);
        let value = null;
        // 如果是网络地址
        if (file.slice(0, 4) === 'http') {
            value = request({ url: file });
        } else {
            value = fs.createReadStream(file);
        }
        form.append('file', value, filename ? { filename } : undefined);
    });
}

module.exports = upload;
