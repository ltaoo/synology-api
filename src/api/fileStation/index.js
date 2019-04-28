/**
 * @file FileStation
 * @author ltaoo<litaowork@aliyun.com>
 * @doc https://cndl.synology.cn/download/Document/DeveloperGuide/Synology_File_Station_API_Guide.pdf#page=63&zoom=100,0,174
 */

const upload = require('./upload');

module.exports = instance => ({
    upload: upload.bind(instance),
});
