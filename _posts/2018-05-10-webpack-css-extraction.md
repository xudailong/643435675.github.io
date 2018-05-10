---
layout: post
title:  "使用 webpack 对 css 进行分离式打包"
date:   2018-05-10 10:05:20
categories: webpack
tags:  webpack css 分离式
author: 王文章
---

* content
{:toc}

![webpack](https://i.loli.net/2018/04/21/5ada9267452a4.jpg)

我们都知道，要想使得 css 样式能够在打包后生效，至少需要用到 `style-loader`和 `css-loader`这两个 loaders，`style-loader` 的作用就是通过自动注入 `<style>` 标签将 css 添加到 `<head>` 中。这有个前提，那就是 webpack 得将 css 和 js 都打包到一个 js 文件中，我们之前都是这么做的，但是这样就会导致一个问题，若样式足够多，那么就会使得打包后的 js 体积变大，会阻碍页面加载的速度，而且容易导致页面结构发生错乱，特别是在 js 没有完全加载出来的情况下导致页面无法正常显示样式。本小节将针对这一问题做出解决方案，要在打包时对 css 样式进行分离。



## 准备工作

按照惯例，首先需要找一个空文件夹，初始化后安装 [webpack](https://www.npmjs.com/package/webpack) 

在这里我依旧使用`2.3.2`版本的 webpack

`style-loader`和 `css-loader`是少不了的

若 css 样式文件中有对图片资源的引用，诸如背景图片，icon 图标等，则还需要安装 `url-loader`和 `file-loader`

其中 `url-loader`负责对图片资源进行编码，而`file-loader`负责解析项目中资源文件的路径问题。详见 [file-loader](https://webpack.js.org/loaders/file-loader/) 和 [url-loader](https://webpack.js.org/loaders/url-loader/)。



## 安装extract-text-webpack-plugin插件

`extract-text-webpack-plugin` 的作用为抽离 css 样式文件

执行命令安装，要注意这里，本次用到的 webpack 版本是 2.x 的，所以要安装对应 2.x 版本的 extract-text-webpack-plugin 插件，否则可能会报如`chunk.sortModules is not a function`的错误。详见 [extract-text-webpack-plugin](https://www.npmjs.com/package/extract-text-webpack-plugin)。

`npm install extract-text-webpack-plugin@2.1.2 -D`

具体的请看如下 `webpack.config.js` 配置文件，入口文件和其他资源文件的路径请自行配置。

```js
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssExPlugin = new ExtractTextPlugin("[name].css");
module.exports = {
  entry: {
    "rating": "./main.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(png|jpg|jpeg|gif|woff)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: "8192",
          name: "[path][name].[ext]"
        }
      }
    }]
  },
  plugins: [cssExPlugin]
}

```



