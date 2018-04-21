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

![dbclick](https://i.loli.net/2018/04/21/5ada9e865d120.gif)

小伙伴们想必都知道在网页中的空白处或文字上双击，会导致部分文字背景变蓝，这样对用户的体验不太友好，如何解决这个问题呢。我们可以通过 css 或者 js 代码来解决这个问题。





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





















