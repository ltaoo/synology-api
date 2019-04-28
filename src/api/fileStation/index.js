/**
 * @file FileStation
 * @author ltaoo<litaowork@aliyun.com>
 */
const exp = require('../utils');

const info = require('./info');
const list = require('./list');
const search = require('./search');
const upload = require('./upload');
const download = require('./download');
const createFolder = require('./createFolder');

const apis = {
    info,
    list,
    search,
    upload,
    download,
    createFolder,
};

module.exports = exp(apis);
