---
layout: post
title:  "初识 MongoDB"
date:   2019-03-15 12:00:00
categories: MongoDB
tags:  MongoDB 数据库 nosql
author: 王文章
---



* content
{:toc}
![mongodb](https://i.loli.net/2019/03/17/5c8e107a00834.png)

预计今后会接触到数据库，所以这几天先提前搞了搞 `nosql` 中比较基础的 `MongoDB`，废话不多说。开搞！



## 概念	
> MongoDB 是一个基于分布式文件存储的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。 ----- 摘自百度百科 [【MongoDB】](https://baike.baidu.com/item/mongodb/60411)

## 安装
1. 进入 [官网](https://www.mongodb.com/download-center/community) 下载安装包（可能需要注册）

2. 选择相关的 Version, OS 和 Package 后，点击绿色 Download 按钮，我这里用的是 windows 64 位 `4.0.6` 版本

    ![MongoDB download.png](https://i.loli.net/2019/03/17/5c8e258fa9599.png)

3. 下载完后安装，`注意`不要使用默认安装，因为默认的安装路径中间是会有空格的，会导致后面我们不能正常执行相关命令;

    还有一个地方需要注意，安装向导的最后一步左下角 `Install MongoDB Compass` 需要取消勾选，否则会卡顿

    注：MongoDB Compass 是一个图形化界面，大约 180m，而且是从外网下载的，我们一般是基于命令行操作的，所以不需要。

## 环境配置
1. 安装完毕后为环境变量中的 `path` 配下 `bin` 目录

2. 正常情况下我们是不需要进行额外的操作的，但是为了之后能够更好的维护数据，我们需要单独创建一个文件夹，这样我们就可以将数据存放到这个文件夹内了。

3. 进入到安装目录下的 `data` 文件夹内，新建 `db` 目录

4. 打开命令行，执行 `mongod --dbpath 你的路径\db` 命令来开启服务;
    
    若报以下错误信息则是因为服务默认已自动开启，无需再重复启动。我们可执行 `services.msc` 在 windows 服务的列表内查看 `MongoDB` 服务

    ```
    I CONTROL [main] Automatically disabling TLS 1.0, to force-enable TLS 1.0 specify --sslDisabledProtocols 'none'
    ```

5. 服务是有默认的端口号的，默认为 `27017`， 我们来直接访问 `http://127.0.0.1:27017` ，看到如下信息表示 `MongoDB` 服务已成功开启，到此，`MongoDB` 的配置就基本完成了。

## 基本命令

记录下常用的命令

```js
// 停掉服务
net stop mongodb

// 开启服务
net start mongodb
```

```js
// 开启服务后, 输入此命令进入 mongo shell 
mongo

// 可显示当前所有数据库
show dbs

// 如果没有则创建（反之切换） students 数据库
use students

// 显示当前数据库
db
// 显示所有数据库
show dbs

// 查看当前 db 信息
db.stats()

// 显示数据库中所有集合
show collections

// 在 students 数据库中的 stu 集合内插入一条数据
db.stu.insert({id: "001", name: "zhang", age: 22})
// 查看 stu 集合中的所有数据
db.stu.find()
...
```

## 增删改查

我们还可以执行一些增删改查命令，这里仅用做示范

### 增

```js
// 插入数据，在 stu 集合内插入一条数据，Mongo会自动生成 id 序列
db.stu.insert({id: "001", name: "zhang", age: 22})
```

### 删

```js
// 删除 stu 集合中的所有数据
db.stu.remove({})

// 将 stu 集合中 name 为 "Teddy" 的数据删除
db.stu.remove({name: "Teddy"})

// 删除 aaa 集合
db.aaa.drop()
```

### 改

```js
// 给一个集合重命名
db.<originalCollectionName>.renameCollection('newCollectionName')

// 例如为集合 doglist 重命名为 dog
db.doglist.renameCollection('dog')

// 将 dog 集合中 name 为 'Corgi' 的数据的 age 修改为 2
// $set 为修改器，用来指定一个字段，如果存在该字段就进行修改不存在就在此条数据中添加该字段
db.dog.update({name: 'Corgi'}, {$set: {age: 2}})
```


### 查

```js
// 查询 stu 集合内所有数据
db.stu.find()

// 查询 dog 集合中 age 为 3 的数据
db.dog.find({age: 3})
```

## Node + MongoDB

如果相与 `Node` 结合的话也可以，我们只需下载 `mongodb` 的依赖包再编写几段简单的脚本就能够访问数据库了。

我这里的电脑运行环境配置如下
> windows 7
>
> MongoDB v4.06
>
> node v10.15.1
>
> npm v6.9.0

1. 安装 mongodb 依赖包 `cnpm install mongodb`，这里安装的版本为 v3.1.13

2. 编写连接脚本

```js
const MongoClient = require('mongodb').MongoClient;
// 连接的 URL
const url = 'mongodb://localhost:27017';
// 数据库名
const dbName = 'test';
// 连接服务和数据库
MongoClient.connect(url, function(err, client) {
  if(err){
    console.log(err);
  }
  console.log("connect successful");
  const db = client.db(dbName);
  const col = db.collection('stu'); // 获取 stu 集合数据
  col.find().toArray((err, res) => {
    console.log(res)
  });
});

```

为了使我们的代码逻辑更为清晰，我在这里改为了 async / await 的方式，并且将其中的关键步骤做了一层简单的封装，使用时直接像写同步的方式来编写脚本即可

```js
const MongoClient = require('mongodb').MongoClient
// 1. 连接 Mongo 服务
const connectMongo = (url) => {
  return new Promise( async (resolve, reject) => {
    try{
      const client = await MongoClient.connect(url, {useNewUrlParser:true})
      resolve(client)
    }catch(err){
      reject(err)
    }
  })
}
// 2. 连接数据库
const connectDataBase = (client, dbName) => {
  return new Promise(async (resolve, reject) => {
    try{
      const db = await client.db(dbName)
      resolve(db)
    }catch(err){
      reject(err)
    }
  })
}
// 3. 获取数据集合
const getCollectionTable = (db, collectName) => {
  return new Promise(async (resolve, reject) => {
    try{
      const col = await db.collection(collectName)
      resolve(col)
    }catch(err){
      reject(err)
    }
  })
}
```

为方便测试，首先我们需要使用 shell 来在数据库中插入几条数据

我这里使用的数据库名为 person ，两个数据集合：stu，teacher

```js
// 测试
;(async () => {
  const url = 'mongodb://localhost:27017'
  const dbName = 'person'
  try{
    console.clear()
    const client = await connectMongo(url)
    const db = await connectDataBase(client, dbName)
    const stu = await getCollectionTable(db, 'stu')

    let instance = await stu.find().toArray()
    console.log('------学生')
    console.log(instance)

    const teacher = await getCollectionTable(db, 'teacher')
    instance = await teacher.find().toArray()
    console.log('------老师')
    console.log(instance)
  }catch(err){
    console.log(err)
  }
})();
```
若集合中有数据，则执行完毕脚本之后可以在控制台中看到相应的 `stu` 和 `teacher` 打印信息

以上，如有不足，欢迎指正 ~
