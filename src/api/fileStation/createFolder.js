/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');

/**
 * Create folders
 * @param {string} folder_path - 新建文件夹所在的文件夹
 * 如果 force_parent = true 且该文件夹不存在就会新建该文件夹
 * @paran {string} name - 新文件夹的名字
 * @param {boolean} [force_parent=false]
 * @param {string} additional - 返回结果要包含的额外信息
 */
function createFolder(params) {
    const api = 'SYNO.FileStation.CreateFolder';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'create',
        version: 2,
        ...params,
    };
    const url = this.stringify({ path, params: queryObj });
    logger.info(url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

module.exports = createFolder;
