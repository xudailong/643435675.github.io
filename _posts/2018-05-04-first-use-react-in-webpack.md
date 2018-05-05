---
layout: post
title:  "搭建react+webpack脚手架（二）搭建react环境"
date:   2018-05-04 09:04:58
categories: react
tags:  react webpack babel 脚手架
author: 王文章
---

* content
{:toc}

![react](https://i.loli.net/2018/05/04/5aec62c2c20ae.jpg)

在上一节中，我们搭建了 webpack 的基本环境，了解了`webpack-dev-server`自动更新内存托管及根据模板文件自动生成 html 的`html-webpack-plugin`插件。

想必我们原来都是使用在页面中引入 react、react-dom 和 browser 这三个 js 的方式来编写 react 组件。这一节将在上一节的基础上搭建 react 脚手架，用模块化的方式来编写 react 组件，让我们来看看吧。





## 目录结构的修改

在编写 react组件之前，我们对目录结构做一个优化，将根目录的 `index.tpl.html ` 放到 src 文件夹下。之后我们也会将写的 react 组件等资源文件放到该文件夹下。

## 编写 react 组件

在 index.tpl.html 中创建一个 div 节点 `<div id="root"></div>`

接下来编写 react 组件，在 src 中新建一个js 文件，命名为 01-react-demo.js

```js
import React from "react"
import ReactDOM from "react-dom"

var Hello = React.createElement("h1", null, "Hello React!");
ReactDOM.render(Hello, document.querySelector("#root"));

```

执行 `npm run build`命令，想当然的，打包成功！在弹出的页面中也会显示出 Hello react 字样。

注意这是用 createElement 来创建虚拟 DOM，这样的创建方式有一个很大的缺点，那就是创建节点较麻烦，若含有多个嵌套关系，则代码就显得没有条理，不简洁。

最好的方式就是直接写 HTML 代码啦，即——使用 JSX 语法糖的方式来创建虚拟 DOM。详见 [JSX](http://facebook.github.io/jsx/) 。

我们将上述代码转换成 JSX ，代码如下

```jsx
import React from "react"
import ReactDOM from "react-dom"

var Hello = React.createClass({
  render: function() {
    return (
      <h1>Hello React!</h1>
    );
  }
});

ReactDOM.render(
  <Hello/>,
  document.querySelector("#root")
);

```

`npm start` 重启 WDS，弹出页面，显示空白？！推测 js 报错，F12 打开控制台，果不其然，报错了，并且看到这样一句话。

`You may need an appropriate loader to handle this file type.`

看到这里就应该知道，编译 JSX 少了一个或多个加载器。在此我们将使用 babel 来对 JSX 代码进行处理。

## 安装 babel

下面是安装 babel 的命令。

```js
// 安装 babel 插件 
npm install babel-core babel-loader babel-plugin-transform-runtime -D

npm install babel-preset-env babel-preset-stage-0 -D

// 安装识别 JSX 语法的包
npm install babel-preset-react -D
```

想必之前用 `babel-preset-es2015` 的小伙伴比较多，但是在 2017 年 `babel-preset-es2015`已经被废弃掉了，所以在这里用的是 `babel-preset-env`  。原因见官方的 [babel-preset-es2015 -> babel-preset-env](http://babeljs.io/env/)

安装完毕之后，我们就需要配置 babel 了。

在项目根目录建立 `.babelrc` 文件（Windows 系统下请命名：`.babelrc.`，注意是前后两个点） ，配置代码如下。

```json
{
  "presets": ["env", "stage-0", "react"],
  "plugins": ["transform-runtime"]
}

```

在 `webpack.config.js`中配置 `babel-loader`，最后配置文件代码如下所示

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

var htmlPlugin = new HtmlWebpackPlugin({
  template: "./src/index.tpl.html" // 配置模板文件
});

module.exports = {
  entry: "./main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  plugins: [
    htmlPlugin
  ],
  module: {
    rules: [{
      test: /\.js|jsx$/,
      use: ["babel-loader"],
      exclude: /node_modules/
    }]
  }
}
```

执行 `npm run build`，可以看到，打包过程没有报错。然后启动 WDS 服务会发现，React 组件渲染的DOM节点被正确的显示出来。