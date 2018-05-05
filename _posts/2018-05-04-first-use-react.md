---
layout: post
title:  "搭建react+webpack脚手架（一）搭建webpack环境"
date:   2018-05-04 08:20:30
categories: react
tags:  react webpack 脚手架
author: 王文章
---

* content
{:toc}

![react](https://i.loli.net/2018/05/04/5aec62c2c20ae.jpg)

前一段时间跟着慕课网和一些教学网站中的视频学习了 react + webpack 的基础，由于其视频中用到的 react 和 webpack 与最新的版本相差甚多，所以在搭建环境的时候，踩了好多坑。对一些入口文件的配置、JSX语法糖、babel 、各种 loaders 和 plugins 的使用等有了一个大致的了解。





## 初始化项目

首先，新建一个空的文件夹。

执行以下命令， `-y`用于自动生成 package.json 文件

`npm init -y`

##安装 react 和 react-dom

我使用的是较低版本的 react 15.x，执行以下命令：

`npm install react@15.6.1 react-dom@15.6.1 -S`

注意 `-S`就是简写的 `--save`，

- react : 专门用来创建组件用的，其中包括了组件的生命周期
- react-dom : 渲染组件，同时对组件进行操作

## 安装 webpack

本项目中使用到的 webpack 为 2.x，执行以下命令安装

`npm install webpack@2.3.2 -D`

其中的`-D`就表示`--save-dev`

安装完成之后在`package.json`中配置 webpack 的打包命令

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack"
  }
```



接下来在项目根目录新建 `src`文件夹，里面再新建一个 `main.js`文件，`src`用来存放项目的源代码、`main.js`来表示 webpack 打包的入口文件

##  webpack 配置文件

我们还需要项目根目录建立一个 `webpack.config.js` 文件，这是配置 webpack

内容如下，代码都比较简单。

若你使用的是 webpack4.x，那么只需配置一个 mode 参数即可，目的就是为了减少代码量。详见 [mode 参数](https://webpack.js.org/concepts/#mode)

```js
const path = require("path");
module.exports = {
  entry: "./src/main.js", // 入口文件
  output: {	// 输出
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  }
}
```

我们可以在 `main.js` 中写一段测试代码

```js
alert("webpack 打包成功！");
```

命令行执行 `npm run build` ，打包完毕后可以发现根目录中生成了 dist 目录，里面有一个 `main.bundle.js` 文件。我们可以在当前目录下新建一个 `index.html`文件，在里面引入这个js。

用浏览器打开`index.html`，可以发现页面正确弹出`webpack 打包成功！`字样，这表明我们的 js 文件被正确的打包了。

## webpack-dev-server的使用

webpack-dev-server ，通称为WDS，是一个小型的 node.js 服务器,它使用 webpack-dev-middleware 来服务于 webpack 的包，除此自外，它还有一个用来连接到服务器 sock.js，极大的方便了我们在开发环境中的调试。

执行`npm install webpack-dev-server@2.4.2 -D` ，这里为了兼容低版本的 webpack，我们使用了 `2.4.2` 版本的 WDS。

安装完成之后，对 WDS 进行配置。打开我们的`package.json`文件

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "webpack-dev-server --open --port 8080 --hot --host 127.0.0.1"
  }
```

配置 `start`脚本命令

`--open`表示启动WDS服务器之后就自动打开浏览器

`--port`表示对应本机中的端口号

`--hot`表示模块的热更新

`--host`表示使用指定的 IP

执行命令`npm start` 启动 WDS 服务，我们会发现浏览器自动打开，如下图所示。

![](https://i.loli.net/2018/05/05/5aecf4f2c0745.jpg)

我们点击 `dist`，页面成功跳转到 `index.html`并弹出 alert 窗口。

接下来，我们试着修改 `src` 中的`main.js`文件

```js
alert("WDS 运行成功！");
```

然后回到浏览器发现，无论我们怎么刷新显示的都是之前的`alert`，这就引入一个问题：热更新失效了吗？

我们来看下控制台，`webpack: Compiled successfully`确实显示被正确编译了呀，那这是为什么呢。我们将控制台向上翻，会发现这样一句话

`webpack output is served from /`

这句话说明 WDS 服务器启动后会将 webpack 编译输出的文件放到根路径`/`中去，

也就是说`main.bundle.js`文件存在于根路径，OK，那我们就访问这个地址

[http://127.0.0.1:8080/main.bundle.js](http://127.0.0.1:8080/main.bundle.js)

发现，确实如我们所愿，`main.bundle.js`文件被正确的显示出来，`ctrl+f`寻找 `alert` ，可以发现也确实是“WDS 运行成功！”。

我们看下输出的 `dist` 目录中的 `main.bundle.js` 文件，查看后发现里面还是原来的 alert。这就很奇怪了，在浏览器中我们看到的 `main.bundle.js`难道不是 `dist`目录下的吗。

这里涉及到一个问题，其实 WDS 实时编译生成的文件是放在`内存`中的，并没有加载到物理磁盘上，在访问 js 文件时会读取内存中对应的`main.bundle.js`。我们修改`index.html`中引入的 js 的 `src`路径：`/main.bundle.js`，再次回到浏览器并刷新页面，可以惊奇的发现 alert 是最新的。从而得出结论。

###内存托管问题

> WDS 启动后会将所有打包的文件托管到内存中，在项目根目录中是看不到的，但是我们可以通过访问服务器的根路径来读取打包后的文件。 

## 配置html-webpack-plugin 插件

为了方便调试，我们来安装一个`html-webpack-plugin`插件，它能够在打包后自动生成 `index.html` 文件，并且会自动将打包好的 js 文件引入到其中，无需我们自己编写。

执行安装命令

`npm install html-webpack-plugin -D`

安装完毕之后，我们先将 `dist` 目录删去。并在根目录中新建一个 `index.tpl.html` 模板文件，目的是在 webpack 打包时根据这个文件生成对应的 `index.html` 文件。

用到`html-webpack-plugin`插件需要在 webpack 的配置文件`webpack.config.js`中配置。

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var htmlPlugin = new HtmlWebpackPlugin({
  template: "./index.tpl.html" // 配置模板文件
});

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    htmlPlugin
  ]
}

```

配置完成后再次执行 `npm run build` 打包完成后执行`npm start`启动 WDS 服务。

至此，完成基本的 webpack 环境的搭建。下一节将在这节的基础上搭建react的环境。