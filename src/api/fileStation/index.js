/**
 * @file FileStation
 * @author ltaoo<litaowork@aliyun.com>
 */

const info = require('./info');
const list = require('./list');
const search = require('./search');
const upload = require('./upload');

const apis = {
    info,
    list,
    search,
    upload,
};

function bindFunctions(funcs, instance) {
    return Object.keys(funcs).reduce((a, b) => {
        const func = funcs[b];
        const res = a;
        res[b] = func.bind(instance);
        return res;
    }, {});
}

module.exports = instance => bindFunctions(apis, instance);
