---
layout: post
title:  "webpack 之压缩 js 文件"
date:   2018-05-11 09:20:00
categories: webpack
tags:  webpack 压缩
author: 王文章
---

* content
{:toc}

![webpack](https://i.loli.net/2018/04/21/5ada9267452a4.jpg)

第一次接触 webpack 自带的 [uglifyjs](https://www.npmjs.com/package/uglifyjs) 压缩工具，发现它已经过时，如果我们想要将打包的 js 模块压缩，我们可以用这样一个压缩插件 [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin)来替代它，目前来看，作者依然在维护中。本节将简单介绍如何使用这个插件来实现对 js 模块的压缩打包功能。



## 准备工作

安装 webpack（本节使用的 webpack 版本为 2.3.2）必不可少，以下是有可能会用到的加载器。

嵌入式插入 css 样式和加载 css 样式的 `style-loader`、`css-loader`

对图片资源编码和解析资源文件路径问题的两个加载器，`url-loader`、`file-loader`

OK，准备步骤完成，接下来是安装和配置。

## 安装webpack-parallel-uglify-plugin插件

`npm install webpack-parallel-uglify-plugin -D` 

配置 `webpack.config.js` 文件

首先引入这个插件

```js
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
```

对这个插件实例化

```js
const uglifyPlugin = new ParallelUglifyPlugin({
  cacheDir: '.cache/',
  uglifyJS: {
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }
});
```

`cacheDir` 为设置压缩后的缓存目录，若不写则不会产生缓存。

`uglifyJS` 使用的是 `uglify-js@3` ，详见  [webpack-parallel-uglify-plugin](https://www.npmjs.com/package/webpack-parallel-uglify-plugin) 说明。

最后将对象插配置到 plugins 中即可。

```js
plugins: [uglifyPlugin]
```











