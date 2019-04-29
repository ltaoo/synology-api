/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
const request = require('request');

/**
 * Search files according to given criteria.
 * @example ?api=SYNO.FileStation.Search&version=2&method=start&folder_path=%22%2Fvideo%22&pattern=1
 * @param {string} folder_path
 * @param {boolean} [recursive=true] - 是否递归查询
 * @param {string} [search_type=simple] - 文档中没有，实际请求中有
 * @param {boolean} [search_content=false] - 文档中没有，实际请求中有
 * @param {pattern} [pattern]
 * @param {pattern} [extension]
 * @param {string} [fileType=all] file|dir|all
 * @param {number} [size_from] - byte size
 * @param {number} [size_to] - byte size
 * @param {timestamp} [mtime_from]
 * @param {timestamp} [mtime_to]
 * @param {timestamp} [crtime_from]
 * @param {timestamp} [crtime_to]
 * @param {timestamp} [atime_form]
 * @param {timestamp} [atime_to]
 * @param {string} [owner]
 * @param {string} [group]
 */
function start(params) {
    const api = 'SYNO.FileStation.Search';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'start',
        version: 2,
        ...params,
    };
    const url = this.stringify({ path, params: queryObj });

    logger.info('start search', url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

/**
 * List matched files in a search temporary database.
 * @param {string} taskid - the response of start request
 * @param {number} [offset=0]
 * @param {number} [limit=0]
 * @param {string} [sort_by=name] - name|user|group|mtime|atime|ctime|crtime|posix
 * @param {string} [sort_direction=asc] asc|desc
 * @param {pattern} [pattern] - 实际上 start 接收了这个参数，这里就不需要了
 * @param {string} [fileType=all] file|dir|all
 * @param {string} [additional=undefined]
 * real_path,owner,time,perm,mount_point_type,sync_share,volume_status
 * 返回结果要包含的额外信息，比如是否要绝对路径 real_path 等
 * @return {Promise}
 */
function list(params) {
    const api = 'SYNO.FileStation.Search';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'list',
        version: 2,
        ...params,
    };
    const url = this.stringify({ path, params: queryObj });
    logger.info('list search', url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

/**
 * Stop the searching task(s).
 * @param {*} params
 * @param {string} taskid
 */
function stop(params) {
    const api = 'SYNO.FileStation.Search';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'stop',
        version: 2,
        ...params,
    };
    const url = this.stringify({ path, params: queryObj });

    logger.info('stop search', url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

/**
 * Delete search temporary database(s)
 * @param {*} params
 * @param {string} taskid
 */
function clean(params) {
    const api = 'SYNO.FileStation.Search';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'clean',
        version: 2,
        ...params,
    };
    const url = this.stringify({ path, params: queryObj });

    logger.info('clean search', url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

/**
 * 查询是很特殊的接口，分为 start、list、stop 和 clean 四个接口
 * 在 start 开启查询后，要多次调用 list 才能返回全部的信息，确认查询完毕后主动 stop 并 clean
 * 如果只暴露给用户 search，自己处理多次调用 list，那用户等待的时间可能很长
 * 还是需要用户主动多次调用才比较好，但这样带来的问题是又需要用户主动 stop
 * @TODO 暂时只能查询到一部分结果
 * @param {string} folder_path - 要搜索的目录
 * @param {string} pattern - 搜索的文件名
 * @param {number} limit - 数量
 * @param {string} [additional] - 包含的额外信息
 */
function search({
    /* eslint-disable camelcase */
    folder_path,
    pattern,
    offset = 0,
    limit = 10,
    search_type = 'simple',
    search_content = false,
    recursive = true,
    additional,
    fileType = 'all',
}) {
    return new Promise((resolve, reject) => {
        let taskId = null;
        const instance = this;
        const startParams = {
            folder_path,
            pattern,
            search_type,
            search_content,
            recursive,
        };
        start.call(instance, startParams)
            .then(({ data }) => {
                const { taskid } = data;
                taskId = taskid;
                const listParams = {
                    taskid,
                    offset,
                    limit,
                    additional,
                    // 文档中是 fileType，但实际请求是 filetype
                    filetype: fileType,
                };
                return list.call(instance, listParams);
            })
            .then((body) => {
                resolve(body);
                stop.call(instance, { taskid: taskId });
            })
            .then(() => clean.call(instance, { taskid: taskId }))
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = search;
