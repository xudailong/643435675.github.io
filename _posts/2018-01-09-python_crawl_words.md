---
layout: post
title:  "News_scrapy_redis 框架系统"
categories: 爬虫
tags:  scrapy_redis 爬虫   
author: SnakeSon
---

* content
{:toc}


## 前言

该文档针对爬虫系统设计目标中相应的场景给出技术方案

## 设计目标

1、代码复用，功能模块化。可以支持上千个网站的数据爬取；

2、易扩展。爬虫框架易扩展，爬取规则、解析规则、入库规则易扩展，支持框架切换；

3、健壮性、可维护性。对数据爬取过程中的各种异常，例如：断网、反爬升级、爬“脏数据”等，需要实时的监控，以及给出准确的定位。异常处理以及降级措施需要完善；

4、后续扩展为分布式结构；

5、支持功能模块的易调整；








## 框架使用说明

**News_scrapy_redis4. [github地址](https://github.com/xudailong/News_scrapy_redis.git)**

1. `News_scrapy_redis` 基于`scrapy_redis`实现数据的增量爬取（含去重），支持分布式，支持异常日志等输出，功能模块化。

2. 树结构：

```js

├─.idea
├─Daily_crawler
├─ETL
├─log
├─News_scrapy
│  ├─spiders
│  │  └─__pycache__
│  └─__pycache__
├─News_simhash
└─News_statistics

```

3. 各模块说明：
 
    > Daily_crawler：	
    
	- `daily_crawler.cron crontab`的定时文件, 定时运行`start_crawl.sh`脚本
	- `start_crawl.sh` 启动爬虫模块，并将每次爬取所花费的时间 写入 log/run_time.txt
	- `push_urls.py` 每次在爬虫之前运行，清空调度队列，并将start_url push到调度队列中
	- `news_crawl.sh` 执行爬虫模块（增量爬取）， 并自动进行相似文档去重，ETL, 存入mongodb
   
	> ETL:（暂时用不到）
	
	- `/Model` 存放训练好的词典，语料，TF-IDF，LDA， word2vec模型
	- `auto_embedding.py` 新闻语料的清洗，以及自动化生成新闻的标题和内容embedding
	- `auto_embedding_simhash.py` 增加了自动化相似文档的去重
	- `stop_words` 常用的中文停留词
	- `train_step1` 训练LDA模型
	- `train_step2` 训练LDA模型
    
	> log:
	
    - `auto_embedding_simhash.log` 执行auto_embedding_simhash.py的日志文件
	- `crawler.log` 执行scrapy-redis爬虫模块的日志文件
	- `news_count.log` 执行news_statistics.py的日志文件
	- `run_time.txt` 每次执行爬虫脚本的运行时间
    
	> News_data:
     
    - 每个文件夹是抓每天从各个网站抓取到的新闻
    
	> News_scrapy:
    
	- 基于scrapy-redis的爬虫模块，在scrapy的基础上修改得到
    - 各大网站数据的爬取解析工作主要在该文件中进行
    
	> News_simhash（此处只需要进行title的去重）:
    
	- 实现相似文档的去重
	- automatic_simhash.py 自动实现相似文档的去重（仅基于新闻内容）
	- content_index.pkl 序列化的新闻内容SimhashIndex类，相当于所有新闻sinhash_value的一张表，并且随着抓取的新闻越来越多，该表会不断增大title_index.pkl 序列化的新闻标题SimhashIndex类， 未使用
	- `generate_simhash_index.py` 初始化这张Simhash_index，生成content和title的Simhash_index
	- `near_duplicates.py` 对初始化的Simhash_index进行相似新闻内容的去重
	- test.py 测试content_index.pkl中content_index类新闻的数量
    
	> News_statistics:
    
	- `news_count.json` 每天从各个网站抓取的新闻数量
	- `news_statistics.py` 统计新闻增量的脚本

## 框架环境

1. Redis环境环境
2. scrapy框架环境
3. python3环境环境


## 框架完善
1. IP代理池
2. cookies池 
3. 其他



    
	

 

