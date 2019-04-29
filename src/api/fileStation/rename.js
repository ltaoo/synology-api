/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');

/**
 * Rename a file/folder
 * @param {string} path - 要重命名的完整文件或者文件夹路径，可用 , 分隔多个
 * @param {string} name - 文件或文件夹新名字，不需要包含路径，可用 , 分隔多个，与 path 是一一对应关系
 * @param {string} [additional]
 * @param {string} [search_taskid] - 配合 search 重命名搜索到的文件或文件夹
 */
function rename(params) {
    const api = 'SYNO.FileStation.Rename';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'rename',
        version: 2,
        ...params,
    };

    const url = this.stringify({ path, params: queryObj });
    logger.info(url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

module.exports = rename;
