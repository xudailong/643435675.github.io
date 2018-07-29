---
layout: post
title:  "纯 css 也可以实现一个选项卡？"
date:   2018-07-28 08:30:00
categories: css
tags:  css css3 选项卡
author: 王文章
---

* content
{:toc}

![image](https://i.loli.net/2018/07/29/5b5db54082da2.gif)

以前想要实现一个 `tab` 切换选项卡功能，首先想到的就是使用 `javascript` 和 `jQuery` 啦 ，如：点击当前 `tab` 显示出对应的内容，同时将其他 `tab`  及内容隐藏掉 。这个功能用 `javascript`很好实现，而今天，我们将不使用 `javascript` 代码，而采取高大上的 `css`选择器来实现同样的效果。

本文将通过一个案例说明来对这一技术做一个简单的介绍。




## 演示说明

<style>
  *{
    outline: none;
  }
</style>
我们首先来看看效果怎样，以下示例页面可以看到（除非被 GFW ）
<iframe height='300' scrolling='no' title='纯 css 实现选项卡' src='//codepen.io/XDB/embed/EpbLKy/?height=300&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/XDB/pen/EpbLKy/'>纯 css 实现选项卡</a> by pdsuwwz (<a href='https://codepen.io/XDB'>@XDB</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

或者看这个，两着均可
<iframe width="100%" height="300" src="//jsfiddle.net/wangwenzhang/Lds0w76n/26/embedded/html,css,result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## 核心代码
看不到的可以看以下代码：

核心代码即是  `:checked` 选择器，代码比较简单，每次选择到一个 tab 标签时将其透明度改变为 1 即可。

代码稍微做了些美化，可自行修改。

> HTML代码

```html

<div class="container">
  <div class="nav">
    <div class="tab">
      <input type="radio" id="tab_1" name="tabs" checked>
      <label for="tab_1">粉色</label>
      <div class="content"></div>
    </div>
    <div class="tab">
      <input type="radio" id="tab_2" name="tabs">
      <label for="tab_2">枯色</label>
      <div class="content"></div>
    </div>
    <div class="tab">
      <input type="radio" id="tab_3" name="tabs">
      <label for="tab_3">青色</label>
      <div class="content"></div>
    </div>
  </div>
</div>

```

> CSS 代码

```css

.container{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 35em;
  height: 20em;
  margin: auto;
  font-size: 7px;
}

.nav{
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
}
.tab{
  flex: 1;
  height: 4em;
  text-align: center;
}
.tab [type=radio]{
  position: absolute;
  opacity: 0;
}
.tab label{
  display: block;
  height: 4em;
  line-height: 4em;
  background-color: #999;
  color: #fff;
  transition: .2s;
  cursor: pointer;
}
.tab .content{
  opacity: 0;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 16em;
  transition: .2s;
}

.tab:nth-child(1) .content{
  background-color: #fb7c85;
}
.tab:nth-child(2) .content{
  background-color: #5a4446;
}
.tab:nth-child(3) .content{
  background-color: #8baca1;
}

/* checked 选择器 */
.tab:nth-child(1) [name="tabs"]:checked ~ label{
  background-color: #fb7c85;
}
.tab:nth-child(2) [name="tabs"]:checked ~ label{
  background-color: #5a4446;
}
.tab:nth-child(3) [name="tabs"]:checked ~ label{
  background-color: #8baca1;
}

[name="tabs"]:checked ~ .content{
  opacity: 1;
  z-index: 1;
}


```
