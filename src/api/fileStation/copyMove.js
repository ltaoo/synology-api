/**
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */
/* eslint-disable camelcase */
const request = require('request');

const Wait = require('../wait-promise');


/**
 * @param {string} path - 要移动的文件或文件夹，用 , 分隔多个
 * @param {string} dest_folder_path - 目标路径
 * @param {boolean} [overwrite] - 是否覆盖，默认存在重名文件则报错，false 会跳过重名文件
 * @param {boolean} [remove_src=false] - 默认 copy，如果传 true 则表示是 move
 * @param {boolean} [accurate_progress=true]
 * @param {string} [search_taskid] - 配合 search 使用
 */
function start({
    path,
    dest_folder_path,
    overwrite,
    remove_src = false,
    accurate_progress = true,
    search_taskid,
}) {
    const api = 'SYNO.FileStation.CopyMove';
    const reqPath = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'start',
        version: 3,
        path,
        dest_folder_path,
        overwrite,
        remove_src,
        accurate_progress,
        search_taskid,
    };
    const url = this.stringify({ path: reqPath, params: queryObj });
    logger.info(url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

function status({ taskid }) {
    const api = 'SYNO.FileStation.CopyMove';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'status',
        version: 3,
        taskid,
    };
    const url = this.stringify({ path, params: queryObj });
    logger.info(url);
    return new Promise((resolve, reject) => {
        request({ url }, (err, response, body) => {
            if (err) {
                reject(err);
                return;
            }
            const content = JSON.parse(body);
            const { finished } = content.data;
            if (finished) {
                resolve(content);
            } else {
                reject(content);
            }
        });
    });
}

function stop({ taskid }) {
    const api = 'SYNO.FileStation.CopyMove';
    const path = this.COMMON_PATH;

    const queryObj = {
        api,
        method: 'stop',
        version: 3,
        taskid,
    };
    const url = this.stringify({ path, params: queryObj });
    logger.info(url);
    return new Promise((resolve, reject) => {
        request({ url }, this.callback.bind(this, resolve, reject));
    });
}

/**
 * 和 search 类似，由于是耗时任务所以有 start 开始，status 查询状态 和 end 结束
 */
function copyMove(params) {
    let taskId = '';
    let body = null;
    let response = null;
    return new Promise((resolve, reject) => {
        start.call(this, params)
            .then((data) => {
                const { taskid } = data.data;
                taskId = taskid;
                return Wait.until(status.bind(this, { taskid }));
            })
            .then((data, res) => {
                body = data;
                response = res;
                return stop.call(this, { taskid: taskId });
            })
            .then(() => {
                resolve(body, response);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = copyMove;
