/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * 内容JSON
     */
  var demoContent = [
    {
      demo_link: 'https://codepen.io/XDB/full/mLdRGm/',
      img_link: 'https://i.loli.net/2018/04/18/5ad756bc9698a.jpg',
      code_link: 'https://codepen.io/XDB/pen/mLdRGm/',
      title: 'CSS3 背景渐现',
      core_tech: 'CSS3 Bootstrap jQuery',
      description: 'CSS3动画做的多图背景渐现。CSS3代码详情见 <a href ="https://codepen.io/XDB/pen/mLdRGm">这里</a>。'
    },{
      demo_link: 'https://codepen.io/XDB/full/yjyygW/',
      img_link: 'https://i.loli.net/2018/04/19/5ad811e216b3a.jpg',
      code_link: 'https://codepen.io/XDB/pen/yjyygW/',
      title: 'CSS3 进度条动画',
      core_tech: 'CSS3',
      description: '纯CSS3动画做的页面加载进度条。CSS3代码详情见 <a href ="https://codepen.io/XDB/pen/yjyygW/">这里</a>。'
    },{
      demo_link: 'https://codepen.io/XDB/full/YLXXoB',
      img_link: 'https://i.loli.net/2018/04/20/5ad99d6cb6e42.jpg',
      code_link: 'https://codepen.io/XDB/pen/YLXXoB',
      title: '汉堡样式的菜单按钮',
      core_tech: 'CSS3 jQuery',
      description: 'hamburger menus to be responsive 代码详情见 <a href ="https://codepen.io/XDB/pen/YLXXoB">这里</a>。'
    },{
      demo_link: 'https://codepen.io/XDB/full/LmVVJm',
      img_link: 'https://i.loli.net/2018/04/20/5ad99da387eaa.jpg',
      code_link: 'https://codepen.io/XDB/pen/LmVVJm',
      title: 'CSS3 空心云朵',
      core_tech: 'CSS3',
      description: '主要运用 clip 属性来实现一个空心云朵的效果 代码详情见 <a href ="https://codepen.io/XDB/pen/LmVVJm">这里</a>。'
    },{
      demo_link: 'https://codepen.io/XDB/pen/ZoGQdY',
      img_link: 'https://i.loli.net/2018/04/20/5ad99ec229225.jpg',
      code_link: 'https://codepen.io/XDB/pen/ZoGQdY',
      title: 'CSS3 翘边阴影',
      core_tech: 'CSS3的伪类和 transform 属性',
      description: '用CSS3中的伪类和 transform 用 skew 将 div 旋转成菱形；层级低于自身作为阴影部分并调整位置实现之 代码详情见 <a href ="https://codepen.io/XDB/pen/ZoGQdY">这里</a>。'
    }
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  // var htmlArr = [];
  // for (var i = 0; i < content.length; i++) {
  //     htmlArr.push('<div class="grid-item">')
  //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
  //     htmlArr.push('<img src="'+content[i].img_link+'">')
  //     htmlArr.push('</a>')
  //     htmlArr.push('<h3 class="demo-title">')
  //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
  //     htmlArr.push('</h3>')
  //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
  //     htmlArr.push('<p>'+content[i].description)
  //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
  //     htmlArr.push('</p>')
  //     htmlArr.push('</div>')
  // }
  // var htmlStr = htmlArr.join('')
  var htmlStr = ''
  for (var i = 0; i < content.length; i++) {
    htmlStr += '<div class="grid-item">' + '   <a class="a-img" href="' + content[i].demo_link + '">' + '       <img src="' + content[i].img_link + '">' + '   </a>' + '   <h3 class="demo-title">' + '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' + '   </h3>' + '   <p>主要技术：' + content[i].core_tech + '</p>' + '   <p>' + content[i].description + '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' + '   </p>' + '</div>'
  }
  var grid = document.querySelector('.grid')
  grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
