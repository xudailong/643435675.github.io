---
layout: post
title:  "鼠标点击速度过快导致的蓝色背景bug"
date:   2018-04-17 08:50:07
categories: CSS
tags:  bug CSS HTML
author: 王文章
---

* content
{:toc}

## 目的

解决鼠标点击速度过快导致的蓝色背景的bug，两种方案，CSS 和 js 都可以实现。

## 代码

```css
 
body {
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    -khtml-user-select: none; /*早期浏览器*/
    user-select: none;
}

```

```js

document.onselectstart = new Function("return false");

```





















