# synology-api

Synology api 的一层封装，方便调用，其他类似的库都不支持上传文件，google 后找到了正确的上传方式。

## 用例

```js
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
```

## 参考

- [How can I upload a file to a Synology diskstation with PHP
](https://stackoverflow.com/questions/45137195/how-can-i-upload-a-file-to-a-synology-diskstation-with-php/48637467#48637467)