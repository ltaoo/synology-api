# synology-api

Synology api 的一层封装，方便调用，其他类似的库都不支持上传文件，google 后找到了正确的上传方式。

## Usage

```js
const synology = new Synology({
    host: '192.168.1.4',
    port: 5000,
});
```

### Login

```
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
        });
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
    mode: 'download',
});
```

### Search

```js
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

## 参考

- [How can I upload a file to a Synology diskstation with PHP
](https://stackoverflow.com/questions/45137195/how-can-i-upload-a-file-to-a-synology-diskstation-with-php/48637467#48637467)