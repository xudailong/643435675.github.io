---
layout: post
title:  "Cmder 终端配置"
date:   2019-05-17 12:00:00
categories: cmder
tags:  cmder 终端
author: 王文章
---



* content
{:toc}
![5c8e107a00834.png](https://i.loli.net/2019/05/18/5cdf9ca29e79b28107.png)

前些日子，微软又双叒叕推出了一款神器，可代替原来不堪入目的 cmd 命令行工具： Windows Terminal。

开源收获了上万个 star，可见受欢迎程度之深。不过今天的主角可不是它，而是同样在 windows 下能够令人惊叹的 cmd 替代方案： **`Cmder`**



## 认识	
> Cmder is a software package created out of pure frustration over the absence of nice console emulators on Windows. It is based on amazing software, and spiced up with the Monokai color scheme and a custom prompt layout, looking sexy from the start. ----- 摘自官网 [【Cmder】](https://cmder.net/)

## 下载

傻瓜式的配置和灵活结合第三方插件的能力是我喜欢它的主要原因，废话不多说，咱们来看下。

首先在官网下载安装包，我选择的是带 `git bash` 的`完整版`，下载完之后就不用再单独装 `git` 了

![001.png](https://i.loli.net/2019/05/18/5cdf9f72828a688775.png)

下载完之后，我们可以看到它其实是一个免安装的压缩包，显而易见，之后得配置 `环境变量`

不过先不着急，我们来找一个干净的目录存放它，记住尽量是 `纯英文不带特殊字符和空格的` ，否则之后可能会出现种种无法预测的 bug

解压，可看到 `Cmder.exe` 文件

## 环境变量配置

新建 `CMDER_HOME` 变量，变量值填刚才的存放目录的解压后的绝对路径

> 变量名：`CMDER_HOME`
>
> 变量值： `E:\Manysoft\cmder`

![002.png](https://i.loli.net/2019/05/18/5cdfa33ae6f8a21038.png)

注意路径要定位到这个文件夹内

![003.png](https://i.loli.net/2019/05/18/5cdfa3afd560f59979.png)

然后再将这个变量追加到 `Path` 中： `%CMDER_HOME%`，注意分号的位置

![004.png](https://i.loli.net/2019/05/18/5cdfa4660319d76328.png)

## 添加 cmder 到右键菜单

为了方便，我们可以将它添加到右键菜单快捷键内

以管理员身份打开 windows 自带的 cmd 黑框框

定位到 Cmder.exe 所在文件夹

然后输入命令： `Cmder.exe /REGISTER ALL`

之后在任意文件夹中右键若发现 `Cmder Here` 选项即表示添加成功。

![005.png](https://i.loli.net/2019/05/18/5cdfa5e9409d350162.png)

## 中文乱码及输入中文显示多余的空格解决

按 `win + alt + p` 键或点击默认右下角 settings 选项打开设置界面

找到 `Startup` 选项下的 `Environment`，追加这些命令

```
set PATH=%ConEmuBaseDir%\Scripts;%PATH%
set LANG=zh_CN.UTF-8
set LC_ALL=zh_CN.utf8
chcp utf-8
```

保存，重启 `cmder` 就会发现中文显示正常了，不过在最新版的 cmder 中这个 bug 貌似被修复了。

## 配置高亮插件

先安装特定字体文件：`Cousine for Powerline` 或 `Fira Code`

依旧打开 `cmder` 的 `settings`，将 `Main` 中的 `Main console font` 设置成这两个字体中的一个即可。

然后就是安装高亮插件了， git 中下载此插件 [cmder-powerline-prompt](https://github.com/AmrEldib/cmder-powerline-prompt)

下载完毕后打开，将其中所有的 `*.lua` 文件全部先复制

接着我们定位到 `cmder` 的安装目录下的 config 文件夹，在此粘贴

![006.png](https://i.loli.net/2019/05/18/5cdfbb3b6708722242.png)

不过，这个插件有个 bug ，那就是会导致路径里的中文乱码，没错，如果装了这个插件后，我们之前的修复中文乱码的设置就会失效

目前没有找到解决方案。

## 添加自定义命令

默认情况下 cmder 终端是不带 ll 和 la 命令的，我们可以手动添加上去

找到 config 下的 `user-aliases.cmd`

加入以下命令
```
l=ls --show-control-chars  --color $*
ll=ls -alF --show-control-chars --color $*
la=ls -aF --show-control-chars --color $*
```


以上，如有不足，欢迎指正 ~
