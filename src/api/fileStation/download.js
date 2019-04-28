/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 * @TODO 文件不存在时正确的错误信息
 */
const pathUtils = require('path');
const fs = require('fs');
const request = require('request');

/**
 * 返回最后一个文件路径
 * @param {string} filename
 * @return {string}
 */
function fileName(filename) {
    return pathUtils.basename(filename);
}

/**
 * Download files/folders. If only one file is specified, the file content is responded.
 * If more than one file/folder is given,
 * binary content in ZIP format which they are compressed to is responded.
 * @param {string} path - 要下载的文件或者文件夹路径，比如 /home 或者 /home,/videos
 * @param {string} to - 需要是绝对路径并且路径存在。如 ~/Documents/images
 * @param {string} [name] - 文件名，默认是下载的文件名
 * @param {string} [mode=open] - open|download
 */
function download({
    path,
    to,
    name,
    mode = 'download',
}) {
    const api = 'SYNO.FileStation.Download';
    const reqPath = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'download',
        version: 2,
        path,
        mode,
    };
    const url = this.stringify({ path: reqPath, params: queryObj });
    let filename = name || fileName(path);
    // 如果是文件
    if (!filename.includes('.')) {
        filename = `${filename}.zip`;
    }
    const wholePath = pathUtils.join(to, filename);
    return new Promise((resolve, reject) => {
        request({ url }, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(body, response);
        }).pipe(fs.createWriteStream(wholePath));
    });
}

module.exports = download;
