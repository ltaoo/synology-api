/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');
/**
 * Provide File Station information
 * @return {Promise}
 */
function info() {
    const api = 'SYNO.FileStation.Info';
    const path = this.COMMON_PATH;
    const queryObj = {
        api,
        method: 'get',
        version: 2,
    };
    const url = this.stringify({ path, params: queryObj });
    logger.info(url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

module.exports = info;
