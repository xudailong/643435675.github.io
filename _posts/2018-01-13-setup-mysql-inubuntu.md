---
layout: post
title:  "Ubuntu 16.04 下MySQL的安装"
categories: linux
tags:  linux ubuntu16.04 工具软件  
author: SnakeSon
---

* content
{:toc}


1， 打开终端：
>  sudo apt-get install mysql-server

2 ，接下来会让你选择y/n, 这里你选择y,

3 ，这里会出现一个让你输入mysql-server的密码，输入完后如果鼠标点击不了，可以使用Tab键+enter键继续下一步

4 ，接下来，会继续让我们输入一次密码







5， 密码输入完后，我们这里的mysql-server的用户名是：root ，密码是我们刚刚设置过的密码，

6， 这时候已经安装完成了，我们需要验证一下是否安装上了mysql-server
>  mysql -u root -p

按enter键后会让我们输入密码，当我们输入密码后，会出现：
```js

snakeson@snakeson-Inspiron-5421:~$ mysql -u root -p
Enter password: 
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 5
Server version: 5.7.20-0ubuntu0.16.04.1 (Ubuntu)

Copyright (c) 2000, 2017, Oracle and/or its affiliates. All rights reserved.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> 
```

7 ， 这样我们就在Ubuntu下安装好了mysql-server。


