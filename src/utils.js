const ERROR_CODE = require('./errorCode');

function appendErrorMessage(body, codes = 'ALL') {
    let content = {};
    try {
        content = JSON.parse(body);
        if (content.success === false && content.error) {
            content.msg = ERROR_CODE[codes][content.error.code];
        }
    } catch (err) {
        content = err;
    }
    return content;
}

function bindFunctions(funcs, instance) {
    return Object.keys(funcs).reduce((a, b) => {
        const func = funcs[b];
        const res = a;
        res[b] = func.bind(instance);
        return res;
    }, {});
}

/**
 * @param {Object} apis
 */
function exportModules(apis) {
    return instance => bindFunctions(apis, instance);
}

module.exports = {
    appendErrorMessage,
    exportModules,
};
