---
layout: post
title:  "window下python3环境安装scrapy"
categories: 爬虫
tags:  scrapy 爬虫  
author: SnakeSon
---

* content
{:toc}

目录：

[TOC]

## 环境：

> python3  3.6.4， win7 64位  

##  初次安装：

> ``` pip install scrapy```

使用这个命令，在win7 64位是怎么也安装不上去的，因为这已经是第二次了，

当这个命令输出完后，会出现一系列的问题。当然了，不用怕，这不是需要解决问题的方法来了嘛。





可能出现需要下载版本对应的visual studio,但是也太大了，或也可以说下载慢。。。。。。但是，我们可以不用去进行下载，只要进行下面几个文件的安装就可以了。

## 打开网站

首先你打开这个网站（里面包含了各种编译好的库）：
> [http://www.lfd.uci.edu/~gohlke/pythonlibs/#lxml](http://www.lfd.uci.edu/~gohlke/pythonlibs/#lxml)


## 安装wheel

> ``` pip install wheel```

安装成功的界面

![wheel—success.png](http://upload-images.jianshu.io/upload_images/2577413-93cab0d529ca1dba.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 安装.whl文件

这里需要安装三个.whl文件，而且是全名的安装，

以下三个文件：

![.whl文件.png](http://upload-images.jianshu.io/upload_images/2577413-eaf16a31171cd6ac.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

中途可能会出现```Failed to build XXXX ``` 或者是``` twisted```等相关的内容

因为scrapy是基于twisted框架的，所以，twisted框架也需要进行安装

当上面三个文件安装好了：

再次运行：

```js
scrapy startproject pyjy
```

这样就完成了scrapy在win下python3下的安装


## end



