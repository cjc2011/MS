// new Vue() 实例化过程

// 以下五和函数分别为构造函数Vue添加功能
// 1 initMixin(Vue)
// initMixin中的_init方法在new Vue中调用
// 给组件绑定uid  处理options initProxy initLifecycle initEvents initRender callHook initInjections initState initProvide callHook

// 2 stateMixin(Vue)

// 3 eventsMixin(Vue)

// 4 lifecycleMixin(Vue)

// 5 renderMixin(Vue)


// 1 computed实现
// 入口文件 vue/core/index.js 
// 6行 => initGlobalAPI(Vue)
// initGlobalAPI => vue/core/global-api/index.js => function initGlobalAPI() {}


