---
layout: post
title:  "node 版本管理工具 nvm 在 Mac 环境下的配置和使用"
date:   2018-06-25 21:00:00
categories: nvm
tags:  nvm mac 环境配置
author: 王文章
---

## 目的

之前一直在 *Windows* 系统下使用 *nvm* 来管理 *node*，这次换到了 *Mac* 环境，试着配置了一下。本文将介绍在配置的过程中遇到的问题及对问题的解决方案。

源码在 *github* 上  [creationix/nvm](https://github.com/creationix/nvm)



## 安装 nvm

```js
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

安装完成后可在用户目录 ~/ 查看到 *.nvm* 文件夹，下面我们来配置 *nvm* 的环境变量

## 配置环境变量

执行以下命令

```js
nvm version
```

完毕后会提示以下错误信息：

```js
-bash: nvm: command not found
```

它表示没有找不到 *nvm* 这个命令，所以我们需要配置其环境变量

我们可以执行以下命令来配置

```js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

完毕之后执行 *nvm* 发现控制台可以正常显示 *nvm* 的信息，即表示安装成功。

## 可能存在的问题

在命令行中配置环境变量的方法可能会在重新开启一个终端或者重启系统后失效，那么我们就得通过修改配置文件的方式来更改环境变量。

## 配置文件方法（续）

进入到用户目录 ~/ 通过以下命令来查看是否含有这两个文件 *.bash_profile* 和 .*bashrc*

```js
sudo find ./ -name '*bash*' -depth 1 -print
```

若有则直接通过 *vim* 命令来修改，若没有则用 *touch* 命令来创建，以下为两个文件的内容。

*.bash_profile*

```js
if [ -f ~/.bashrc ]; then
source ~/.bashrc
fi
```

*.bashrc*

```js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

最后执行命令，用于重新启动环境配置

```js
source .bash_profile
```

## 注意

修改配置文件 *.bash_profile* 和 *.bashrc* 时可能会提示下方的错误信息，它表示修改权限不足，我们可以通过 *chmod* 命令修改文件的权限，也可通过 *sudo* 管理员权限的方式来重新修改配置文件

```js
'readonly' option is set (add ! to override)
```

——————————分割线——————————


## 切换 zsh

更好用的 *zsh* ，替代原有的 *bash* 。

由于团队中用的都是 *zsh* ，所以我们来介绍如何使用 *zsh* 及用 *zsh* 来配置 *nvm* 

在这里我们要来安装 *oh-my-zsh*  ，*oh my zsh* 是基于 *zsh* 开发的命令行工具，比 *zsh* 更强大， 其提供了主题配置，插件等其他扩展机制，详见 [oh-my-zsh 官网](http://ohmyz.sh/)。

## 安装 oh-my-zsh

首先要将 *bash* 切换到 *zsh* 

执行以下命令切换 *zsh*

```js
chsh -s /bin/zsh
```

执行以下命令安装

```js
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

## 在 zsh 中配置 nvm

在用户目录中找  *.zshrc* 文件，若没有，则创建一个，里面填写下面的内容即可。

```js
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```









