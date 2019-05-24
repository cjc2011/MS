// this is a pen 转大写字母
// str.split(' ').map(function(item){
// 	return item.charAt(0).toUpperCase() + item.slice(1)
// }).join(' ')

// var a = {n : 1}
// var b = a 
// a.x = a = { n :2}
// console.log(a.x)
// console.log(b.x)
// console.log(b.x === a)
// 解析 连续赋值操作中 会先寻找a.x的值 a.x等于(a = {n:2}) => a.x = {n:2} 然后再进行a = {n:2}的操作 a被重写了 所以a.x = undefind 

// 链式调用 实现以及sleep函数
// function Main(name) {
//   var self = this
//   this.task = []
//   var fn = function() {
//     console.log('Hi this is' + name)
//     self.next()
//   }
//   this.task.push(fn)
//   setTimeout( () => {
//     this.next()
//   }, 0)

// }

// var Person = function(name) {
//   return new Main(name)
// }

// Main.prototype.eat = function(food) {
//   this.task.push(() => {
//     console.log('eat food ' + food)
//     this.next()
//   })
//   return this
// }

// Main.prototype.sayName = function(name) {
//   this.task.push( () => {
//     console.log('say name ' + name)
//     this.next()
//   })
//   return this
// }

// Main.prototype.sleep = function(time) {
//   this.task.push( () => {
//     setTimeout( () => {
//       console.log('sleep ' + time)
//       this.next()
//     }, time * 1000)
//   })
//   return this
// }

// Main.prototype.sleep = function(time) {
//   this.task.push( () => {
//     setTimeout( () => {
//       console.log('sleep ' + time)
//       this.next()
//     }, time * 1000)
//   })
//   return this
// }

// Main.prototype.sleepFirst = function(time) {
//   this.task.unshift( () => {
//     setTimeout( () => {
//       console.log('sleepFirst ' + time)
//       this.next()
//     }, time * 1000)
//   })
//   return this
// }

// Main.prototype.next = function() {
//   var fn = this.task.shift()
//   if (typeof fn === 'function') {
//     fn()
//   }
//   return this
// }

// Person('Jerry').sleepFirst(10).sayName('cjc').sleep(3).eat('supper')

// Promise 
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function Promise_(fn) {
  let that = this 
  that.status = PENDING                  //初始化状态
  that.value = undefined                 //.then接收的value值
  that.reason = undefined                //失败的原因值
  that.onFulfilledCallbacks = []         //存储resolve时的回调函数
  that.onRejectCallbacks = []

  function resolve(val) {
    if (val instanceof Promise_) {
      return val.then(resolve, reject)
    }

    setTimeout( () => {
      if (that.status === PENDING) {
        this.status = FULFILLED
        this.value = val 
        this.onFulfilledCallbacks.forEach( (cb) => {
          cb(that.value)
        })
      }
    });
  }

  function reject(reason) {
    setTimeout( () => {
      if (that.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.onRejectCallbacks.forEach( (cb) => {
          cb(that.reason)
        })
      }
    })
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }
}
