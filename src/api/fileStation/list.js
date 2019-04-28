/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');

/**
 * List all shared folders, enumerate files in a shared folder,
 * and get detailed file information.
 * @example ?api=SYNO.FileStation.List&version=2&method=list_share&additional=real_path,owner,time
 * @param {number} [offset=0]
 * @param {number} [limit=0]
 * @param {string} [sort_by=name] - name|user|group|mtime|atime|ctime|crtime|posix
 * @param {string} [sort_direction=asc] asc|desc
 * @param {string} [onlywriteable=true] true|false
 * @param {string} [additional=undefined]
 * real_path,owner,time,perm,mount_point_type,sync_share,volume_status
 * @return {Promise}
 */
function list(params) {
    const api = 'SYNO.FileStation.List';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'list_share',
        version: 2,
        ...params,
    };
    const url = this.stringify({ path, params: queryObj });
    return new Promise((resolve, reject) => (
        request({ url }, this.callback.bind(this, resolve, reject))
    ));
}

module.exports = list;
