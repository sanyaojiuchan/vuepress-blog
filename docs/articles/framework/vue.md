---
title: Vue相关
date: 2020-06-10
categories:
  - 面试
tags:
  - Vue
author: 王负剑
---

## 1. v-show 与 v-if 有什么区别？

**v-if** 是**真正**的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

**v-show** 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 “display” 属性进行切换。

其中v-if条件不为真的时候，会将v-if条件渲染的`vnode`的`nodetype==8`（`nodetype==Comment`代表注释）。

而v-if条件为真的时候，会将v-if条件渲染的`vnode`的`nodetype==1`（`nodetype==Element`代表元素）

```
with(this) {
return (true) ? _c() : _e()
}
//_e  ==> target._e = createEmptyVNode
```



## 2. computed 和 watch 的区别和运用的场景？

**computed：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作；





![image-20200713010403132](/vuepic/image-20200713010403132.png)



## 3.  `Vue`中如何检测数组变化

- 使用函数劫持的方式，重写了数组的方法

- `Vue` 将data 中的数组，进行了原型链重写。指向了自己定义的数组原型方法，这样当调用数组api 时，可以通知依赖更新.如果数组中包含着引用类型。会对数组中的引用类型再次进行监控。

![image-20200713011110277](/vuepic/image-20200713011110277.png)

## 4.直接给一个数组项赋值，`Vue` 能检测到变化吗？

由于 JavaScript 的限制，Vue 不能检测到以下数组的变动：

- 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
- 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决第一个问题，Vue 提供了以下操作方法：

```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)
// vm.$set，Vue.set的一个别名
vm.$set(vm.items, indexOfItem, newValue)
// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
复制代码
```

为了解决第二个问题，`Vue` 提供了以下操作方法：

```
// Array.prototype.splice
vm.items.splice(newLength)
```




## 5. 谈谈你对 `Vue` 生命周期的理解？

**（1）生命周期是什么？**

`Vue`实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

**（2）各个生命周期的作用**

| 生命周期        | 描述                                                         |
| --------------- | ------------------------------------------------------------ |
| `beforeCreate`  | 组件实例被创建之初，组件的属性生效之前                       |
| `created`       | 组件实例已经完全创建，属性也绑定，但真实 `dom` 还没有生成，$el 还不可用 |
| `beforeMount`   | 在挂载开始之前被调用：相关的 render 函数首次被调用           |
| `mounted`       | el 被新创建的 `vm.$el` 替换，并挂载到实例上去之后调用该钩子  |
| `beforeUpdate`  | 组件数据更新之前调用，发生在虚拟 DOM 打补丁之前              |
| `update`        | 组件数据更新之后                                             |
| `activited`     | keep-alive 专属，组件被激活时调用                            |
| `deactivated`   | keep-alive 专属，组件被销毁时调用                            |
| `beforeDestory` | 组件销毁前调用                                               |
| `destoryed`     | 组件销毁后调用                                               |

**（3）要掌握每个生命周期内部可以做什么事**

+ `created` 实例已经创建完成，因为它是最早触发的原因可以进行一些数据，资源的请求。
+ `mounted` 实例已经挂载完成，可以进行一些DOM操作
+ `beforeUpdate` 可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
+ `updated` 可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环。 该钩子在服务器端渲染期间不被调用。
+ `destroyed` 可以执行一些优化操作,清空定时器，解除绑定事件

**（4）生命周期示意图**



![1.png](/vuepic/vueHooks.jpg)



## 6. 父组件可以监听到子组件的生命周期吗？

比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：

```
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
复制代码
```

以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：

```
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...     
复制代码
```

当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。



## 7. 谈谈你对 keep-alive 的了解？

keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染 ，其有以下特性：

- 一般结合路由和动态组件一起使用，用于缓存组件；
- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。



## 8. vue-router 路由模式有几种？

vue-router 有 3 种路由模式：hash、history、abstract，对应的源码如下所示：

```
switch (mode) {
  case 'history':
	this.history = new HTML5History(this, options.base)
	break
  case 'hash':
	this.history = new HashHistory(this, options.base, this.fallback)
	break
  case 'abstract':
	this.history = new AbstractHistory(this, options.base)
	break
  default:
	if (process.env.NODE_ENV !== 'production') {
	  assert(false, `invalid mode: ${mode}`)
	}
}
复制代码
```

其中，3 种路由模式的说明如下：

- hash:  使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
- history :  依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
- abstract :  支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式.



## 9. 能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？

**（1）hash 模式的实现原理**

早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。比如下面这个网站，它的 location.hash 的值为 '#search'：

```
https://www.word.com#search
复制代码
```

hash  路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
- 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

**（2）history 模式的实现原理**

HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：

```
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
复制代码
```

history 路由模式的实现主要基于存在下面几个特性：

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 popstate  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。



## 10. watch和computed的适用场景

![watch和computed的适用场景](/vuepic/watch和computed的适用场景.png)