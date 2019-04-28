/**
 * @file FileStation
 * @author ltaoo<litaowork@aliyun.com>
 */
const fs = require('fs');
const path = require('path');
const exp = require('../utils');

const files = fs.readdirSync(path.join(__dirname, './')).filter(file => file !== 'index.js');
const apis = files.reduce((prev, file) => {
    /* eslint-disable import/no-dynamic-require, global-require */
    const module = require(path.join(__dirname, file));
    const modules = prev;
    const name = file.split('.')[0];
    modules[name] = module;
    return modules;
}, {});

module.exports = exp(apis);
