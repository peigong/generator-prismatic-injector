# <%= name %> #

> <%= description %>

## 开发环境 ##

假定已经提前装好了 [node.js](https://nodejs.org/) 和 [gulp](http://gulpjs.com/)。

执行如下命令：

	npm install
	gulp
	node server
	gulp serve

- 使用 [npm](https://www.npmjs.com/) 安装所需NODE模块。
- 执行项目构建命令 [gulp](http://gulpjs.com/)
- 启动服务器桩 `node server`
- 新开命令窗口，启动项目实时预览 `gulp serve`

## 模板开发规范 ##

参见：[template.md](./template.md)

## 服务器桩 ##

- 宿主测试页面：http://localhost:3000
- 宿主页面管理：http://localhost:3001
- 针头脚本地址：http://localhost:3080/needle.js
- 模板选择服务：http://localhost:3080/opt.do
- 模板库地址：http://localhost:3081/templates
- 模板数据服务：http://localhost:3082/api
