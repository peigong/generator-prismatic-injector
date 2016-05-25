# <%= name %> #

> <%= description %>

## 开发构建 ##

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

## 接口规范 ##

- [针头脚本的构建](./doc/needle.md)
- [模板选择服务接口规范](./doc/opt.md)
- [模板开发规范](./doc/template.md)
- [针头脚本公共方法](./doc/advanced.md)

## 服务器桩 ##

- 宿主测试页面：http://localhost:3000
- 宿主页面管理：http://localhost:3001
- 针头脚本地址：http://localhost:3080/needle.js
- 模板选择服务：http://localhost:3080/opt.do
- 模板库地址：http://localhost:3081/templates
- 模板数据服务：http://localhost:3082/api

## 桩服务配置 ##

系统默认使用`localhost`访问服务。

如果需要更改，可以在项目目录下增加`loc.json`配置文件。

配置文件内容如下：

    {
        "hostname": "localhost"
    }

- **hostname：**访问服务的域名或IP地址。

## 开发环境 ##

### 安装NODE ###

windows环境可以在[node.js官网](https://nodejs.org/)直接下载安装文件安装。

linux环境可以使用[Node Version Manager](https://github.com/creationix/nvm)安装。

**安装NVM：**

    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash

**验证NVM安装:**

    command -v nvm

如果输出`nvm`则表示安装成功。

**安装Node 5.0版本：**

    nvm install 5.0

**使用Node 5.0版本：**

    nvm use 5.0

### 安装gulp命令行工具 ###

    npm install -g gulp-cli
