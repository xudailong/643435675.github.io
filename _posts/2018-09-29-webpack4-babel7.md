---
layout: post
title:  "Babel7 + Webpack 4.x 踩坑"
date:   2018-09-29 12:00:00
categories: webpack
tags:  webpack babel 脚手架
author: 王文章
---



* content
{:toc}
![babel](https://babel.docschina.org/img/babel.svg)
不踩不知道，一踩吓一跳，babel 7 发布了有一个月了，今天试了试，发现各种报错，直到我发现了 官网有这么个玩意 babel-upgrade ，真如柳暗花明般神奇，不吹不黑，用了都说好。顺便升级下 webpack 。在这里总结下升级过程中遇到的一些细节问题。





### webpack `3.x` => webpack `4.x`

## 废弃的插件

```js

 extract-text-webpack-plugin // 用于抽离样式文件
 
 webpack.optimize.UglifyJsPlugin // 用于压缩 js 文件

```

## 替换的插件

上述插件分别改为

```js
 
  mini-css-extract-plugin
  
  optimization.minimize // webpack 4.x 中的配置项
  
```

## webpack 4.x 插件用法

```js
 
 // webpack.config.js
 
 const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
 module.exports = {
   optimization: {
     minimize: true // true 为开启压缩，为了缩短打包时间，一般在开发环境不开启，
   },
   
   module: {
     rules: [{
       test: /\.js$/,
       exclude: /node_modules/,
       loader: "babel-loader"
     }, {
       test: /\.css/,
       use: [MiniCssExtractPlugin.loader, "css-loader"],
     }]
   }
   plugins: [
     new MiniCssExtractPlugin({
       filename: "[name].css",
       chunkFilename: "[id].css"
     }),
   ]
 }
 
```

 如果有用到  `css` 预处理的方式，诸如 `sass` 则，还需要在 `rules` 中添加这样一个 `loader` ：

```js
{
  test: /\.scss/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
}
 
```

---
无休止的分割线
## 升级 Babel
2018年09月29日

将 `babel` 升级到当前最新版 7.x

依照官网：[https://webpack.js.org/loaders/babel-loader](https://webpack.js.org/loaders/babel-loader)
#### webpack `4.x` + babel-loader `8.x` + babel `7.x`

> npm install -D babel-loader @babel/core @babel/preset-env webpack

#### webpack `4.x` + babel-loader `7.x` + babel `6.x`

> npm install -D babel-loader@7 babel-core babel-preset-env webpack

## 两种 Babel7 配置方式

| 种类   | babel | 加载器 | 核心包      | 环境预设包        | webpack |
| ------ | ----- | ------ | ----------- | ----------------- | ------- |
| 第一种 | 7.x   | 8.x    | @babel/core | @babel/preset-env | 4.x     |
| 第二种 | 6.x   | 7.x    | babel-core  | babel-preset-env  | 4.x     |


> 注：环境预设包 preset-env 会根据用户自定义配置的目标运行环境自动启用目标浏览器所需的 babel 插件，来达到按需编译的目的，详见官网介绍：[https://babeljs.io/docs/en/babel-preset-env/](https://babeljs.io/docs/en/babel-preset-env/)


既然本着升级到最新的原则，那么我们就来走第一种，

## 迁移工具 babel-upgrade
若原本的项目本身含有 babel-preset-* 等依赖，那么我们可以这么做，

有一种简便快速的方法，快速配置，详见这里 babel 的升级迁移指南：[https://github.com/babel/babel-upgrade](https://github.com/babel/babel-upgrade)

只需执行一条命令，使用 npx 命令前提得保证 node 版本不小于 v5.2.0，否则需要单独安装 npx


```js

npx babel-upgrade --write --install

```

执行完后会发现 package.json 和 .babelrc 文件中依赖项都相应的自动更新了，这个工具为我们自动完成了升级 babel 所需的配置

## 旧的依赖

```js

"babel-core": "^6.25.0",
"babel-loader": "^7.1.1",
"babel-plugin-transform-runtime": "^6.23.0",
"babel-polyfill": "^6.26.0",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"babel-preset-stage-2": "^6.24.1",
...

```

## 新的依赖

```js

"@babel/core": "^7.0.0", // babel-core 6.x => 7.x
"@babel/plugin-proposal-class-properties": "^7.0.0",
"@babel/plugin-proposal-decorators": "^7.1.2",
"@babel/plugin-proposal-export-default-from": "^7.0.0",
"@babel/plugin-proposal-export-namespace-from": "^7.0.0",
"@babel/plugin-proposal-function-sent": "^7.0.0",
"@babel/plugin-proposal-json-strings": "^7.0.0",
"@babel/plugin-proposal-numeric-separator": "^7.0.0",
"@babel/plugin-proposal-throw-expressions": "^7.0.0",
"@babel/plugin-syntax-dynamic-import": "^7.0.0",
"@babel/plugin-syntax-import-meta": "^7.0.0",
"@babel/plugin-transform-modules-commonjs": "^7.1.0",
"@babel/plugin-transform-runtime": "^7.0.0",
"@babel/polyfill": "^7.0.0",
"@babel/preset-env": "^7.0.0",
"@babel/preset-react": "^7.0.0", 
"babel-loader": "^8.0.0", // 这里可以看到改变，babel-loader7.x => 8.x
...

```

## 坑

安装完后再用 webpack 打包可能会发现报如下错误（警告）

```js

export 'default' (imported as 'xxx') was not found in 'xxx' 

```

这里并不是说我们语法有错误，而是 babel 自身没有将 es6 的代码编译成 es5

经过研究，发现安装此插件就会恢复正常，
```bash

yarn add @babel/plugin-transform-modules-commonjs -D

or

npm install @babel/plugin-transform-modules-commonjs -D

```

貌似这是 babel 迁移工具的 bug ，没有将全部依赖集成到 babel-upgrade 中，导致了 es6 最基本的语法都不会被编译。

我们知道 `babel-polyfill` 变成了 `@babel/polyfill`，所以 webpack.config.js 中的入口文件那里也需要进行相应的改变

```js

module.exports = {
  entry: ['babel-polyfill','./src/script/app.js'],
}

// 修改为

module.exports = {
  entry: ['@babel/polyfill','./src/script/app.js'],
}

```

若打包时提示此类错误 Cannot find module from babel-runtime ...

则安装 `@babel/runtime` 和 `@babel/runtime-corejs2` ，并在 .babelrc 中配置即可。

详见官网的配置讲解：[https://babeljs.io/docs/en/babel-plugin-transform-runtime](https://babeljs.io/docs/en/babel-plugin-transform-runtime)

```bash

yarn add @babel/runtime @babel/runtime-corejs2 -S

or

npm install @babel/runtime @babel/runtime-corejs2 -S

```

最终 .babelrc ，仅供参考。

```js

{
  "presets": [
    [
      "@babel/preset-env"
    ],
    [
      "@babel/preset-react"
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": false,
        "helpers": true,
        "regenerator": true,
        "useESModules": false
      }
    ],
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-json-strings",
    [
      "@babel/plugin-proposal-decorators",
      {
        "legacy": true
      }
    ],
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-transform-modules-commonjs"
  ]
}

```


## 附：迁移过程 log
仅供参考，自动配置的不一定正确，还需要对照官网和 issue 问题来配置。

```bash

Updating .babelrc config at .babelrc
Index: .babelrc
===================================================================
--- .babelrc	Before Upgrade
+++ .babelrc	After Upgrade
@@ -1,19 +1,32 @@
 {
   "presets": [
-    "react",
-    "es2015",
-    "stage-2"
+    "@babel/preset-react",
+    "@babel/preset-env"
   ],
   "plugins": [
     [
-      "transform-runtime",
+      "@babel/plugin-transform-runtime",
       {
         "helpers": false,
         "polyfill": true, // 注意 babel7 中此配置已废弃掉
         "regenerator": true,
         "moduleName": "babel-runtime" // 注意 Babel7 中此配置已废弃掉
       }
-    ]
+    ],
+    "@babel/plugin-syntax-dynamic-import",
+    "@babel/plugin-syntax-import-meta",
+    "@babel/plugin-proposal-class-properties",
+    "@babel/plugin-proposal-json-strings",
+    [
+      "@babel/plugin-proposal-decorators",
+      {
+        "legacy": true
+      }
+    ],
+    "@babel/plugin-proposal-function-sent",
+    "@babel/plugin-proposal-export-namespace-from",
+    "@babel/plugin-proposal-numeric-separator",
+    "@babel/plugin-proposal-throw-expressions"
   ]
 }
\ No newline at end of file


Updating closest package.json dependencies
Index: /Users/admin/Documents/zhike/Mypractice/project/react-app/package.json
===================================================================
--- /Users/admin/Documents/zhike/Mypractice/project/react-app/package.json	Before Upgrade
+++ /Users/admin/Documents/zhike/Mypractice/project/react-app/package.json	After Upgrade
   "devDependencies": {
+    "@babel/core": "^7.0.0",
+    "@babel/plugin-proposal-class-properties": "^7.0.0",
+    "@babel/plugin-proposal-decorators": "^7.0.0",
+    "@babel/plugin-proposal-export-namespace-from": "^7.0.0",
+    "@babel/plugin-proposal-function-sent": "^7.0.0",
+    "@babel/plugin-proposal-json-strings": "^7.0.0",
+    "@babel/plugin-proposal-numeric-separator": "^7.0.0",
+    "@babel/plugin-proposal-throw-expressions": "^7.0.0",
+    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
+    "@babel/plugin-syntax-import-meta": "^7.0.0",
+    "@babel/plugin-transform-runtime": "^7.0.0",
+    "@babel/polyfill": "^7.0.0",
+    "@babel/preset-env": "^7.0.0",
+    "@babel/preset-react": "^7.0.0",
-    "babel-core": "^6.25.0",
-    "babel-loader": "^7.1.1",
+    "babel-loader": "^8.0.0",
-    "babel-plugin-transform-runtime": "^6.23.0",
-    "babel-polyfill": "^6.26.0",
-    "babel-preset-es2015": "^6.24.1",
-    "babel-preset-react": "^6.24.1",
-    "babel-preset-stage-2": "^6.24.1",

Installing new dependencies

```



 
