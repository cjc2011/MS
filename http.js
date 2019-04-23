// HTTP
// Http协议是建立在TCP协议基础之上的，当浏览器需要从服务器获取网页数据的时候，会发出一次Http请求。Http会通过TCP建立起一个到服务器的连接通道，当本次请求需要的数据完毕后，Http会立即将TCP连接断开，这个过程是很短的。所以Http连接是一种短连接，是一种无状态的连接。
// 所谓的无状态，是指浏览器每次向服务器发起请求的时候，不是通过一个连接，而是每次都建立一个新的连接。如果是一个连接的话，服务器进程中就能保持住这个连接并且在内存中记住一些信息状态。而每次请求结束后，连接就关闭，相关的内容就释放了，所以记不住任何状态，成为无状态连接。
// http1.1  持久化 keep-Alive 管道化 => 浏览器把多个请求都发给服务器 服务器处理完一个再继续处理下一个 中间不会有空闲 还可以理由服务端多线程并行处理 响应更快
// 持久链接 => http1.0 请求 - 应答 客户端每个请求都要新建一个链接 使用keep-alive 当出现对服务器的后续请求时 keep-alive避免了重新建立链接
// 管道化 => 普通 请求1 -> 响应1 -> 请求12 -> 响应2 -> 请求3 -> 响应3 管道化后 => 请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 -> 响应3
// 一个请求报文包含请求行 请求头 空行 请求体
// 响应报文 状态行 相应头 空行 响应体

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

