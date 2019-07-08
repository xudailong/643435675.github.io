---
layout: post
title:  "浅谈 js 中的事件循环"
date:   2019-06-22 12:00:00
categories: js
tags:  js 事件循环
author: 王文章
---



* content
{:toc}
![event loop](https://mdn.mozillademos.org/files/4617/default.svg)

Event loop 这个话题一直都在被我们讨论着，从未停止。但是我个人从来没有认真研究过它的内部是如何工作的，像异步执行顺序，宏任务和微任务这些都不是很清楚。所以我想借这个话题来探讨下这方面的知识，加深印象，也算是巩固基础了。



在学习之前我们先来了解 js 的单线程
## js 为什么是单线程？

什么是单线程？通俗的讲就是同时有且仅有一段代码被执行。

js 设计的初衷就是应用在浏览器中，作为脚本语言为 HTML 页面增加动态交互效果，从而引入了操作 DOM 元素的 API。

假如说 js 是多线程的，那么存在这么一个需求：要求记录 DOM 元素被修改后的状态。

我们可以假设，假如此时有多个线程在修改这一个 DOM，那么最终该以哪个线程修改的 DOM 状态为准呢？或者这样问，多个线程同时操作一个DOM 会有问题吗？

考虑到这一点，设计者简化了 js 的复杂程度。

所以，这就是为什么 js 被设计成了单线程，它的背后是存在着一定的历史包袱和客观因素的。

那么我们如何提高单线程 js 的运行效率呢？

我们试想这么一个案例：

> 小明在超市买了许多东西，买完了去让店员结账，
> 
> 但是结账时他不想干等着，怎么办呢？
> 
> 于是他想趁这个空隙看一看天气和新闻吧，直到店员告诉他结账完成。

我们可以用一段简单的代码来表示它的大致过程

```js
console.log('小明开始结账...')
setTimeout(() => {
  console.log('结账完成！')
}, 2000)
console.log('小明看天气、新闻...')
```

是不是很容易理解了呢？

我们充分利用了等待的时间，来达到更高的`吞吐量`，也就是 js 中的异步操作。

中间店员从结账开始到告诉小明结账完成的过程就是异步的。

## js 为什么需要异步？
* 反证法，假如 js 中不存在异步，只有同步，那么只能自上而下地执行，如果中间有一段很耗时的代码，那么当这段代码被执行的时候，后面的代码就变成等待中了，也就是被阻塞了，对于浏览器用户来说，如果不小心点了个按钮，整个页面就卡死了。
* 所以当初设计者就考虑到了这些问题，这也说明 js 对异步的支持是符合绝大多数应用场景的。

好，现在我们知道了 js 是单线程并且允许执行异步操作的，那么它和同步操作之间的`执行顺序`又是如何安排的呢？

这其中是存在着一个 event loop 管控机制的。

## Event loop

我们先来看一个场景，比较简单
```
存在 A, B, C 三个任务等待被执行
A 和 C 为同步操作，B 为异步操作，如何表示他们的执行顺序呢？
```

很显然，我们通过刚才购物结账的例子可以得知执行结果为： A, C, B

其运行过程大致是这样的：

* A 为同步，js 引擎按照顺序首先把 A 放在主任务中执行，执行完毕之后轮到 B
* 发现 B 是一个异步的任务，好，不管，暂且放到`等待区`中等待
* 接下来继续按照顺序，发现 C 是一个同步任务，那么就放在主任务中执行
* C 执行完之后，js 引擎继续向后查询，发现所有同步任务均执行完毕
* 此时 js 引擎就开始检查`等待区`中的任务，发现 B ，将 B 放在主任务中执行
* 假如说 B 中又包含了一些同步和异步的任务，继续重复刚才的步骤，直到全部任务执行完毕才算结束

你可以将`主任务`理解为`执行栈`（`主栈`），每次执行时 js 引擎会将任务压入`栈底`，等到任务执行完，再将其`弹出`（`出栈`）

如果 js 引擎发现是一个异步任务的话，则直接放到任务队列中等待，直到`执行栈`中空闲时，`队列中的异步任务`才会被压入`执行栈`中执行。

我们将以上整个过程称之为 event loop，也就是 js 事件循环的核心。

也可以说，凡是主栈空闲了，就会进入到下一个轮次，开始新的一轮。

### 宏任务和微任务

刚才我们提到了同步和异步操作，其实还可以将这些操作做一个更细致的划分

* 宏任务（macro task）
    * setTimeout
    * setInterval
    * setImmediate
* 微任务（micro task）
    * Promise
    * process.nextTick

> 由于`同步任务`是首先被压栈执行的，优先级最高，遵循自上而下的执行顺序，因此为了加以区分它与宏任务和微任务，我们可以单独称它为 【script】。

这里我们只讨论异步中的宏任务和微任务

还有一点我们需要知道，那就是`微任务是先于宏任务执行`的，即：`微任务 > 宏任务`

刚才我们说了，`异步任务会在任务队列中等待`，直到【执行栈】空闲时才会被【压栈】执行

我们先来看几道题目，先说明，我们之后会以 event loop 的方式去分析它们。

关于 promise 的内部执行规则可以看 MDN 上所介绍的。[MDN 使用 Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises#%E7%BA%A6%E5%AE%9A)

我将它摘了出来：

> 不同于老式的传入回调，在应用 Promise 时，我们将会有以下约定：
> * 在本轮 Javascript event loop（事件循环）运行完成之前，callbacks（回调）是不会被调用的。
> * 综上，通过 .then() 形式添加的回调函数总会被调用，即便是在异步操作完成之后才被添加的函数。
> * 通过多次调用 .then()，可以添加多个回调函数，它们会按照插入顺序并且独立运行。
>
> 因此，Promise 最直接的好处就是链式调用。

### 第一道题目 setTimeout 与 promise

```js
setTimeout(() => {
  console.log(1)
});
new Promise((resolve) => {
    console.log(2);
    resolve();
}).then(() => {
  console.log(3);
});
console.log(4);
```

> 正确输出： 2，4，3，1

* 第1轮
  * js 引擎发现 setTimeout 为异步的，且是一个宏任务，所以将它放到【宏任务队列】中等待。script 继续执行
  * 接下来构造了一个 promise 实例对象，我们知道，虽然 promise 被归结到了微任务中，但构造 promise 过程中绑定的函数（`executor`）其实是【立即执行】的，也就是【同步】的
  * 所以 js 引擎将它【压入主栈】执行，即会先打印出` 2 `
  * 随后执行 resolve()，此时要注意，我们刚才提到了【promise 的内部执行规则】，里面有两点，第一，如果本轮 event loop 没有完成，那么就不会执行 then()；第二，then() 被调用这件事会由之后的【线程循环】来调度完成，详细说明可以看这里 [MDN Promise 返回值](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then#%E8%BF%94%E5%9B%9E%E5%80%BC)，也就是说，then() 是【异步调用】的。事实上，不论什么情况下，它都是异步的，这也进一步说明了为什么 promise 被归到了异步中。
  * 此时，then() 进入【微任务队列】中等待（入队），script 继续执行
  * 同步任务，打印出` 4 `，script 继续执行，发现主栈空闲，进入下一轮
* 第2轮
  * 该从【任务队列】中读取任务了，而此时任务队列中有两种，宏任务：[setTimeout]，微任务：[promise的then()]
  * 显然 then() 会先执行，js 引擎将该【微任务队列】放到主栈中执行，打印出` 3 `，出栈，主栈空闲，进入下一轮
* 第3轮
  * 任务队列中仅剩宏任务 setTimeout ，所以最后从宏任务队列中将 setTimeout 拿出来放入主栈中执行，打印出` 1 `，出栈，整个过程结束。

> 最终结果： 2，4，3，1

以上，简要分析了事件循环在实际应用场景中的整个执行过程，其中重点在于理解 promise 的内部机制，它的 then() 是`异步执行的`，且会被放到【微任务队列中】去等待。 

文字表述不容易看出细节，所以这里我们可以将整个过程以数据的方式呈现出来：

注意： 

> JS stack 表示执行栈，最左为栈顶，最右为栈底，栈顶先出
> 
> Microtasks 和 Macrotasks 表示任务队列，最左为队首，最右为队尾，队首先出

* 第1轮

| 操作 | 结果 |
| ------ | ------ |
| JS stack | [script]  |
| Microtasks |  |
| Macrotasks | [setTimeout] |
| Log |  |

主栈代码开始执行，将 setTimeout 放入【宏任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack | [Promise executor] [script] 
Microtasks |
Macrotasks | [setTimeout]
Log |

promise executor 函数开始执行

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script] 
Microtasks | [Promise then callback]
Macrotasks | [setTimeout]
Log | 2

打印出` 2 `，执行 resolve() ，将 then() 放入【微任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script]
Microtasks | [Promise then callback]
Macrotasks | [setTimeout]
Log | 2 4

打印出` 4 `

| 操作 | 结果 |
| ------ | ------ |
JS stack |
Microtasks | [Promise then callback]
Macrotasks | [setTimeout]
Log | 2 4

此时主栈变为空闲状态，进入下一轮

* 第2轮

| 操作 | 结果 |
| ------ | ------ |
JS stack | [Promise then callback]
Microtasks |
Macrotasks | [setTimeout]
Log | 2 4 3

将 promise 的 then() 拿到主栈中执行，打印出` 3 `

* 第3轮

| 操作 | 结果 |
| ------ | ------ |
JS stack | [setTimeout]
Microtasks |
Macrotasks |
Log | 2 4 3 1

promise then 出栈，执行宏任务 setTimeout，打印` 1 `，整个过程结束。

这样来看，整个过程是不是就变得清晰了。

### 第二道题目 async/await 与 promise

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}
async function async2() {
  console.log('async2');
}
console.log("script start");
setTimeout(() => console.log("setTimeout"));
async1();
new Promise((resolve) => {
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("promise2");
});
console.log('script end'); 
```

* 第1轮

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script] 
Microtasks |
Macrotasks |
Log | script start

主栈代码开始执行，方法定义，打印出 script start

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script] 
Microtasks |
Macrotasks | [setTimeout]
Log | script start

将 setTimeout 放入【宏任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script] 
Microtasks |
Macrotasks | [setTimeout]
Log | script start，async1 start，async2

执行 async1 函数，打印出 async1 start，执行 async2 函数，打印出 async2

` 标注，后面会用到【 ★ 1 】`

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script] 
Microtasks | [async1 await]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2

由于 async1 中有 await 出现，所以将 await 之后的操作放入【微任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack | [Promise executor] [script] 
Microtasks | [async1 await] [Promise then callback]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1

promise executor 函数开始执行，打印出 promise1，执行 resolve() ，将 then() 放入【微任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script] 
Microtasks | [async1 await] [Promise then callback]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end

promise executor 执行完毕，出栈，主栈执行，打印出 script end，主栈空闲，进入下一轮

* 第2轮

| 操作 | 结果 |
| ------ | ------ |
JS stack | [async1 await] 
Microtasks |[Promise then callback]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end，async1 end

将 async1 await 放入主栈执行，打印出 async1 end

| 操作 | 结果 |
| ------ | ------ |
JS stack | [Promise then callback]
Microtasks |
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end，async1 end

async1 await 出栈，微任务队列 Promise then callback 进入主栈

| 操作 | 结果 |
| ------ | ------ |
JS stack |
Microtasks |
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end，async1 end，promise2

打印出 promise2，出栈

* 第3轮

| 操作 | 结果 |
| ------ | ------ |
JS stack | [setTimeout]
Microtasks |
Macrotasks |
Log | script start，async1 start，async2，promise1，script end，async1 end，promise2，setTimeout

执行宏任务 setTimeout，打印` 1 `，整个过程结束。

所以最后打印输出：

script start，async1 start，async2，promise1，script end，async1 end，promise2，setTimeout

好，我们根据刚才学到的方法来分析这道题目得出的答案是这样的，但是实际上你如果用高版本的 chrome 或 node 来执行的话，可能得出这样的答案：

script start，async1 start，async2，promise1，script end，`[promise2]`，`[async1 end]`，setTimeout

注意用[]括住的这两处。

我们可以这样理解，在高版本的 v8 引擎中，await 之后的函数相当于被让出了线程，从而在同一上下文中，比 promise executor 的过程慢了一步，即 await 的优先级是低于 promise executor 的。

从第1轮中标注星号的那一步开始需要这么做了：

原来的解释：
【 ★ 1 】

| 操作 | 结果 |
| ------ | ------ |
JS stack | [script] 
Microtasks | [async1 await]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2

由于 async1 中有 await 出现，所以将 await 之后的操作放入【微任务队列】中

现在的解释：
【 ★ 1 】

| 操作 | 结果 |
| ------ | ------ |
JS stack | [promise executor] [script]
Microtasks | [Promise then callback]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2

await 让出线程，接着执行 promise executor 函数，打印出 promise1，执行 resolve() ，将 then() 放入【微任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack | [promise executor] [script]
Microtasks | [Promise then callback]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1

await 让出线程，接着执行 promise executor 函数，打印出 promise1，执行 resolve() ，将 then() 放入【微任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack |
Microtasks | [Promise then callback]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end

promise executor 出栈，打印 script end，主栈空闲，进入下一轮

* 第2轮

| 操作 | 结果 |
| ------ | ------ |
JS stack |
Microtasks | [Promise then callback] [async1 await]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end

主栈空闲后，此时，await 让出的线程回归，进入【微任务队列】中

| 操作 | 结果 |
| ------ | ------ |
JS stack | [Promise then callback]
Microtasks |[async1 await]
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end，promise2

[Promise then callback] 入栈，打印出 promise2

| 操作 | 结果 |
| ------ | ------ |
JS stack | [async1 await]
Microtasks |
Macrotasks | [setTimeout]
Log | script start，async1 start，async2，promise1，script end，async1 end，promise2，async1 end

[Promise then callback] 出栈， [async1 await]进栈，打印出 async1 end

... 之后步骤就一样了。

所以本题有两种情况，区别在于 await 后面的代码有没有立即放入【微任务队列】中。

## 总结
我们来做一个小的总结：

1. 微任务优先执行于宏任务
2. promise executor 为立即执行，而 resolve() 对应的 then() 是异步执行的
3. 当使用 v8 引擎比较高时，async/await  会让出线程，直到本轮事件循环结束，也就是主栈空闲后 async/await 才会进入线程，并且会进入到微任务队列中排队等待。


以上，如有不足，欢迎指正 ~

## 参考资料

[MDN eventLoop](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)

[MDN promises](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)

[MDN promises then](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

[知乎 Promise then 中回调为什么是异步执行？](https://www.zhihu.com/question/57071244)

[Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)

[Youtube javascript microtask](https://www.youtube.com/watch?v=Lum0R6Ng6R8)
