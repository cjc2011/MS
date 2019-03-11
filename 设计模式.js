//  一 单例模式

var Singleton = function (name) {
  this.name = name;
  this.instance = null;
};
Singleton.prototype.getName = function () {
  alert(this.name);
};
Singleton.getInstance = function (name) {
  console.log(this, 'this')
  debugger
  if (!this.instance) {
    this.instance = new Singleton(name);
  }
  return this.instance;
};

var a = Singleton.getInstance('sven1');
var b = Singleton.getInstance('sven2');


// 发布订阅模式

var salesOffices = {}; // 定义售楼处

salesOffices.clientList = {}; // 缓存列表，存放订阅者的回调函数

salesOffices.listen = function (key, fn) { // 增加订阅者 
  if (!this.clientList[key]) {
    this.clientList[key] = []
  }
  this.clientList[key].push(fn)
};

salesOffices.trigger = function () {
  var key = Array.prototype.shift.call(arguments)
  var fns = this.clientList[key]

  if (!fns || !fns.length) {
    return false
  }

  for (var i = 0, fn; fn = fns[i++];) {
    fn.apply(this, arguments);
  }
}

salesOffices.remove = function (key, fn) {
  var fns = this.clientList[key]

  if (!fns) {
    return flase
  }
  // 如果没有传如具体的函数 则删除全部
  if (!fn) {
    fns && (fns.length = 0)
  } else {
    for (var i = fns.length - 1; i >= 0; i--) {
      var _fn = fns[i]
      if (_fn === fn) {
        fns.splice(i, 1)
      }
    }
  }
}



var Event = (function () {
  var clientList = {},
    listen,
    trigger,
    remove;
  listen = function (key, fn) {
    if (!clientList[key]) {
      clientList[key] = [];
    }
    clientList[key].push(fn);
  };
  trigger = function () {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  };
  remove = function (key, fn) {
    var fns = clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1; l >= 0; l--) {
        var _fn = fns[l]; if (_fn === fn) {
          fns.splice(l, 1);
        }
      }
    }
  };
  return {
    listen: listen,
    trigger: trigger,
    remove: remove
  }

})();