---
layout: post
title:  "Markdown学习笔记"
categories: learning
tags:  markdown   
author: FireCheng
---

* content
{:toc}


# Markdown 标题

1. 使用=和-标记一级和二级标题  
语法如下：  
> 一级标题下面加一排等号    
> ====================  
> 二级标题下面加一排减号  
> --------------------  

2. 使用#号标记  

语法如下：  
使用<kbd>#</kbd>号可以表示1-6级标题，一级标题对应一个<kbd>#</kbd>号，二级标题对应两个<kbd>#</kbd>号，以此类推。

> \# 一级标题  
> \#\# 二级标题  
> \#\#\# 三级标题  
> \#\#\#\# 四级标题  
> \#\#\#\#\# 五级标题  
> \#\#\#\#\#\# 六级标题  

显示效果如下：
> # 一级标题  
> ## 二级标题  
> ### 三级标题  
> #### 四级标题  
> ##### 五级标题  
> ###### 六级标题  

# Markdown 段落  

## 段落换行  
段落的换行是**使用两个以上的空格加回车**，或者**段落后面加上一个空行表示重新开始一个段落**。  

## 字体加粗和倾斜  
语法如下：  
> \*斜体文本\*  
> \_斜体文本\_  
> \*\*粗体文本\*\*  
> \_\_粗体文本\_\_  
> \*\*\*粗斜体文本\*\*\*  
> \_\_\_粗斜体文本\_\_\_  

显示效果如下：  
      *斜体文本*  
      _斜体文本_  
      **粗体文本**  
      __粗体文本__  
      ***粗斜体文本***  
      ___粗斜体文本___  

## 分隔线  

在一行中使用**三个以上**的<kbd>8</kbd>,<kbd>-</kbd>或底线，可以建立一个分隔线，行内不能有其他东西，<kbd>#</kbd>和<kbd>-</kbd>之间可以插入空格：  

> \*\*\*  
> \* \* \*  
> \*\*\*\*\*\*  
> \-\-\-  
> \- \- \-  
> \-\-\-\-\-\-  

显示效果：  

***  
* * *  
******  
---  
- - -  
------  

## 删除线  

在文字两端各加两个波浪线\~\~即可：  
> Hello world  
> \~\~Hello world\~\~  

显示效果：  
    Hello world  
    ~~Hello world~~  

## 下划线  

可通过HTML的<u>标签来实现：  
> <u\>带下划线的文本<\/u\>  

显示效果：  
    <u>带下划线的文本</u>  

## 脚注  

格式如下：  
> \[^要注明的文本\]  

example:  
> 创建一个脚注\[^我是脚注\]  
> \[^我是脚注\]: 谁最帅？ 创建这个脚注的人！  

显示效果:  

创建一个脚注[^我是脚注]  

# Markdown 列表  

## 无序列表  

无序列表使用<kbd>#</kbd>号、<kbd>+</kbd>号或<kbd>-</kbd>号作为列表标记：  

> \* 第一项  
> \* 第二项  
> \* 第三项  
>   
> \+ 第一项  
> \+ 第二项  
> \+ 第三项  
>    
> \- 第一项  
> \- 第二项  
> \- 第三项  

显示结果：  

   * 第一项  
   * 第二项  
   * 第三项  

   + 第一项  
   + 第二项  
   + 第三项  

   - 第一项  
   - 第二项  
   - 第三项  

## 有序列表

有序列表使用数字加上<kbd>.</kbd>号来表示:  

> 1\. 第一项  
> 2\. 第二项  
> 3\. 第三项  

显示效果：  

    1. 第一项  
    2. 第二项  
    3. 第三项  

## 列表嵌套  

列表嵌套只需**在子列表的选项中添加四个空格即可**:  

> 1\. 第一项：  
>     \- 第一项嵌套的第一个元素  
>     \- 第一项嵌套的第二个元素  
> 2\. 第二项：  
>     \- 第二项嵌套的第一个元素  
>     \- 第二项嵌套的第二个元素  

显示效果：  

   1. 第一项：  
       - 第一项嵌套的第一个元素  
       - 第一项嵌套的第二个元素  
   2. 第二项：  
       - 第二项嵌套的第一个元素  
       - 第二项嵌套的第二个元素  

# Markdown 区块  

Markdown 区块引用是在段落开头使用<kbd>></kbd>符号，然后后面紧跟一个**空格**符号：  

> \> 区块引用  
> \> 每天学习一点点  
> \> 聚沙成塔，积水成渊  

显示效果：  

> 区块引用  
> 每天学习一点点  
> 聚沙成塔，积水成渊  

另外，区块是可以嵌套的。一个<kbd>></kbd>是最外层，两个<kbd>></kbd>是第一层嵌套，以此类推：  

> \> 最外层  
> \>\> 第一层嵌套  
> \>\>\> 第二层嵌套  

显示效果：  

> 最外层  
>> 第一层嵌套  
>>> 第二层嵌套  

## 区块中使用列表  

用法如下：  

> \> 区块中使用列表  
> \> 1\. 第一项  
> \> 2\. 第二项  
> \> \+ 第一项  
> \> \+ 第二项  
> \> \+ 第三项  

显示效果：  

> 区块中显示列表  
> 1. 第一项  
> 2. 第二项  
> + 第一项  
> + 第二项  
> + 第三项  

## 列表中使用区块  
如果要在列表项目内放进区块，那么就需要**在<keygen>></keygen>前面添加四个空格的缩进**。  
实例如下：  
> \* 第一项  
>     \> 学如逆水行舟  
>     \> 不进则退  
> \* 第二项  

显示效果：  
* 第一项  
    > 学如逆水行舟  
    > 不进则退  
* 第二项  

# Markdown 代码  
如果是段落上的一个函数或片段的代码可以用反引号把它包起来（\`），例如：  
> \`printf()\`函数  
显示结果如下：  
`printf()`函数  

## 代码区块  
代码区块使用**四个空格**或者**一个制表符（Tab键）**  
实例如下：  
！[代码区块图片](https://www.runoob.com/wp-content/uploads/2019/03/55EDFE05-5F27-458E-AFE0-7B96685C9603.jpg)  

显示效果如下：  
	<?php
	echo 'RUNOOB';
	function test() {
    echo 'test'
    }  

你也可以用<keygen>\`\`\`</keygen>包裹一段代码，并指定一种语言（也可以不指定）：  
> \`\`\`javascript  
> $(document).ready(function () {
>    alert(\`RUNOOB\`);	
> });  
> \`\`\`  

显示结果如下：  
```javascript  
$(document).ready(function () {
	alert(`RUNOOB`);
});
```  
# Markdown 链接  
链接使用方法如下：  
> \[链接名称]\(链接地址)  
>    
> 或者  
> 
> <链接地址\>  

+ 例如：  
> 这是一个链接\[博主照片]\(https://s9.rr.itc.cn/r/wapChange/201610_6_17/a6tnit59312696559445.jpg)  

    显示结果如下：  
    这是一个链接[博主照片](https://s9.rr.itc.cn/r/wapChange/201610_6_17/a6tnit59312696559445.jpg)  

+ 直接使用地址链接：  
> \<https://s9.rr.itc.cn/r/wapChange/201610_6_17/a6tnit59312696559445.jpg>  
    显示结果如下：  
    <https://s9.rr.itc.cn/r/wapChange/201610_6_17/a6tnit59312696559445.jpg>  

## 高级链接  
> 链接也可以用变量来代替，文档末尾附带变量地址：  
> 这个链接用1作为网址变量 \[Google\]\[1\]  
> 这个链接用runoob作为网址变量 \[Runoob\]\[runoob\]  
> 然后在文档的结尾为变量赋值（网址）  
>   
> \[1\]: http://www.google.com/  
> \[runoob\]: http://www.runoob.com/ 

显示结果如下：  
这个链接用1作为网址变量 [Google][1]  
这个链接用runoob作为网址变量 [Runoob][runoob]  
然后在文档的结尾为变量赋值（网址）

[1]: http://www.google.com/  
[runoob]: http://www.runoob.com/

# Markdown 图片  
Markdown 图片语法如下：  
> \!\[alt 属性文本\]\(图片地址\)  
> \!\[alt 属性文本\]\(图片地址 "可选标题"\)  
- 开头一个感叹号！  
- 接着一个方括号，里面放上图片的替代文字  
- 接着一个普通括号，里面放上图片的网址，最后还可以用引号包住并加上选择性的'title'属性的文字。  
使用实例:  
> \!\[博主第二波帅照\]\(https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036)  
> \[博主第三波帅照\]\(https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036 "博主本人")  

显示结果如下：  
![博主第二波帅照](https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036)  
![博主第三波帅照](https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036 "博主本人")  

当然，也可以像网址那样对图片网址使用变量  
> 这个链接用1作为网址变量 \[博主第二波帅照\]\[2\]  
> 然后在文档的结尾为变量赋值（网址）  
>  
> \[1\]:https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036  

显示效果：  
这个链接用1作为网址变量 [博主第二波帅照][2]    
然后在文档的结尾为变量赋值（网址）  

[2]:https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036   

Markdown还没有办法指定图片的高度与宽度，如果你需要的话，你可以使用普通的\<img>标签：  
> \<img src="https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036" width="50%"\>  

显示结果：  
<img src="https://www.google.com/url?sa=i&source=imgres&cd=&cad=rja&uact=8&ved=2ahUKEwjv4dmknvLlAhWQY98KHWapCI0QjRx6BAgBEAQ&url=http%3A%2F%2Fwww.sohu.com%2Fa%2F141720569_585208&psig=AOvVaw04wMopC8bglftJn6qVe0NC&ust=1574114143881036" width="50%">  
# Markdown 表格  
Markdown制作表格使用`|`来分隔不同的单元格，使用`-`来分隔表头和其他行。  
语法如下：  
> \| 表头 \| 表头 \|  
> \| ---- \| ---- \|  
> \| 单元格 \| 单元格 \|  
> \| 单元格 \| 单元格 \|  

显示结果：  
| 表头 | 表头 |  
| ---- | ---- |  
| 单元格 | 单元格 |  
| 单元格 | 单元格 |  

## 对齐方式  
设置表格对齐方式：  
+ `-:`内容与标题栏居右对齐  
+ `:-`内容与标题栏居左对齐  
+ `：-:`内容与标题栏居中对齐  

实例如下：  
> \| 左对齐 \| 右对齐 \| 居中对齐 \|  
> \| :---- \| ----: \| :----: \|  
> \| 单元格 \| 单元格 \| 单元格 \|  
> \| 单元格 \| 单元格 \| 单元格 \|  

显示效果：  
| 左对齐 | 右对齐 | 居中对齐 |  
| :---- | ----: | :----: |  
| 单元格 | 单元格 | 单元格 |  
| 单元格 | 单元格 | 单元格 |  

# Markdown 高级技巧  

## 支持的HTML元素  

不在Markdown涵盖范围之内的标签，都可以直接在文档里面用HTML撰写。  
目前支持的HTML元素有： <kbd> <b> <i> <em> <sup> <sub> <br>等，如：  
> 使用\<kbd>Ctrl\</kbd>+\<kbd>Alt\</kbd>+\<kbd>Del\</kbd>重启电脑  

输出结果为：  
使用<kbd>Ctrl</kbd>+<kbd>Alt</kbd>+<kbd>Del</kbd>重启电脑  

## 转义  
Markdown使用了很多特殊符号来表示特定的意义，如果需要显示特定的符号则需要使用转义字符，Markdown 使用反斜杠转义特殊字符：  
> \*\*文本加粗\*\*  
> \\\*\\\*文本正常显示星号\\\*\\\*  

输出结果为：  
**文本加粗**  
\*\*文本正常显示星号\*\*  

Markdown支持以下这些符号前面加上反斜杠来帮助插入普通的符号：  
> \\ 反斜线  
> \` 反引号  
> \* 星号  
> \_ 下划线  
> \{\} 花括号  
> \[\] 方括号  
> \(\) 小括号  
> \# 井字号  
> \+ 加号  
> \- 减号  
> \. 英文句点  
> \! 感叹号  

## 公式  

当你需要在编辑器中插入数学公式时，可以用两个美元符号$$包裹Tex或LaTex格式的数学公式来实现。提交后，问答和文章页会根据需要加载Mathjax对数学公式进行渲染。如：  
> $$  
> \\mathbf{V}\_1 \\times \\mathbf{V}\_2 = \\begin{vmatrix}  
> \\mathbf{i} & \\mathbf{j} & \\mathbf{k} \\\\  
> \\frac{\\partial X}{\\partial u} & \\frac{\\partial Y}{\\partial u} & 0 \\\\  
> \\frac{\\partial X}{\\partial v} & \\frac{\\partial Y}{\\partial v} & 0 \\\\  
> \\end{vmatrix}  
> $$  

输出结果为：  
$$  
\mathbf{V}_1 \times \mathbf{V}_2 = \begin{vmatrix}  
\mathbf{i} & \mathbf{j} & \mathbf{k} \\  
\frac{\partial X}{\partial u} & \frac{\partial Y}{\partial u} & 0 \\  
\frac{\partial X}{\partial v} & \frac{\partial Y}{\partial v} & 0 \\  
\end{vmatrix}  
$$


[^我是脚注]: 谁最帅？ 创建这个脚注的人！