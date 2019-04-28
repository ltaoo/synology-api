// const path = require('path');

require('dotenv').config();
const Synology = require('./src');

const { USERNAME, PASSWORD } = process.env;

const synology = new Synology({
    host: '192.168.1.4',
    port: 5000,
});

async function init() {
    try {
        const { Auth, FileStation } = synology;
        // login
        await Auth.auth({
            username: USERNAME,
            password: PASSWORD,
        });
        /**
         * ------------- FileStation --------------
         */
        // info
        // await FileStation.info();
        // list
        // await FileStation.list({ limit: 2 });
        // search
        // const data = await FileStation.search({
        //     folder_path: '/home',
        //     // 包含的文件名
        //     pattern: '6x',
        // });
        // console.log(data);
        // upload
        // const res = await FileStation.upload({
        //     path: '/home',
        //     overwrite: 'true',
        //     file: path.join(__dirname, './example.jpg'),
        // });
        // console.log(res.body);
        // download
        // await FileStation.download({
        //     path: '/home/6xmt_b.jpg',
        //     to: path.join(__dirname, './image/example1.jpg'),
        //     mode: 'download',
        // });
        // create folder
        // await FileStation.createFolder({
        //     folder_path: '/home',
        //     name: 'test',
        // });
        // rename
        // const body = await FileStation.rename({
        //     path: '/home/6xmt_b.jpg',
        //     name: 'e.jpg',
        // });
        // console.log(body.error);
        // move or copy
        // const body = await FileStation.copyMove({
        //     path: '/home/e.jpg',
        //     dest_folder_path: '/home/test1',
        // });
        // console.log(body);
        const body = await FileStation.delete({
            path: '/home/test1/e.jpg',
        });
        console.log(body);
    } catch (err) {
        console.error('operation failed', err);
    }
}

init();
