# API 说明

所有的请求格式都基本是 http://dsm.com/webapi/xx.cgi?xx=xx 形式的。
其中最重要的就是 `xx.cgi` 和后面的查询参数。查询参数基本都是固定格式

`?api=SYNO.API.Info&version=2&method=query&query=all`，如果是 `GET` 请求那查询参数都是放在 `search` 上了；如果是 `post` 请求，那么就还存在部分参数在 `body` 中了。

该项目的组织方式为，以 `SYNO.API.xxx`最后面的 `xxx` 为一个单独的文件，存放对应的所有 `api`。