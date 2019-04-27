const path = require('path');
const Synology = require('./src');

const synology = new Synology({
    host: '192.168.1.4',
    port: 5000,
});

async function init () {
    try {
        await synology.Auth.auth({
            username: 'ltaoo',
            password: 'qq862945626',
        });

        // const res = await synology.FileStation.upload({
        //     path: '/home',
        //     file: path.join(__dirname, './example.jpg'),
        // });
        // console.log(res);
    } catch(err) {
        console.error(err);
    }
}

init();