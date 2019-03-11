// 基础补充url 流程图
// 输入网址 => 进行域名解析 => dns IP查询 => 根据ip进行tcp链接（三次握手建立通道） =>  服务器相应资源请求 => 浏览器解析css js dom
// 浏览器加载外部css 生成CSS规则树  解析html生成dom tree 将DOM tree和css规则树合并生成一个渲染树
// 根据渲染树绘制布局
// 阻塞规则： 浏览器加载js文件时会停止构建DOM 然后将控制权交给js引擎 js引擎处理完脚本后会再继续构建DOM 我们一般会在html底部引用js文件 并且添加 async defer
// js文件设置defer async后会异步加载 不影响dom渲染 下载后js解析过程中会中断DOM渲染
// defer 始终按照加载顺序执行 如果js文件设置了该属性 浏览器会异步加载该文件不影响后续的DOM渲染 如果多个设置defer的script标签 会按照顺序执行script 
// async 谁先加载完谁先执行
//  

// 缓存机制
// 一 强缓存
// http利用Expires和cache-control控制 当浏览器发出请求时 浏览器会根据这两个字段判断资源是否命中强缓存
// expires 是一个时间戳 浏览器再次去请求资源时会对比本地时间和expires的时间戳 如果小于直接从缓存中取(expires依赖本地时间 如果时间设置错误 exipres会无法达到预期效果)
// Cache-Control 可以理解为expires的替代方案 设置一个范围值 max-age=31536000 如果该资源在31536000秒内再次请求会从缓存中取
// Cache-Control 的其他值 
// s-maxage比max-age优先级要高  s-maxage仅在代理服务器中
// public与private public既可以被浏览器缓存也可以被代理服务器缓存 需要手动设置; private 默认值 只能被浏览器缓存
// no-store 是真正意义上不进行缓存 no-cache 的目的是防止从缓存中取到过期资源
// expires和cache-control同时存在时 cache-control优先级更高 expires为向下兼容方案

// 二 协商缓存 
// Last-Modified 是一个时间戳 如果启用了协商缓存它会在首次请求时随着response header返回  后续每次请求都会携带last-Modified与服务器伤的最后修改时间进行对比 
// 如果有变化就返回新的资源 没有变化就返回304 
// Last-Modified的一些弊端 有些情况下不能感知到文件内部的变化 这时候需要Etag 
// Etag在感知文件变化时会更加准确 但是会影响服务器的性能 

// CDN 
// CDN主要用来存放静态资源(比如 css js 图片 ) 非静态资源一般是指(jsp asp这类后端渲染的页面) 当用户访问量大 带宽小时会优先选择就近的机房进行数据请求 CDN的两个主要特点 缓存 回源
// 缓存是指把资源copy一份到cdn服务器  回源是值当cdn发现自己没有这个资源的时候 会继续向上层根服务器索要资源

// DOM操作 
// 首先创建DOM 添加进页面 每一个DOM都有上都有近两百个自带属性和事件 一些没有用到的属性渲染至浏览器不可避免的会有性能消耗 而虚拟DOM采用一个js对象去描述DOM节点 所以他比创建一个dom的代价小的多
// 更新或者删除时比较两个虚拟JS DOM树的差异 
// vdom的实现主要参考snabbdom类库 (依次从style，props，eventlistener，dataset， class， attributes)进行优化
// DOM的操作会引发重绘||回流 
// 事件委托 DOM Fragment 
// 减少回流和重绘 回流：位置 宽高 显示隐藏  重绘 背景颜色 字体颜色 不需要计算几何属性的值改变 现代浏览器重绘和回流已经智能列队更新
// 减少办法 1 避免逐条改变css的样式  应通过一个class同意修改 减少多次请求
// 在一些特定场景可以先display：none隐藏需要操作的dom 设置完所有样式后再block 这样在隐藏期间就不会触发多次重绘与回流

// webpack
// 构建速度： Happypack
// 体积优化 Tree-Shaking
// 组件按需加载

// 图片相关 --引自 高性能网站建设指南
// 计算机色彩基础 像素用二进制表示 二进制的位数越多可以表示的颜色种类越多 成像的效果就越来约细致 相应的文件体积就越大
// 图片的几种格式 
// jpg 有损压缩 应用场景一般为大背景 轮播图
// png 无损压缩 体积大 质量高 支持透明 小图片 小logo应用较多
// svg 文本文件 体积小 不失真 兼容性好 个人使用较少
// base64 文本文件 小图标的解决方案 会加大文件体积 需要控制一定范围 一般10kb
// WebP 比较全能各种优点 细节丰富 支持透明 也可以展示动态图 体积小 兼容性不好 不过提供兼容性的写法 .jpg.webp 如果支持webp优先引用webp资源
// 列入 <img src="//img.alicdn.com/tps/i4/TB1CKSgIpXXXXccXXXX07tlTXXX-200-200.png_60x60.jpg_.webp" alt="demo" class="app-icon">
// 首屏图片懒加载 