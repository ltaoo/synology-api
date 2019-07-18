# synology-api

Synology api 的一层封装，方便调用，其他类似的库都不支持上传文件，google 后找到了正确的上传方式。

## Usage

```bash
yarn add @ltaoo/synology-api
```

### Init

- internal IP
```js
const synology = new Synology({
    protocol: 'http',
    host: '192.168.1.4',
    port: 5000,
});
```
- external URL
```js
const synology = new Synology({
    protocol: 'https',
    host: 'john.synology.me',
    port: 5001,
});
```

### Login

```js
async function init () {
    try {
        await synology.Auth.auth({
            username: USERNAME,
            password: PASSWORD,
        });
    } catch(err) {
        console.error(err);
    }
}

init();
```

以下所有方法必须在登录成功后使用。

### Upload

```js
async function init () {
    try {
        await synology.Auth.auth({
            username: USERNAME,
            password: PASSWORD,
        });
        await synology.FileStation.upload({
            path: '/home',
            file: path.join(__dirname, './example.jpg'),
            // 支持下载网络图片，如果网络地址最后不带后缀，必须添加 name 参数
            // file: 'http://imgpolitics.gmw.cn/attachement/jpg/site2/20190428/f44d305ea48e1e2f58565d.jpg',
            // name: 'xxx.jpg',
        });
        //
    } catch(err) {
        console.error(err);
    }
}

init();
```

### Download

```js
await synology.FileStation.download({
    path: '/home/6xmt_b.jpg',
    to: path.join(__dirname, './image/example1.jpg'),
    mode: 'download'
});
```

### Search

```javascript
// search
const data = await synology.FileStation.search({
    folder_path: '/home',
    // 包含的文件名
    pattern: '6x',
});
console.log(data);
```

### Create Folder

```js
await synology.FileStation.createFolder({
    folder_path: '/home',
    name: 'test',
});
```

### Rename

```js
await synology.FileStation.rename({
    path: '/home/6xmt_b.jpg',
    name: 'e.jpg',
});
```

### MoveOrCopy

```js
await synology.FileStation.copyMove({
    path: '/home/e.jpg',
    dest_folder_path: '/home/test1',
});
```

### Delete

```js
await synology.FileStation.delete({
    path: '/home/test1/e.jpg',
});
```

## example

在项目根目录增加 `.env` 文件，并填写如下内容：

```
ACCOUNT = your account username
PASSWD = your account password
HOST = host like 192.168.1.4
PORT = 5000
NODE_ENV = dev
```

然后执行 `node example/index.js`，终端会显示当前请求的地址与结果。
如果出现 `auth success {"data":{"sid":"jiEIqBgVWZuCU1840QMRH4C3AV"},"success":true}` 这种数据就表示登录成功。

## TODO
[√] 使用自定义日志打印替代 console.log

### download
[]文件不存在时返回正确的错误信息

## 参考

- [How can I upload a file to a Synology diskstation with PHP
](https://stackoverflow.com/questions/45137195/how-can-i-upload-a-file-to-a-synology-diskstation-with-php/48637467#48637467)