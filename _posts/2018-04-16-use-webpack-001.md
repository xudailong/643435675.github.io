---
layout: post
title:  "Webpack 初次使用小结"
date:   2018-04-16 07:31:04
categories: Webpack
tags:  打包 Webpack
author: 王文章
---

* content
{:toc}

## 介绍

![webpack](https://i.loli.net/2018/04/21/5ada9267452a4.jpg)

webpack 是一个模块打包器。webpack 的主要目标是将 JavaScript 文件打包在一起，打包后的文件用于在浏览器中使用，但它也能够胜任转换(transform)、打包(bundle)或包裹(package)任何资源(resource or asset)。





## 准备工作

**在学习 webpack 之前，需要准备以下东西：**

Windows操作系统、node.js 大于4.7.0的环境、node随同的npm，

## 过程

1、新建一个文件夹 例如：first-webpack
2、进入 first-webpack 文件夹，打开所在的位置的命令行
3、执行以下命令，作用是建立一个 package.json 文件

> ```js
> 
> npm init
> 
> ```

4、生成过 package.json 文件之后，执行以下命令；由于当前较新版本的Webpack（目前为4.0.0）不再支持 node.js 4，所以为了方便测试，使用了较低版本的 webpack 2.3.2，而node使用5.0.0或者6.0.0

> ```js
> 
> npm install webpack@2.3.2 --save-dev
> 
> ```

5、安装完 webpack 之后，就可以开始使用了，首先在 first-webpack 文件夹中建立一个 app 文件夹，在里面新建一个index.js，内容如下：

> ```js
> 
> console.log("Hello World!");
> 
> ```

6、随后打开命令行，执行以下命令，注意在 Windows 下使用 webpack 命令时必须是反斜杠 “\”，作用是将打包后的js文件输出到 build 文件夹的 index.bundle.js 里。

> ```js
> 
> node_modules\.bin\webpack app/index.js build/index.bundle.js
> 
> ```

7、这样，第一个使用webpack打包js文件的例子就完成了！









