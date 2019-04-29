/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');

/**
 * @param {string} path - 要删除的文件或文件夹，用 , 分隔多个
 * @param {boolean} recursive - 如果设为 false，当要删除的文件夹下存在文件时会删除失败
 */
function del({
    path,
    recursive = true,
}) {
    const api = 'SYNO.FileStation.Delete';
    const reqPath = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'delete',
        version: 2,
        path,
        recursive,
    };

    const url = this.stringify({ path: reqPath, params: queryObj });
    logger.info(url);

    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

module.exports = del;
