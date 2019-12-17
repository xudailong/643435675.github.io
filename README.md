# 关于这个博客主题

随着 jekyll 的版本升级，同时我也想重构我的旧版博客主题，因此在这个月对博客进行了重构加改版，这个仓库存放我的新博客，并且我也会一直使用这个主题。目前基本改版完成，后续可能还会有些细节上的修补。

**博客访问地址：[http://gaohaoyang.github.io/](http://gaohaoyang.github.io/)**。若您喜欢这个新的博客主题，请给我个star以示鼓励吧，欢迎大家使用。

## 目录

* [预览图](#预览图)
* [各部分详情](#各部分详情)
    * [主页 Home](#主页-home)
    * [归档页 Archives](#归档页-archives)
    * [分类页 Categories](#分类页-categories)
    * [标签页 Tags](#标签页-tags)
    * [收藏页 Collections](#收藏页-collections)
    * [展示页 Demo](#展示页-demo)
    * [关于页 About](#关于页-about)
    * [评论](#评论)
    * [目录 Contents](#目录-contents)
    * [代码高亮](#代码高亮)
    * [灯泡效果](#灯泡效果)
    * [移动端适配](#移动端适配)
    * [Footer](#footer)
    * [Statistical Analysis](#statistical-analysis)
* [Usage](#usage)
    * [1. Install ruby and jekyll environment](#1-install-ruby-and-jekyll-environment)
    * [2. Copy theme code](#2-copy-theme-code)
    * [3. Change parameter](#3-change-parameter)
        * [Basic info](#basic-info)
        * [Link info](#link-info)
        * [Comments info](#comments-info)
        * [Statistical analysis info](#statistical-analysis-info)
    * [4. Write post](#4-write-post)
    * [5. Local launch](#5-local-launch)
    * [6. Push to GitHub](#6-push-to-github)
* [Donate](#donate)
* [Update Log](#update-log)
* [License](#license)

## Preview

First of all, let's see previews.

Index Page
![index](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bdli86awj211k0oyqen.jpg)

Post Page
![post](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bdmzb9v6j210p0j7gwn.jpg)

## Page Details

### Home

Index page show 5 posts excerpt as a default. Readers can click article title or read more button to see full post. There are recent posts area, categories area and tags area at the right part of the index page. You can also add an area at this part, if you change the file `index.html`.

### Archives

Archive post according to the year.

### Categories

Show posts according to the category.

### Tags

Show posts according to the tags.

### Collections

The user can collect their favorite article links with `markdown` syntax.

### Demo

I use *[Masonry](http://masonry.desandro.com/)* to rewrite the waterfall responsive layout. Better interactive experience.

### About

The user can write some introduction about theirselves and their site with `markdown` syntax.

### Comments

This theme supports both [disqus](https://disqus.com/) and [多说评论 duoshuo comments](http://duoshuo.com/). It's very easy to config your comments module.

The only thing you need do is to change the `short_name` in the file `_config.yml`. As follows.

```yml
# comments
# two ways to comment, only choose one, and use your own short name
duoshuo_shortname: #xxx
disqus_shortname: xxx
```

### Post Contents

The post contents is fixed at the right side while page is scrolling. There will be a scroll bar on contents while it is outside the window height.

### Code Highlight

While the jekyll is update to 3.x.x, you can use github flavored markdown to write code.

More info to see [syntax-highlighter-changed](https://jekyllrb.com/docs/upgrading/2-to-3/#syntax-highlighter-changed).

### Light Shadow

![light](http://ww3.sinaimg.cn/large/7011d6cfjw1f3be6y4vp3j209i02rweg.jpg)

You can see the white shadow on the current item in the navbar. I call this light shadow.

### Mobile Adaptation

Of course, I have done a very good mobile adaptation.

![mobile](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bebnzxkpj20ah0fzgp4.jpg)

### Footer

**Welcome to use this blog theme, but please keep the theme author info at footer.** Theme designed by [HyG](https://github.com/gaohaoyang).

![footer](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bepd8002j20hl02ct95.jpg)

### Statistical Analysis

This theme supports Google Analytics and Baidu Statistics， you can just config the id in the file `_config.yml`, as follows.

```yml
# statistic analysis 统计代码
# 百度统计 id，将统计代码替换为自己的百度统计id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串
baidu_tongji_id: xxxxxxxxxxxx
google_analytics_id: UA-xxxxxxxx # google 分析追踪id
```

## Usage

Welcome everyone to use this theme, this part shows introduction to use.

### 1. Install ruby and jekyll environment

This step and Step 5 mainly talk to you how to launch blog at local. If you don't want to launch at local, you can ignore these 2 steps. But I still strongly suggest to do this. Ensure there is nothing wrong before pushing to the github.

The Windows users can directly use [RubyInstaller](http://rubyinstaller.org/) to install ruby environment. Follow the prompts while installing.

Install jekyll commands:

```
gem install jekyll
```

For more details, you can view the jekyll official website. [https://jekyllrb.com/](https://jekyllrb.com/)

There may be something wrong at mac OS X El Capitan, you can see the solution at [https://jekyllrb.com/docs/troubleshooting/#jekyll-amp-mac-os-x-1011]( https://jekyllrb.com/docs/troubleshooting/#jekyll-amp-mac-os-x-1011).

If you are interesting in jekyll, you can see the jekyll source code at [https://github.com/jekyll/jekyll](https://github.com/jekyll/jekyll).

![jekyll logo](http://jekyllcn.com/img/logo-2x.png)

### 2. Copy theme code

You can clone, download or fork this repo.

### 3. Change parameter

Mainly change the parameters at file `_config.yml` and use your own `favicon.ico`.

#### Basic info

Shows at site header part.

```yml
# Site settings
title: HyG
brief-intro: Front-end Dev Engineer
baseurl: "" # the subpath of your site, e.g. /blog
url: "http://gaohaoyang.github.io" # the base hostname & protocol for your site
```

#### Link info

Mainly shows at the footer of the site.

```yml
# other links
twitter_username: gaohaoyang126
facebook_username: gaohaoyang.water
github_username:  Gaohaoyang
email: gaohaoyang126@126.com
weibo_username: 3115521wh
zhihu_username: gaohaoyang
linkedIn_username: gaohaoyang
dribbble_username:

description_footer: 本站记录我前端之旅的沿途风景！
```

#### Comments info

Get your own `short_name`:

Visit https://disqus.com/ or http://duoshuo.com/. And follow the prompts at the site.

```yml
# comments
# two ways to comment, only choose one, and use your own short name
duoshuo_shortname: #hygblog
disqus_shortname: xxxx
```

When you done, you can also see the comments info at disqus or duoshuo admin console.

#### Statistical analysis info

Get Google Analytics id or Baidu Statistics id：

Visit https://www.google.com/analytics/ or http://tongji.baidu.com/. And follow the prompts at the site.

Of course, if you don't want any statistical and analysis info, you can type nothing at id position.

```yml
# statistic analysis 统计代码
# 百度统计 id，将统计代码替换为自己的百度统计id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串
baidu_tongji_id: cf850xxxxxxxxxxxxxxxx
google_analytics_id: UA-7xxxxxx-4 # google 分析追踪id
```

When you done, you can see UV, PV, location etc. info at your own Google Analytics or Baidu Statistic console.

### 4. Write post

You can write posts at folder `_posts`. At the beginning of the post, you should declare layout、title、date、categories、tags、author(optional) info、mathjax(optional，click [here](https://www.mathjax.org/) for more detail about `Mathjax`).

```
---
layout: post
title:  "对这个 jekyll 博客主题的改版和重构"
date:   2016-03-12 11:40:18 +0800
categories: jekyll
tags: jekyll 端口 markdown Foxit RubyGems HTML CSS
author: Haoyang Gao
mathjax: true
---
```

These follow code is for making contents.
```
* content
{:toc}
```

You can use 4 wraps as a excerpt separator. The words before separator as excerpt show in the index page. When you enter the post page, you can read full article.

The wraps config is in the file `_config.yml`, as follows:

```yml
# excerpt
excerpt_separator: "\n\n\n\n"
```

You should use markdown syntax to write article, just like write readme in github.

You can use 3 \`\`\` to write code block.

### 5. Local launch

use command:

```
jekyll s
```

Terminal shows:

```
Configuration file: E:/GitWorkSpace/blog/_config.yml
            Source: E:/GitWorkSpace/blog
       Destination: E:/GitWorkSpace/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 6.33 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'E:/GitWorkSpace/blog'
Configuration file: E:/GitWorkSpace/blog/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

Visit localhost:4000 to see your blog!!!

### 6. Push to GitHub

If there is nothing wrong, push code to your github!

## Donate

You can also donate me for a coffee, and I'll do better. Thanks.

|                                                                     PayPal                                                                     |                                 Wechat Pay                                  |                                   Alipay                                    |
|:----------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|
| [![PayPal](https://www.paypalobjects.com/webstatic/paypalme/images/pp_logo_small.png)<br>Donate via PayPal ](https://www.paypal.me/gaohaoyang) | ![wechat](http://ww2.sinaimg.cn/large/7011d6cfjw1f3bkdw3bslj206z06q3z6.jpg) | ![alipay](http://ww2.sinaimg.cn/large/7011d6cfjw1f3bk8ikzoij20740743z5.jpg) |


Thanks these friends!!!

* 2017.05.25 received Wechat user ¥1.00
* 2017.05.19 received 风之筝 ¥6.66
* 2017.05.16 received 张驰 ¥6.00
* 2017.05.03 received 希成 ¥6.66
* 2017.04.24 received deezer ¥10.00
* 2017.04.13 received Abraham Xiao ¥30.00
* 2017.04.11 received Wechat user ¥4.00
* 2017.04.01 received Elvin Zeng ¥6.66
* 2017.03.13 received Wechat user ¥6.66
* 2017.03.04 received 史莱姆 ¥9.90
* 2017.03.02 received 梦想小熊 ¥6.66
* 2017.02.27 received 夏友杰 ¥6.66
* 2017.02.26 received 兰缘小妖 ¥10.00
* 2017.02.25 received Wechat user ¥6.66
* 2017.02.22 received Wechat user ¥6.66
* 2017.02.15 received Wechat user ¥10.00
* 2017.02.06 received Light ¥10.24
* 2017.01.15 received Wechat user ¥6.66
* 2016.12.17 received HitNoah ¥12.00
* 2016.12.09 received 情融 ¥6.60
* 2016.11.25 received Wechat user ¥6.66
* 2016.11.16 received Wechat user ¥1.00
* 2016.10.24 received 奇峰 ¥6.66
* 2016.10.21 received 旭廷 ¥10.00
* 2016.09.25 received 鑫 ¥6.66
* 2016.08.25 received Erlend Aakre $2.50
* 2016.08.10 received Wechat user ¥4.40
* 2016.07.25 received 邓炳初 ¥6.66
* 2016.07.11 received 彦风 ¥6.66
* 2016.07.07 received Klci ¥2.50
* 2016.05.08 received 1057 ¥10.57
* 2016.05.07 received 吴林 ¥2
* 2016.04.29 received 北归 ¥10
* 2016.04.28 received 魏楚阳_Brian ¥2
* 2016.04.28 received 薛彬 ¥8.8


## Update Log

### 2017.2.28

- `[^]` fix smoothScroll bug in Tencent webview like wechat and qq.  [#22](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/22), [#48](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/48)

### 2016.6.20

* `[+]` Add next post and previous post link in post page.
* `[^]` Change the sort of font-family to avoid full-width half-width characters mistake.
* `[^]` Fix bug in tags cloud when division by zero. [#26](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/26), [#28](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/28), [#30](https://github.com/Gaohaoyang/gaohaoyang.github.io/issues/30)

### 2016.5.11 v2.0.1

* `[^]` Optimized code, Extracting common code to `comments.html`
* `[+]` Add Google Analysis and Baidu Statistics
* `[+]` Update README, add usage
* `[+]` Add `favicon.ico`
* `[^]` Fix bug at contents
* `[^]` Change the content scroll bar CSS style（Only for `webkit` browser kernel）
* `[^]` Change tag a color at demo page
* `[+]` Add busuanzi counter, show the views count at footer
* `[+]` Add back to top button

### 2016.4.27 v2.0.0

* `[^]` Rewrite all codes based on jekyll 3.1.2
* `[+]` Add excerpt at index page
* `[+]` Add recently post, categories and tags cloud at index page
* `[+]` Add light shadow at navbar
* `[+]` Add archives, categories, tags page
* `[+]` Add collections page
* `[+]` Add comments plugin with disqus or duoshuo
* `[+]` Mobile Adaptation
* `[+]` Fix post contents to the right side while scrolling page
* `[+]` Fix footer at the bottom when page height is smaller than window height
* `[^]` Use github flavored markdown to write code block(Fenced code blocks)
* `[^]` Rewrite the demo page with Masonry
* `[-]` Remove jQuery and BootStrap

About my old blog theme, I won't maintain any more. And I put the code at  [Gaohaoyang/old-blog](https://github.com/Gaohaoyang/old-blog).

## License

[MIT License](https://github.com/Gaohaoyang/gaohaoyang.github.io/blob/master/LICENSE.md)
