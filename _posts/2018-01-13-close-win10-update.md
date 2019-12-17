---
layout: post
title:  "win10 关闭更新"
categories: win10
tags:  win10 工具软件  
author: SnakeSon
---

* content
{:toc}


## 前言

因为自己的电脑装了双系统（win10 跟Ubuntu16.04），在win10下，有时候每次关机的时候都说要进行更新后进行关机，就是自动更新功能，现在的选项中没有关闭自动更新的选项了，这是一个bug，微软要强制更新。

我就忍受不了自动更新，会拉取网络，影响我们的上网体验，但是我们不要他自动更新，那怎么办呢，其实还是有解决方法的，下面就介绍怎么关闭自动更新功能！（ps：百度有些人写的其实是win8的自动更新，根本就不是win10的，我这个才是win10的处理方法）希望能帮到你们。

## 操作步骤

1 右键点击左下角微软按钮，找到“运行”   也可用键盘的win+R     

![图片.png](http://upload-images.jianshu.io/upload_images/2577413-07f3d54cc3ce1538.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

2 在运行处输入 “services.msc”   点击确定。

![图片.png](http://upload-images.jianshu.io/upload_images/2577413-2df616c88439415a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





3 在弹出来的服务中，找到“Windows Update”

![图片.png](http://upload-images.jianshu.io/upload_images/2577413-403c9d7761ad60b7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

4 选择禁用

![图片.png](http://upload-images.jianshu.io/upload_images/2577413-1728ba13ad50acfa.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

5 点击确定或者启动就可以了，这时候我们可以看到：
![图片.png](http://upload-images.jianshu.io/upload_images/2577413-8d901951002a4bc1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

会多出这两个位置，这样子就设置成功了。



