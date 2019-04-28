/**
 * @file FileStation
 * @author ltaoo<litaowork@aliyun.com>
 */

const upload = require('./upload');
const info = require('./info');

const apis = {
    info,
    upload,
};

function bindFunctions(funcs, instance) {
    return Object.keys(funcs).reduce((a, b) => {
        const func = funcs[b];
        a[b] = func.bind(instance);
        return a;
    }, {});
}

module.exports = instance => {
    return bindFunctions(apis, instance);
}