---
layout: post
title:  "CentOS7定时任务详解"
categories: linux
tags:  centos7 crontab linux 工具软件  
author: SnakeSon
---

* content
{:toc}


## 前言

工作中需要开启一个定时任务：每天晚上2点进行爬虫代码的运行，这不得不去学习一下linux 下的定时任务crontab

##  crontab


yum install crontabs

说明：
/sbin/service crond start //启动服务
/sbin/service crond stop //关闭服务
/sbin/service crond restart //重启服务
/sbin/service crond reload //重新载入配置
查看crontab服务状态：service crond status
手动启动crontab服务：service crond start
查看crontab服务是否已设置为开机启动，执行命令：ntsysv
加入开机自动启动:
chkconfig crond on







## 1，crontab命令

功能说明：设置计时器。
语　　法：crontab [-u <用户名称>][配置文件] 或 crontab [-u <用户名称>][-elr]

补充说明：cron是一个常驻服务，它提供计时器的功能，让用户在特定的时间得以执行预设的指令或程序。只要用户会编辑计时器的配置文件，就可以使 用计时器的功能。

其配置文件格式如下：
Minute Hour Day Month DayOFWeek Command

参　　数：
-e 　编辑该用户的计时器设置。
-l 　列出该用户的计时器设置。
-r 　删除该用户的计时器设置。
-u<用户名称> 　指定要设定计时器的用户名称。

## 2，crontab 格式

基本格式 :
* *　 *　 *　 *　　command
分　时　日　月　周　 命令
第1列表示分钟1～59 每分钟用*或者 */1表示
第2列表示小时1～23（0表示0点）
第3列表示日期1～31
第4列 表示月份1～12
第5列标识号星期0～6（0表示星期天）
第6列要运行的命令
```js

# Use the hash sign to prefix a comment
# +—————- minute (0 – 59)
# | +————- hour (0 – 23)
# | | +———- day of month (1 – 31)
# | | | +——- month (1 – 12)
# | | | | +—- day of week (0 – 7) (Sunday=0 or 7)
# | | | | |
# * * * * * command to be executed
```
## 3，crontab文件的一些例子：

> 1 简单打印

```js

每天早上6点 
0 6 * * * echo "Good morning." >> /tmp/test.txt //注意单纯echo，从屏幕上看不到任何输出，因为cron把任何输出都email到root的信箱了。

每两个小时 
0 */2 * * * echo "Have a break now." >> /tmp/test.txt  

晚上11点到早上8点之间每两个小时和早上八点 
0 23-7/2，8 * * * echo "Have a good dream" >> /tmp/test.txt

每个月的4号和每个礼拜的礼拜一到礼拜三的早上11点 
0 11 4 * 1-3 command line

1月1日早上4点 
0 4 1 1 * command line SHELL=/bin/bash PATH=/sbin:/bin:/usr/sbin:/usr/bin MAILTO=root //如果出现错误，或者有数据输出，数据作为邮件发给这个帐号 HOME=/ 

每小时执行/etc/cron.hourly内的脚本
01 * * * * root run-parts /etc/cron.hourly

每天执行/etc/cron.daily内的脚本
02 4 * * * root run-parts /etc/cron.daily 

每星期执行/etc/cron.weekly内的脚本
22 4 * * 0 root run-parts /etc/cron.weekly 

每月去执行/etc/cron.monthly内的脚本 
42 4 1 * * root run-parts /etc/cron.monthly 

注意: "run-parts"这个参数了，如果去掉这个参数的话，后面就可以写要运行的某个脚本名，而不是文件夹名。 　 

每天的下午4点、5点、6点的5 min、15 min、25 min、35 min、45 min、55 min时执行命令。 
5，15，25，35，45，55 16，17，18 * * * command

每周一，三，五的下午3：00系统进入维护状态，重新启动系统。
00 15 * * 1，3，5 shutdown -r +5

每小时的10分，40分执行用户目录下的innd/bbslin这个指令： 
10，40 * * * * innd/bbslink 

每小时的1分执行用户目录下的bin/account这个指令： 
1 * * * * bin/account

每天早晨三点二十分执行用户目录下如下所示的两个指令（每个指令以;分隔）： 
20 3 * * * （/bin/rm -f expire.ls logins.bad;bin/expire$#@62;expire.1st）　　

每年的一月和四月，4号到9号的3点12分和3点55分执行/bin/rm -f expire.1st这个指令，并把结果添加在mm.txt这个文件之后（mm.txt文件位于用户自己的目录位置）。 
12,55 3 4-9 1,4 * /bin/rm -f expire.1st$#@62;$#@62;mm.txt 
```

------

> 2 nginx示例

```js

30 21 * * * /etc/init.d/nginx restart
每晚的21:30重启 nginx。

45 4 1,10,22 * * /etc/init.d/nginx restart
每月1、 10、22日的4 : 45重启nginx。

10 1 * * 6,0 /etc/init.d/nginx restart
每周六、周日的1 : 10重启nginx。

0,30 18-23 * * * /etc/init.d/nginx restart
每天18 : 00至23 : 00之间每隔30分钟重启nginx。

0 23 * * 6 /etc/init.d/nginx restart
每星期六的11 : 00 pm重启nginx。

* */1 * * * /etc/init.d/nginx restart
每一小时重启nginx

* 23-7/1 * * * /etc/init.d/nginx restart
晚上11点到早上7点之间，每 隔一小时重启nginx

0 11 4 * mon-wed /etc/init.d/nginx restart
每月的4号与每周一到周三 的11点重启nginx

0 4 1 jan * /etc/init.d/nginx restart
一月一号的4点重启nginx

*/30 * * * * /usr/sbin/ntpdate 210.72.145.20
每半小时同步一下时间
```

##  4 创建cron脚本

1. 第一步：写cron脚本文件,命名为crontest.cron。
15,30,45,59 * * * * echo "xgmtest....." >> xgmtest.txt  表示，每隔15分钟，执行打印一次命令 

2. 第二步：添加定时任务。执行命令 “crontab crontest.cron”。搞定 

3. 第三步："crontab -l" 查看定时任务是否成功或者检测/var/spool/cron下是否生成对应cron脚本

## 将脚本改为可执行（针对shell，.sh文件）

> chmod +x filename


引用：

http://blog.csdn.net/u012402276/article/details/51063269
https://www.cnblogs.com/longjshz/p/5779215.html
http://blog.csdn.net/edgdvcyz/article/details/53348832








