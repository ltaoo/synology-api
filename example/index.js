// const path = require('path');

const Synology = require('../index.js');

const {
    ACCOUNT, PASSWD, HOST, PORT,
} = process.env;

const synology = new Synology({
    host: HOST,
    port: PORT,
});

async function init() {
    try {
        const { Auth, FileStation } = synology;
        // login
        await Auth.auth({
            username: ACCOUNT,
            password: PASSWD,
        });

        synology.update({
            host: '115.193.189.48',
        });
        /**
         * ------------- FileStation --------------
         */
        // info
        const data = await FileStation.info();
        console.log(data);
        // list
        // await FileStation.list({ limit: 2 });
        // // search
        // const data = await FileStation.search({
        //     folder_path: '/home',
        //     // 包含的文件名
        //     pattern: '6x',
        // });
        // logger.info(data);
        // // upload
        // await FileStation.upload({
        //     path: '/home',
        //     overwrite: 'true',
        //     file: path.join(__dirname, './example.jpg'),
        // });
        // // download
        // await FileStation.download({
        //     path: '/home/6xmt_b.jpg',
        //     to: path.join(__dirname, './image/example1.jpg'),
        //     mode: 'download',
        // });
        // // create folder
        // await FileStation.createFolder({
        //     folder_path: '/home',
        //     name: 'test',
        // });
        // // rename
        // await FileStation.rename({
        //     path: '/home/6xmt_b.jpg',
        //     name: 'e.jpg',
        // });
        // // move or copy
        // await FileStation.copyMove({
        //     path: '/home/e.jpg',
        //     dest_folder_path: '/home/test1',
        // });
        // // delete
        // await FileStation.delete({
        //     path: '/home/test1/e.jpg',
        // });
    } catch (err) {
        console.error(err);
    }
}

init();
