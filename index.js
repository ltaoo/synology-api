const path = require('path');

require("dotenv").config();
const Synology = require('./src');

const { USERNAME, PASSWORD } = process.env;

const synology = new Synology({
    host: '192.168.1.4',
    port: 5000,
});

async function init () {
    try {
        await synology.Auth.auth({
            username: USERNAME,
            password: PASSWORD,
        });

        const res = await synology.FileStation.upload({
            path: '/home',
            file: path.join(__dirname, './example.jpg'),
        });
        console.log(res.body);
    } catch(err) {
        console.error(err);
    }
}

init();