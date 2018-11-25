---
layout: post
title:  "简要记一次给字符串添加换行符的方法"
date:   2018-11-24 12:00:00
categories: js
tags:  js 换行 字符串 分割
author: 王文章
---



* content
{:toc}
![texture-1362873_640.jpg](https://i.loli.net/2018/11/25/5bfa523de6aa2.jpg)

想要提高开发效率、代码复用性还需多加思考。

且看这样一个需求，实现横向连续排列的文本，可以是纯文本，也可以是文字链。

很简单对吧，直接将他们写到 html 上，加几个 `</br>` 不就完了嘛。

纳尼？？你问我程序员最基本的素养跑哪了？？这样写不光没法复用，而且也没法配置，文案一变，html 就得跟着变，忒麻烦！

好吧好吧，那就简单封装下。

因为经常写 H5 ，并且连续碰到了好几个这样的需求，没办法，上班忙里偷闲封装下啦

我们能够做的就是将一个大的字符串分割为几个小的再渲染到页面上，大致思路是遇到一个指定标识符就加个 `</br>` 最终再输出为 `html`。




好了，废话不说多，先上代码
## 纯文本分割
我们这里将分割的标识符设置成了 `分号`，用到了正则替换，可以根据需求自行变动

```js
// 设置内容换行
function _semiContent(content) {
  return content.replace(/[;；]/g, "<br/>");
}
_semiContent("Hello;World你好;鸭") // Hello<br/>World你好<br/>鸭
```

是不是感觉很简单呐，我们再来看看文字链的

## 文字链分割

这里我们跟纯文本的实现方式是一样的，都是先用一个标识符分割开

唯一不同的是需要再转换为 `数组`，每次遍历都添加到一个父节点里，后面追加一个 `<br/>`

最后再返回整个父节点，代码如下。

其中用到了一个 `insertAdjacentHTML` 函数，

据 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/insertAdjacentHTML) 描述，因为它避免了额外的序列化步骤，所以效率要比直接 `innerHTML`高。

```js
!(function(){
  /**
   * @param {String} content
   * @param {String} wrap
   * @param {Array} data
  */
  function _semiContent(content, wrap, data){
    var flag = "<br/>"
    var arr = content.replace(/[;；]/g, flag).split(flag)
    var parent = document.createElement('p');
    for(var i = 0, length = arr.length; i < length; i++){
      var item = document.createElement(wrap)
      item.innerHTML = arr[i]
      item.setAttribute("href", data[i])
      item.setAttribute("target", "_blank")
      parent.appendChild(item)
      if(i != length - 1){
        item.insertAdjacentHTML('afterEnd', flag)
      }
    }
    parent.classList.add('semi')
    return parent
  }
  var data = ["https://reactjs.org/", "https://www.baidu.com", "https://github.com/pdsuwwz"]
  console.log(_semiContent("react;baidu;pdsuwwz", "a", data))
})();
```
代码预览
<iframe height='300' scrolling='no' title='简要记一次给字符串添加换行符的方法' src='//codepen.io/XDB/embed/NEzKzZ/?height=300&theme-id=34141&default-tab=js,result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/XDB/pen/NEzKzZ/'>简要记一次给字符串添加换行符的方法</a> by pdsuwwz (<a href='https://codepen.io/XDB'>@XDB</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
