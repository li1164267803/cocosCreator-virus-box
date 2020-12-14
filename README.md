# 项目名称：消灭病毒 demo

## 演示地址=>半成品 (๑ ￣ ̫ ￣ ๑)

**h5 半成品,受服务器和文件包影响,初次加载资源加载慢，请耐心等待**

[https://www.lin2556.xyz/demo/web-mobile](https://www.lin2556.xyz/demo/web-mobile)

## 下载运行项目

在 git clone 之后 => 进入到 virusProject 目录下

## 目录介绍

### images

是项目中用到的所有初始化的图片资源，和初始化的 plist 文件,保留初始资源，方便后期的迭代开发

### virusProject

工程文件

### assets

主要的项目编辑文件

### cocosCreator 版本

v2.4.0

## 打包 h5 之前的操作

## 通过修改本地按照目录中的编辑器代码实现隐藏遮罩 v2.4.0 （在根本上解决问题）

- 修改 Cocos Creator 安装目录下，找到\resources\static\build-templates\web-mobile 文件夹
- 有两个 template 文件夹，一个为开发模板，一个为生产模板，都需要改
- 修改 index.html 模板文件，在 body 中添加一个 id 为 loading-bg 的 div

```
<body>
  <canvas id="GameCanvas" oncontextmenu="event.preventDefault()" tabindex="0"></canvas>
  <div id="splash">
    <div class="progress-bar stripes">
      <span style="width: 0%"></span>
    </div>
  </div>
  <div id="loading-bg"></div>
</body>
```

- 修改\resources\static\build-templates\shares\css 文件 在最后加上 loading-bg 的样式
- style-mobile 为 h5 样式，style-desktop 为 pc 样式，都可以加上

```css
#loading-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  background: white;
}
```

### 以下可以在设置透明度的时添加

- 在代码编辑器 common 公共文件夹下的 define.js 中添加隐藏代码 插件中的 js 是最先执行的
  [设置背景透明度解析链接](https://worthatry.cn/cocos-creator-ru-he-shi-bei-jing-tou-ming/)

```js
// 隐藏自定义cocos的进场景遮罩
window.loadingBg = document.getElementById("loading-bg");
cc.macro.ENABLE_TRANSPARENT_CANVAS = true; // 开启背景透明
// 开启背景透明的时候打包后要在css去掉body的默认灰色背景并且设置Camera的background四个都为0
cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
  if (window.loadingBg) window.loadingBg.style.display = "none";
});
```
