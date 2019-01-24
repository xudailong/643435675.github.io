---
layout: post
title:  "浅谈 js 中的变量提升"
date:   2019-01-15 12:00:00
categories: js
tags:  js 变量提升 ES6
author: 王文章
---



* content
{:toc}
![var-hoisting.jpg](https://s2.ax1x.com/2019/01/23/kAZDrn.jpg)

之前一直听说 `js` 有 `变量提升` 这么个东西，不过也是一知半解，好吧，原谅我一直没有研究过。

前两天就被人问到了这个问题，给了我几行代码，要求写出正确顺序的打印结果。想都不用想，我掉坑里了。（不然的话我也不会单独开一篇文章来论述）

所以，我决定写下这篇文章，旨在更深入地理解和加深记忆，也希望能够对看到这篇文章的人有所启发。



## 概念	
> **变量提升**（Hoisting）被认为是，  JavaScript 中执行上下文 （特别是创建和执行阶段）工作方式的一种认识。 ----- 摘自 [【MDN-变量提升】](https://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)

我们可以从比较权威的 `MDN` 官方文档中的这句话分析出以下结果

- `JavaScript` 是含有 `执行上下文`（作用域） 的
- 变量的声明到执行是有一个过程的

## 案例分析

下面将以三个不同的典范和一个综合为例，分析变量提升对结果导向的一些影响
### 变量的提升

```js
if ( !('a' in window) ) {
  var a = 10;
}
console.log(a); // undefined
```

分析为什么输出的是 `a` 是 `undefined`

1. 首先我们知道 `js` 中没有块级作用域

2. 所以，在 `if` 语句中「定义」的变量 `a` 会被 `js` 引擎解析到当前的上下文（在这里表示全局环境 `window`）中，即会被预先「提升」到 `if` 语句外部

3. 上述代码等效于：
    ```js
    var a;
    if ( !('a' in window) ) {
      a = 10;
    }
    console.log(a); // undefined
    ```

4. 变量 `a`  被创建了，没有初始化和赋值，所以其值为默认的 `undefined`，又由于它属于 `window` 对象上的一个属性，故为 `true`，取反后 `false` ，条件语句内部没有执行，所以最终打印结果为 `undefined`

结论： **「变量声明可被提升到作用域的最顶层」**

### 变量和函数的提升

```js
var a = 10;
test();
function test() {
  console.log('01----', a); // undefined
  var a = 20;
  console.log('02----', a); // 20
  var a = 30;
}
console.log('03----', a); // 10
```

跟上一案例类似，都有一个变量提升的过程，我们来分析下

1. 首先在全局环境中「定义」了一个 `a` 变量，为其赋值为 10 

2. 当前环境含有一个 `test` 函数，所以它会被 `js` 引擎解析（提升）到当前作用域中，而且是全局作用域的最顶层

3. 函数 `test` 内部定义了两个局部变量 `a` ，所以同样会被解析到当前作用域中，这里是在 `test` 函数作用域的最顶层，注意第二个 `a` 的声明被忽略了

4. 上述代码等效于：
    ```js
    var a = 10;
    test();
    function test() {
      var a;
      console.log('01----', a); // undefined
      a = 20;
      console.log('02----', a); // 20
      a = 30;
    }
    console.log('03----', a); // 10
    ```

结论： **「变量声明和函数声明均可被提升到作用域的最顶层，且同一变量实际上只会被声明一次」**

从以上两个例子可以看出，「函数声明」和「变量声明」都会发生「作用域的提升」，那么这两个谁的声明提升层级更高一些呢，换句话说谁先被 `js` 引擎预解析呢？我们看下一个案例

### 提升层级对比

```js
console.log(A) // function A(){}
function A(){}
var A = 'aaa'
console.log(A) // aaa

/* 颠倒声明的位置结果也一样 */

console.log(B) // function B(){}
var B = 'bbb'
function B(){}
console.log(B) // bbb
```

从打印的结果可以得知 「函数声明」层级高于「变量声明」

1. 我们可以将上述代码理解为：
    ```js
    function A(){} // A 和 B 两个函数被提升到作用域最顶层
    function B(){}
    console.log(A) // function A(){}
    var A;
    var B;
    A = 'aaa'
    console.log(A) // aaa

    /* 颠倒声明的位置结果也一样 */

    console.log(B) // function B(){}
    B = 'bbb'
    console.log(B) // bbb
    ```

2. 函数 `A` 和 `B` 被提升到了最顶层，接下来是执行打印代码，执行完之后，「变量声明」开始提升，由于仅仅是声明而未设置初值，所以此时的 `A` 和 `B` 依然为函数，直到重新被赋值后类型才发生改变

结论：

  1. **「函数的声明提升层级高于变量声明」**
  2. **「函数声明的层级提升和它所处的声明位置无关」**

OK，了解了这些，我们来看一道比较综合的题目

### 综合

```js
function Foo() {
  getName = function(){
    console.log('1');
  };
  return this;
}
Foo.getName = function() {
  console.log('2');
};
Foo.prototype.getName = function(){
  console.log('3');
};

var getName = function() { // 函数表达式
  console.log('4');
};
function getName(){ // 函数声明
  console.log('5');
}
/* ------------打印，答案在后面------------ */
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

我们来具体分析下此题的变量提升

1. 首先在全局环境中「定义」了一个变量: `getName`（此时为函数表达式的形式） ，两个声明式的函数:  `getName` 和 `Foo` 

2. 声明式的函数 `getName` ，会被 `js` 引擎解析（提升）到当前作用域的最顶层，此时它与 `Foo` 函数并列

3. 变量 `getName` 开始提升，随后将一个匿名函数 `function(){console.log('4')}` 赋给它，故之后调用 `getName` 函数时都会打印出来 4，除非该函数再次被更改

4. 我们可以将上述部分代码理解为：

   ```js
   function Foo() {
     getName = function(){
       console.log('1');
     };
     return this;
   }

   function getName(){ // 函数声明
     console.log('5');
   }
   var getName;
   getName = function() { // 函数表达式
     console.log('4');
   };
   Foo.getName = function() {
     console.log('2');
   };
   Foo.prototype.getName = function(){
     console.log('3');
   };
   ```

5. 来看看实际打印的结果跟你想的是否正确

   ```js
   /* ------------打印------------ */
   Foo.getName(); // 2，
   getName(); // 4
   Foo().getName(); // 1
   getName(); // 1
   new Foo.getName(); // 2
   new Foo().getName(); // 3
   new new Foo().getName(); // 3
   ```

6. 我们来具体分析下

   - `Foo.getName()` 很明显，这里调用的是函数 `Foo` 的 `getName` 私有方法，打印「2」
   - `getName()` ，在全局环境中调用，因函数和变量表达式的提升，打印「4」
   - `Foo().getName()` ，首先在全局中直接调用了 `Foo` 函数，函数内部对全局的 `getName` 函数进行了重新赋值，故之后调用 `getName` 函数时都会打印出来 1，函数返回了 `this` ，其指向 `window` 对象，再调用 `window` 下的 `getName` 函数，打印「1」
   - `getName()` 直接调，打印「1」
   - `new Foo.getName()` ，这是一个实例化操作，但是执行的优先级为 `Foo.getName()`，其次才是 `new` 运算，打印「2」
   - `new Foo().getName()` ，依然是一个实例化，只不过执行的优先级变成了先 `new` 运算，其次再是调用 `getName` 函数（原型中的），打印「3」
   - `new new Foo().getName()` ，两次实例化，较上面的操作复杂一些，可以理解为： `new ( new Foo().getName )()`，打印「3」

## 总结

> 重复声明的变量会被忽略
>
> 变量和函数表达式的提升是声明提升，而函数则是连带函数体一起提升
>
> 函数声明提升层级高于变量提升

以上就是我对变量提升的一些思考，如有不足，欢迎指正 ~