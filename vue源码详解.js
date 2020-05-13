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

// data || props || computed || filters || watch || methods ||  以及各生命周期顺序

// Props -》 Methods -》 Data -》Computed -》 Watch


// 关于virtual dom
// 用js对象来映射dom关系 在数据更新时 先进行对象的比较 对局部改变的内容进行替换
// 很多时候手工优化dom确实会比virtual dom效率高，对于比较简单的dom结构用手工优化没有问题，但当页面结构很庞大，结构很复杂时，手工优化会花去大量时间，而且可维护性也不高，不能保证每个人都有手工优化的能力。至此，virtual dom的解决方案应运而生，virtual dom很多时候都不是最优的操作，但它具有普适性，在效率、可维护性之间达平衡。
// virtual dom另一个比较重大的意义是提供了跨平台的ui渲染能力 由js对象去映射渲染出不同平台的UI

// 关于diff算法
// 核心算法采用snabbdom.js




// 关于vue组件的封装
// 组件都是由props event slot三个基础组成
// props是组件核心 定义了哪些是可配置的 props最好由对象来组成这样可以针对每个属性设置默认值 类型及校验函数