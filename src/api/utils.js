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
function exp(apis) {
    return instance => bindFunctions(apis, instance);
}

module.exports = exp;
