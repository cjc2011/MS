// HTTP 流程
// 输入网址 => 进行域名解析 => dns IP查询 => 根据ip进行tcp链接（三次握手建立通道） =>  服务器相应资源请求 => 浏览器解析css js dom
// 浏览器加载外部css 生成CSS规则树  解析html生成dom tree 将DOM tree和css规则树合并生成一个渲染树
// 根据渲染树绘制布局
// 阻塞规则： 浏览器加载js文件时会停止构建DOM 然后将控制权交给js引擎 js引擎处理完脚本后会再继续构建DOM 我们一般会在html底部引用js文件 并且添加 async defer
// js文件设置defer async后会异步加载 不影响dom渲染 下载后js解析过程中会中断DOM渲染
// defer 始终按照加载顺序执行 如果js文件设置了该属性 浏览器会异步加载该文件不影响后续的DOM渲染 如果多个设置defer的script标签 会按照顺序执行script 
// async 谁先加载完谁先执行

// HTTP
// Http协议是建立在TCP协议基础之上的，当浏览器需要从服务器获取网页数据的时候，会发出一次Http请求。Http会通过TCP建立起一个到服务器的连接通道，当本次请求需要的数据完毕后，Http会立即将TCP连接断开，这个过程是很短的。所以Http连接是一种短连接，是一种无状态的连接。
// 所谓的无状态，是指浏览器每次向服务器发起请求的时候，不是通过一个连接，而是每次都建立一个新的连接。如果是一个连接的话，服务器进程中就能保持住这个连接并且在内存中记住一些信息状态。而每次请求结束后，连接就关闭，相关的内容就释放了，所以记不住任何状态，成为无状态连接。
// http1.1  持久化 keep-Alive 管道化 => 浏览器把多个请求都发给服务器 服务器处理完一个再继续处理下一个 中间不会有空闲 还可以理由服务端多线程并行处理 响应更快
// 持久链接 => http1.0 请求 - 应答 客户端每个请求都要新建一个链接 使用keep-alive 当出现对服务器的后续请求时 keep-alive避免了重新建立链接
// 管道化 => 普通 请求1 -> 响应1 -> 请求12 -> 响应2 -> 请求3 -> 响应3 管道化后 => 请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 -> 响应3
// 一个请求报文包含请求行 请求头 空行 请求体
// 请求头内容 Cache-Control(浏览器缓存设置) Cookie(用户信息) Content-Type(请求数据类型) Referer(浏览器前向地址) User-Agent(浏览器信息)
// 响应报文 状态行 相应头 空行 响应体

// 缓存机制
// 1 强缓存
// http利用Expires和cache-control控制 当浏览器发出请求时 浏览器会根据这两个字段判断资源是否命中强缓存
// expires 是一个时间戳 浏览器再次去请求资源时会对比本地时间和expires的时间戳 如果小于直接从缓存中取(expires依赖本地时间 如果时间设置错误 exipres会无法达到预期效果)
// Cache-Control 可以理解为expires的替代方案 设置一个范围值 max-age=31536000 如果该资源在31536000秒内再次请求会从缓存中取
// Cache-Control 的其他值: 
  // s-maxage比max-age优先级要高  s-maxage仅在代理服务器中
  // public与private public既可以被浏览器缓存也可以被代理服务器缓存 需要手动设置; private 默认值 只能被浏览器缓存
  // no-store 是真正意义上不进行缓存 
  // no-cache 的目的是防止从缓存中取到过期资源
  // expires和cache-control同时存在时 cache-control优先级更高 expires为向下兼容方案

// 2 协商缓存
// Last-Modified 是一个时间戳 如果启用了协商缓存它会在首次请求时随着response header返回  后续每次请求都会携带last-Modified与服务器伤的最后修改时间进行对比 
// 如果有变化就返回新的资源 没有变化就返回304 
// Last-Modified的一些弊端 有些情况下不能感知到文件内部的变化 这时候需要Etag 
// Etag在感知文件变化时会更加准确 但是会影响服务器的性能 

// 实践方案 ngix配置每次html都返回最新的 公共库 方法类 框架抽离出走cdn 图片和组件js文件使用etag

// 常见状态码
// 1**: 请求已接受 正在处理
// 2**: 请求成功
// 3**: 重定向
// 4**: 客户段错误 语法错误或请求不能实现  401未授权 403请求被禁止 404资源不存在
// 5**: 服务器错误

// 三次握手
// TCP协议通过三次握手建立一个可靠的连接
// 第一次握手：客户端尝试连接服务器，向服务器发送syn包（同步序列编号Synchronize Sequence Numbers），
//           syn=j，客户端进入SYN_SEND状态等待服务器确认
// 第二次握手：服务器接收客户端syn包并确认（ack=j+1），同时向客户端发送一个SYN包（syn=k），即SYN+ACK包，
//           此时服务器进入SYN_RECV状态
// 第三次握手：第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，
//           客户端和服务器进入ESTABLISHED状态，完成三次握手

// 四次挥手
// 由于TCP连接时全双工 因此，每个方向都必须要单独进行关闭，这一原则是当一方完成数据发送任务后，发送一个FIN来终止这一方向的连接
// 第一次挥手：Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。
// 第二次挥手：Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与SYN相同，一个FIN占用一个序号），
//           Server进入CLOSE_WAIT状态。
// 第三次挥手：Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。 
// 第四次挥手：Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，
//           Server进入CLOSED状态，完成四次挥手。 



// http 超文本传输协议是建立在tcp协议基础上的 当浏览器需要从服务器获取数据时 会建立起一个http链接 当本次数据请求完成后 这个链接会立刻断开 并且这个链接是无状态的
// 请求报文包含 请求行 空行 请求头 请求体 
// 请求体 中包含key-value的数据
// 请求头中常见的字段有cache-control content-type reffer cookie user-agent host
// post与get的差别 1 post参数在请求体中 get明文的在url中 2 get可以缓存数据 post一般用来增删改不可缓存 3 数据大小有限制