// new Vue() 实例化过程

// 以下五和函数分别为构造函数Vue添加功能
// 1 initMixin(Vue)
// initMixin中的_init方法在new Vue中调用
// initProxy initLifecycle initEvents initRender callHook initInjections initState initProvide callHook
  // initProxy 
    // 给组件vm添加_renderProxy方法
  // initLifecycle
    // 给组件绑定uid  处理options 初始化生命周期相关变量为false(_isMounted, _isDestroyed, _isBeingDestroyed)
  // initEvents
    // 
  // initRender
    // 初始化 slots vm._c vm.$createElement $attrs $listeners
  // callHook('beforeCreate')
    // 触发beforeCreate生命周期
  // initInjections
    // 初始化inject 
  // <initState>  </initState>
    // 依次初始化props methods data computed watch
  // initProvide
    // 初始化provide
  // callHook('created')

// 2 stateMixin(Vue)
// 绑定 vm.$watch Vue.prototype.$watch

// 3 eventsMixin(Vue)

// 4 lifecycleMixin(Vue)

// 5 renderMixin(Vue)


// 1 computed实现
// 入口文件 vue/core/index.js 
// 6行 => initGlobalAPI(Vue)
// initGlobalAPI => vue/core/global-api/index.js => function initGlobalAPI() {}




// new Vue实例化主要调用了initMixin中_init方法 _init方法中主要做了初始化生命周期 事件中心 初始化渲染以及初始化data props computed watch等等