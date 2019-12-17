---
layout: post
title:  "工作填坑之内网与外网"
categories: 工具软件
tags:  MongoDB Redis 工具软件
author: SnakeSon
---

* content
{:toc}


## 概念

内网：

> 内网也就是局域网，内网的计算机以NAT（[网络地址转换](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2)）协议，通过一个公共的[网关](https://baike.baidu.com/item/%E7%BD%91%E5%85%B3)访问Internet。内网的计算机可向Internet上的其他计算机发送连接请求，但Internet上其他的计算机无法向内网的计算机发送连接请求。

> 最直观的就是像网吧，公司内部的电脑用交换机，HUB，路由连起来的










外网：

> 外网IP包括：ADSL拨号的动态IP用动态[解析域名](https://baike.baidu.com/item/%E8%A7%A3%E6%9E%90%E5%9F%9F%E5%90%8D)来绑定IP，又叫[动态域名](https://baike.baidu.com/item/%E5%8A%A8%E6%80%81%E5%9F%9F%E5%90%8D)；固定的外网IP(这种多半为网吧的IP)即，整个网吧的那个主IP。外网IP指的是：打开ADSL[路由](https://baike.baidu.com/item/%E8%B7%AF%E7%94%B1)功能的用户你的外网IP就应该是ADSL设备的IP，网吧里的外网IP是指整个网吧的主IP，校园网的外网IP就是整个校园网的那个主IP，小区网的外网IP与校园网同理，长宽的用户就要试下了，可以上论坛，看看你的IP是多少，那么那个IP就是你要绑定的，所有的内网用户都可以这样查的，论坛
上的IP就是你要绑定的IP


## 坑

第一次搭建服务器相关项目，因为第一次直接使用的是一台服务器，外网的ip，在自己的windows 是可以用mongodb 客户端与redis 客户端进行服务器上的mongodb服务端与redis服务端相连接的，并没有遇到什么困难

## 场景

因为后台与爬虫用的同一个mongodb与redis，而那台服务器又是单核的，2g运行内存。导致mongodb老是因为连接池开得过多而被挂掉，后来就买了内网的mongodb与redis服务，一开始啥都不懂，也不知道这是一个坑，在自己本机上进行mongodb，redis测试，一直连接不上去，代码是改了又改，

## 解决

后来老大过来了，你这是内网的，外网的当然连接不上去了，你得在腾讯云服务器上进行连接

## 总结

后来就直接在腾讯云服务器上测试连接，然后就连好了。这个问题搞到我们三到晚上12点，确实菜，然后预料到的确实少，回过头来看下代码，一点毛病都没有啊！不知道有句mmp，该不该讲。



    
	

 

