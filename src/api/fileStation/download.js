/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const fs = require('fs');
const request = require('request');

/**
 * Download files/folders. If only one file is specified, the file content is responded.
 * If more than one file/folder is given,
 * binary content in ZIP format which they are compressed to is responded.
 * @param {string} path - 要下载的文件或者文件夹路径，比如 /home 或者 /home,/videos
 * @param {string} to - 需要是绝对路径并且路径存在。如 ~/Documents/images/example.jpg
 * @param {string} [mode=open] - open|download
 */
function download({ path, to, mode = 'open' }) {
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
    console.log(url);
    return new Promise((resolve, reject) => {
        request({ url }, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(body, response);
        }).pipe(fs.createWriteStream(to));
    });
}

module.exports = download;
