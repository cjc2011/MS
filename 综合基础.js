//  “use strait” ECMA5 添加了严格模式 
// 作用： 消除js语法中一些不严谨/不合理之处；确保代码安全运行 提高编译效率；
// 举例： 默认this 变量提升 

// 一 闭包
// 可以访问其他函数作用域中变量的函数
// 闭包返回的是一个函数 返回的函数中包含对其他函数中变量的引用
// function func(){
//   var a = 1,b = 2;
//   function closure(){
//     return {
//       a: a,
//       b: b
//     };
//   }
//   return closure;
// }
// var t = func()  
// t() // {a:1, b:2}
// 闭包的应用场景 common 模块化 函数柯里化 Iterator迭代器 点击事件保持值的引用


// 模块化实现
// var myModule = (function() {
//   var module = {}
//   function defined(name, deps, fn) {
//     for (var i = 0; i < deps.length; i++) {
//       deps[i] = module[deps[i]] 
//     }
//     module[name] = fn.apply(fn, deps)
//   }
//   function get(name) {
//     return module[name]
//   }
//   return {
//     defined: defined,
//     get: get
//   }
// })()

// 函数柯里化
// function add() {
//   var args = [].slice.call(arguments);
//   var next = function () {
//     var inner_arg = [].slice.call(arguments)
//     return add.call(null, args.concat(inner_arg))
//   }

//   next.toString = function() {
//     return args.toString()
//   }

//   return next
// }

// Iterator
// function it(arr) {
//   var itIndex = 0 
//   return {
//     next: function() {
//       return itIndex > arr.length ?
//         {value: arr[itIndex++], done: false } :
//         {value: undefined, done: true}
//     }
//   }
// }

// 面试题
// function fun(n,o){
//   console.log(o);
//   return {
//     fun: function(m){
//       return fun(m,n);
//     }
//   };
// }

// var a = fun(0);  
// a.fun(1);   
// a.fun(2);  
// a.fun(3);   

// var b = fun(0).fun(1).fun(2).fun(3);  


// 二 作用域 
// 函数内变量的值取决与函数定义时所处的作用域
// 变量提升 预解析 函数声明优先级高于变量赋值
// es6 let 不会变量提升
// fn() //2
// var fn = function() {
//   console.log('1')
// }

// function fn() {
//   console.log('2')
// }

// 三 函数传参
// js函数参数 复杂类型是对地址的引用 简单类型是值的引用
// demo

// var a = [1,2,3,4]
// var b = 20
// function test1(arr) {
//   arr.splice(1,1)
// }
// function test2(num) {
//   num++
// }
// test1(a)
// test2(b)
// console.log(a, b)


// 四 this 指向问题
// 1 默认绑定 
//function foo() { 
//   console.log( this.a );
// }
// var a = 2 
// foo() // 2

// 2 隐式绑定 
// function foo() { 
//   console.log( this.a );
// }
// var obj = { 
//   a: 2,
//   foo: foo 
// };
// obj.foo(); 

// tips: 对象属性引用链中只有最顶层或者说最后一层会影响调用位置。举例来说
// function foo() { 
//   console.log( this.a );
// }
// var obj2 = { 
//   a: 42,
//   foo: foo 
// };
// var obj1 = { 
//   a: 2,
//   obj2: obj2 
// };
// obj1.obj2.foo(); 

// 隐氏绑定this绑定丢失
// function foo() { 
//   console.log( this.a );
// }
// var obj = { 
//   a: 2,
//   foo: foo 
// };
// var bar = obj.foo; 
// var a = "oops, global"; 
// bar(); // "oops, global"

// 3 显式绑定 call() apply() bind()
// call() 接收参数以,链接 apply() 支持数组

// 实现一个bind函数
// var obj = {
//   name: 'cjc',
//   age: 27
// }
// function bind(fn, obj) {
//   return function() {
//     fn.apply(obj, arguments)
//   }
// }
// function log() {
//   console.log(this.age)
// }
// var fn = bind(log, obj)
// fn() => 27

// 实现一个call
// Function.prototype.call2 = function(context) {
//   context.fn = this // 调用时 function.call 这时的this指向这个函数 bar.call2(foo) 相当于链式调用 this指向bar
//   context.fn()      // 调用完后删除
//   delete context.fn
// }
// var foo = {
//   value: 1 
// }
// function bar() {
//   console.log(this.value) 
// }
// bar.call2(foo)

// 五 new 操作符做了什么
// 1 一个继承自构造函数名.prototype的新对象被创建
// 2 调用构造函数时 this 指向新创建的对象
// 3 将this return

// 实现creat_new
// function creat_new() {
//   var fun = [].shift.call(arguments)
//   var obj = Object.create(context.prototype)
//   fun.apply(obj, arguments)
//   return obj
// }

// 六 ES6  iterator？for of？
// function it(arr) {
//   var it_index = 0
//   return {
//     next: function() {
//       return it_index < arr.length ? 
//       { value: arr[it_index++], done: false } : 
//       { value: undefined, done: true}
//     }
//   }
// }


// 七 ES6 promise 实现
// const PENDING = 'PENDING'
// const FULFILLED = 'FULFILLED'
// const REJECTED = 'REJECTED'

// class MyPromise {
//   constructor (handle) {
//     if (!isFunction(handle)) {
//       throw new Error('MyPromise must accept a function as a parameter')
//     }
//     // 添加状态
//     this._status = PENDING
//     // 添加状态
//     this._value = undefined
//     // 执行handle
//     try {
//       handle(this._resolve.bind(this), this._reject.bind(this)) 
//     } catch (err) {
//       this._reject(err)
//     }
//   }
//   // 添加resovle时执行的函数
//   _resolve (val) {
//     if (this._status !== PENDING) return
//     this._status = FULFILLED
//     this._value = val
//   }
//   // 添加reject时执行的函数
//   _reject (err) { 
//     if (this._status !== PENDING) return
//     this._status = REJECTED
//     this._value = err
//   }
// }


// 八 原型 原型链
// function Person(){
// }
// Person.prototype.name = "Nicholas";
// Person.prototype.age = 29;
// Person.prototype.job = "Software Engineer";
// Person.prototype.sayName = function(){
//     alert(this.name);
// };

// var person1 = new Person();
// person1.sayName();    //"Nicholas"
// var person2 = new Person();
// person2.sayName();    //"Nicholas"
// console.log(person1.sayName == person2.sayName);  //true

// 构造函数的prototype指向这个构造函数的原型对象
// console.log(Person.prototype) 输出的是一个对象{name: "Nicholas", age: 29, job: "Software Engineer", sayName: ƒ, constructor: ƒ}
// 原型对象的constructor又指回这个构造函数
// console.log(Person.prototype.constructor) 输出的是构造函数本身
// 实例的_proto_对象 指向构造函数的原型对象 
// console.log(person1.__proto__ === Person.prototype)
// 可以通过实例获取保存在原型中的值 但却不能通过实例对象修改原型中的值 如果在实例中添加一个属性 如果属性名与原型中的相同 那么会屏蔽原型中的属性 读取实例中的值
// person1.name = "Greg"; console.log(person1.name) //'Greg' 实例属性中有就不必再搜索原型
// person1.hasOwnProperty() 判断一个属性是存在于实例中还是原型中 如果存在于实例中返回true

// constructor

// 九 js继承

// 十 进程和线程是什么？有什么区别？
// 进程是CPU资源分配的最小单位
// 线程是CPU调度的最小单位
// 浏览器是多进程 系统对每个浏览器都分配了资源(CPU 内存) 每点开一个tab就相当于创建了一个独立的浏览器进程
// 浏览器分别包含以下进程：Browser进程 第三方插件进程 GPU进程 浏览器渲染进程
// 浏览器渲染进程是多线程的 包含以下线程：GUI渲染线程 JS引擎线程 事件触发线程 定时触发器线程 异步http请求线程
// 渲染线程 解析HTML css 构建dom树和渲染树 布局渲染等功能和js引擎线程互斥
// js殷勤线程 就是人们常说的处理js脚本程序 负责解析 执行js代码
// 事件触发线程 归属于浏览器 用来控制事件循环(可以理解为js引擎忙不过来 需要浏览器另开线程协助) 例如 当js引擎执行定时器 鼠标点击事件 会将对应的任务添加到事件进程中
// 定时器触发器线程 setInterval setTimeout 最小为4m
// http请求线程 XMLHttpRequest在链接后通过浏览器新开一个线程请求 放入事件队列中


function SuperType(){
  this.property = true;
}

SuperType.prototype.getSuperValue = function() {
  return this.property
}

function SubType() {
  this.subproperty = false
}

SubType.prototype = new SuperType()

SubType.prototype.getSubValue = function() {
  return this.subproperty
}

var instance = new SubType();

instance.getSuperValue()
