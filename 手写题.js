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

