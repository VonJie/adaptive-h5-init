# adaptive-h5-init
每次新开始一个项目时，需要考虑的问题与解决方案；收集整理起来，方便日后复用。

## 问题收集
- html 根 `fontSize` 设置
```
// 阿里高清方案
!function(e){function t(a){if(i[a])return i[a].exports;var n=i[a]={exports:{},id:a,loaded:!1};return e[a].call(n.exports,n,n.exports,t),n.loaded=!0,n.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=window;t["default"]=i.flex=function(e,t){var a=e||100,n=t||1,r=i.document,o=navigator.userAgent,d=o.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i),l=o.match(/U3\/((\d+|\.){5,})/i),c=l&&parseInt(l[1].split(".").join(""),10)>=80,p=navigator.appVersion.match(/(iphone|ipad|ipod)/gi),s=i.devicePixelRatio||1;p||d&&d[1]>534||c||(s=1);var u=1/s,m=r.querySelector('meta[name="viewport"]');m||(m=r.createElement("meta"),m.setAttribute("name","viewport"),r.head.appendChild(m)),m.setAttribute("content","width=device-width,user-scalable=no,initial-scale="+u+",maximum-scale="+u+",minimum-scale="+u),r.documentElement.style.fontSize=a/2*s*n+"px"},e.exports=t["default"]}]);
flex(100, 1);

// 京东 TARO 框架的解决方案
!function(x){function w(){var v,u,t,tes,s=x.document,r=s.documentElement,a=r.getBoundingClientRect().width;if(!v&&!u){var n=!!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);v=x.devicePixelRatio;tes=x.devicePixelRatio;v=n?v:1,u=1/v}if(a>=640){r.style.fontSize="40px"}else{if(a<=320){r.style.fontSize="20px"}else{r.style.fontSize=a/320*20+"px"}}}x.addEventListener("resize",function(){w()});w()}(window);

// 为了适配 ipad 改版；
! function (x) {
  function w() {
    var v, u, t, tes, s = x.document,
      r = s.documentElement,
      a = r.getBoundingClientRect().width;
    if (!v && !u) {
      var n = !!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);
      v = x.devicePixelRatio;
      tes = x.devicePixelRatio;
      v = n ? v : 1, u = 1 / v
    }
    if (a <= 320){
      r.style.fontSize = "20px"
    }else if(a > 320 && a <= 750){
      r.style.fontSize = a / 320 * 20 + "px"
    }else{
      r.style.fontSize = "28px"
    }
  }
  x.addEventListener("resize", function () {
      w()	
  });
  w()
}(window);

// 为了适配 gulp-px2rem 的解决方案(本案例所采用的方案)
! function (x) {
  function w() {
    var v, u, t, tes, s = x.document,
      r = s.documentElement,
      a = r.getBoundingClientRect().width;
    if (!v && !u) {
      var n = !!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);
      v = x.devicePixelRatio;
      tes = x.devicePixelRatio;
      v = n ? v : 1, u = 1 / v
    }
    if (a <= 320){
      r.style.fontSize = "40px"
    }else if(a > 320 && a <= 750){
      r.style.fontSize = a / 8 + "px"
    }else{
      r.style.fontSize = "68px"
    }
  }
  x.addEventListener("resize", function () {
      w()
  });
  w()
}(window);
```
- IOS `fixed` 问题
```
html, body, #app{
	height: 100%;
}

// 以下三个属性，会使 fixed 失效
-webkit-transform-style: preserve-3d;
-webkit-backface-visibility: hidden;
-webkit-perspective: 1000;
```
- IOS `input` 输入后页面不回落
```
let scrollTopList = [];
[...document.querySelectorAll('input')].map((input, index) => {
  input.addEventListener('focus', () => {
    let { scrollTop } = document.body;
    scrollTopList[index] = scrollTop;
  })
  input.addEventListener('blur', () => {
    document.body.scrollTop = scrollTopList[index];
  })
})
```
- IOS 日期处理
```
date.replace(/-/g, '/');
```
- 点击延迟
```
fastclick()
```
- input 无法点击输入
```
// 去掉
user-select: none
```
- css 整理
```
* {
	-webkit-overflow-scrolling: touch;  /* ios滑动卡顿问题 */
  -webkit-touch-callout: none; /* 禁止长按链接与图片弹出菜单 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);  /* IOS点击闪屏问题 */
}

/*利用css 对阴影处理的方式实现0.5px的效果;*/
.box_shadow_1px{
  box-shadow:inset 0 -1px 1px -1px #999
}; 

@mixin placeholder($color:#ccc, $fontWeight: normal){
  &::-webkit-input-placeholder{
    color: $color;
    font-weight: $fontWeight;
  }
  &:-moz-placeholder{
    color: $color;
    opacity: 1;
    font-weight: $fontWeight;
  }
  &::-moz-placeholder{
    color: $color;
    opacity: 1;
    font-weight: $fontWeight;
  }
  &:-ms-input-placeholder{
    color: $color;
    font-weight: $fontWeight;
  }
}

@mixin arrow($direction, $borderColor, $borderWidth:1px, $width:16px, $height:16px){
  width: $width;
  height: $height;
  border-width: $borderWidth;
  border-style: solid;
  transform: rotate(-45deg);
  transform-origin: center center;
  @if $direction == 'top'{
    border-color: $borderColor $borderColor transparent transparent;
  }
  @if $direction == 'right'{
    border-color: transparent $borderColor $borderColor transparent
  }
  @if $direction == 'bottom'{
    border-color: transparent transparent $borderColor $borderColor
  }
  @if $direction == 'left'{
    border-color: $borderColor transparent transparent $borderColor
  }
}
```

## 微信JSAPI
调用`微信jsapi`时，单页应用路由使用`browser`模式时，页面跳转权限会丢失，表现为IOS正常，安卓无权限使用api, 改用`hash`模式即可。
参考: 
- [hash和history两种模式的区别](https://www.jianshu.com/p/3fcae6a4968f)
- [单页面应用微信分享跳坑指南](https://juejin.im/post/5b6073a2e51d4519873f7cd6)

## [gulp](https://gulpjs.com/)
用自动化构建工具增强你的工作流程
```
// 启动服务
gulp serve
```

## [browser-sync](http://www.browsersync.cn/)
省时的浏览器同步测试工具
```
browserSync.init({
  server: "./"
});

browserSync.reload({stream: true}
```

## [gulp-px2rem-plugin](https://github.com/nilhave/gulp-px2rem-plugin)
将px转换成rem
```
px2rem({
	'width_design': 750, // 设计稿宽度。默认值640
	'valid_num': 3, // 生成rem后的小数位数。默认值4
	'pieces': 8, // 将整屏切份。默认为10，相当于10rem = width_design(设计稿宽度)
	'ignore_px': [ 1 ], // 让部分px不在转换成rem。默认为空数组
	'ignore_selector': [ '.class1' ] // 让部分选择器不在转换为rem。默认为空数组
})
```


## [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)
Autoprefixer是一款自动管理浏览器前缀的插件，它可以解析CSS文件并且添加浏览器前缀到CSS内容里
```
autoprefixer({
  browsers: ['last 2 versions'],
  cascade: false
})
```

