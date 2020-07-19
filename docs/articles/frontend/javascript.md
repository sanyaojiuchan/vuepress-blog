---
title: JavaScript查漏补缺
date: 2020-06-10
categories:
  - 前端
tags:
  - JavaScript
author: 王负剑
---



##  `const`声明

const 在声明值类型数据的时候不可修改，**在不同作用域内可以修改**。**在声明引用数据类型的时候可以修改**.**(只要内存地址不变即可)**

```javascript
const URL = "ABC.com"
function fun(){
	const URL = "EFG.com"
}
fun()

const CONFIG = {}
CONFIG.url = "123.com"
```

const在声明引用数据类型的时候，如果不需要修改引用数据内的部分属性，可以使用**Object.freeze(引用数据类型)**来锁住。

基本量传值，引用量传址

严格模式"use strict"会对当前作用域及其子作用域受影响

内层for循环跳出外层循环时可以使用自定义标签来表示跳出位置

```javascript
jump : for(let i =1;i<=10;i++){
	for(let n =1;n<=10;n++){
	if(n % 2 == 0){
	console.log(i,n)
	}
	if(i+n >=10){
	break jump
	}
	}
}
```

for in 查询索引

for of 查询值(数组 对象 字符串 DOM节点)

判断数据类型为基本数据类型还是引用数据类型可以使用  typeof 

判断数据类型为Array还是Object或者其他，可以使用   instanceof （aaa instanceof  Array  //  false）**instanceof 其实判断的是aaa.prototype**

字符串拼接  `${表达式}啦啦啦啦${表达式}`  **模板字符串支持随意换行，可以嵌套**

trim()去掉左右空白，密码校验

##  字符串截取：

```javascript
let  aa = 'abcd.com'
aa.slice(1,3) //'bc'   第一个参数为起始位置，第二个参数为结束位置，不包括当前位置（起始和结束可为负数） 
aa.substring(1,3)//'bc'   第一个参数为起始位置，第二个参数为结束位置，不包括当前位置（参数不能为负数，负数相当于0）
aa.substr(1,3)//'bcd'  第一个参数为起始位置，第二个参数为截取长度（起始位置可以为负数）
```

##  字符串检索：

- `lastIndexOf(searchvalue[,formindex])`  未指定formindex时，从右往左找，返回值为查找到的字符在字符串中索引值（indexOf是从左往右，返回所在索引）
- `includes(searchvalue[,formIndex])`formindex为起始索引位置  如果当前字符串包含被搜寻的字符串，就返回 true；否则返回 false（区分大小写）
- `str.startsWith(searchString[, formIndex])` 如果在字符串的开头找到了给定的字符则返回**`true`;**否则, 返回**`false`.**  （区分大小写）
- `str.endsWith(searchString[, formIndex])` 如果在字符串的结尾找到了给定的字符则返回**`true`;**否则, 返回**`false`.**  （区分大小写）

```
let aa = 'abcd.com'
aa.indexOf('b',2) // -1  第二个参数为查找起始位置，包括当前位置
aa.lastIndexOf('b',2) // 1  第二个参数为起始位置，往前查找（未指定第二个参数返回查询字符索引，倒序）
aa.includes('b',2) // false 
```

##  模糊手机号码

```javascript
function phone(mobile,len = 3){
	return mobile.slice(0,len*-1) + '*'.repeat(len)
}
phone('987654321011',5)
```

##  数据类型转换

```javascript
//number转换成string
let num = 99
newNum = num+""
newNum2 = String(num)
newNum3 = num.toString()
//string转换成number
let str = '99'
newStr = str*1
newStr2 = Number(str)
//string转换成array
str.split('')  // ['9','9']
//array转换成string
let arr = ['aaa','bbbb']
arr.join('|') // 'aaa|bbbb'
```

##  修改对象原型

- **OLD**			 `Object.prototype.__proto__`
- **NEW** 			`Object.setPrototypeOf(obj,prototype)`   (obj:要设置其原型的对象，prototype：该对象的新原型)

##  对象转换数组

- `Object.keys(obj)`   *方法会返回一个由一个给定对象的自身可枚举**属性**组成的数组*
- `Object.values(obj)`   *方法会返回一个由一个给定对象的自身可枚举**属性值**组成的数组*
- `Object.entries(obj)`   *返回一个给定对象自身可枚举属性的键值对数组*

##  对象浅拷贝

```javascript
let obj1 = {name:'ms',age:18 }
console.log(JSON.stringify(obj1)+'-obj1');
       
let obj2 = {...obj1}
obj2.age= 19
console.log(JSON.stringify(obj1)+'-obj1');
console.log(JSON.stringify(obj2)+'-obj2');
       
let obj3 = Object.assign({},obj1)
obj3.age= 20
console.log(JSON.stringify(obj1)+'-obj1');
console.log(JSON.stringify(obj3)+'-obj3');

let obj4 = {}
for (const key in obj1) {
    obj4[key] = obj1[key] + '-SS'
}
obj4.age= 21
console.log(JSON.stringify(obj1)+'-obj1');
console.log(JSON.stringify(obj4)+'-obj4');
```

##  对象深拷贝（递归）

```javascript
let obj1 = {
            name: 'ms',
            age: 18,
            arr: [1, 2, 3],
            hobby: {
                book: "bbb"
            }
        }

        function deepCopy(obj) {
            let res = obj instanceof Array ? [] : {}
            for (const [k, v] of Object.entries(obj)) {
                res[k] = typeof v == "object" ? deepCopy(v) : v
                console.log(res[k],v);
            }
            return res
        }
        let obj2 = deepCopy(obj1)
        obj2.hobby.book = "ccccc"
        obj2.arr.push('abc')
        console.log(JSON.stringify(obj1, null, 2));
        console.log(JSON.stringify(obj2, null, 2));
```

```
deepClone = JSON.parse(JSON.stringfy(obj1))
//转换时缺陷 ： 	undefined 没有了
//				BigInt  会报错 
//				function	没有了
//				正则	空对象{}
//				Symbol  没有了 
//				new Date()	转换成字符串后不能转换回来

```

```
function deepClone(obj) {
      // 验证类型
      if(obj === null) return null
      // obj为symbol bigint function 直接返回
      if(typeof obj !== 'object') return obj
      if(obj instanceof RegExp) return new RegExp(obj)
      if(obj instanceof Date) return new Date(obj)
      // 对于数组和对象进行循环递归克隆
      let clone = new obj.constructor()
      Object.keys(obj).forEach(key=>{
        clone[key] = deepClone(obj[key])
      })
      return clone
    }
    
   //BUG 在对象的循环引用中会出现死递归 
```



##  声明对象

- 字面量声明		`let obj = {}`
- 工厂函数  `function user(){return {...}}`
- 构造函数  `function User(){}   let obj = new User()`

##  对象访问器

- **JavaScript Getter（get 关键词）**

  ```
  var person = {
    language : "en",
    get lang() {
      return this.language;
    }
  };
  // 使用 getter 来显示来自对象的数据：
  console.log(person.lang) //en
  ```

-  **JavaScript Setter（set 关键词）**

  ```
  var person = {
    language : "en",
    set lang(value) {
      this.language = value;
    }
  };
  //  使用 setter 来设置对象属性：
  person.lang = 'cn'
  console.log(person.language) //cn
  ```

##  数据双向绑定

```javascript
<body>
    <input type="text" m-model="header" />
    <h4 m-bind="header"></h4>
    <br />
    <input type="text" m-model="title" />
    <input type="text" m-model="title" />
    <h4 m-bind="title"></h4>
    <script>
        function View() {
            const proxy = new Proxy({}, {
                get(obj, props) {},
                set(obj, props, value) {
                    //根据代理仓库数据渲染相对应指令的元素
                    document.querySelectorAll(`[m-model=${props}]`).forEach(item => {
                        item.value = value;
                    });
                    document.querySelectorAll(`[m-bind=${props}]`).forEach(item => {
                        item.innerHTML = value;
                    });
                }
            });
            this.init = function () {
                //根据指令找到所有需要代理的DOM元素
                let elems = document.querySelectorAll('[m-model]');
                elems.forEach(item => {
                    item.addEventListener('keyup', function () {
                        //将找到的DOM元素代理到proxy仓库
                        proxy[this.getAttribute('m-model')] = this.value;
                    });
                });
            };
        }
        new View().init();
    </script>
</body>
```

##  类静态属性

​	如果类的属性是为每一个对象使用的，而不是为某一个对象独享，可以使用静态属性

```
class User{
 	static host = "http://www.xxx.com"
 	api(url){
 		return User.host + `/${url}`
 	}
}
```

##  构造函数中得静态方法和一般方法区别  *类中使用static来声明静态属性和方法*

````
function User(){}
User.__proto__.show = function(){}  //静态方法
User.prototype.show = function(){}	//一般方法
````

##  保护类中的保护属性和私有属性

- 使用命名规范_arg来声明保护属性

  ` let  _url = ' http://xxx.com'`

- 使用Symbol来声明保护属性

  ```
  const protects = Symbol()
          class User {
              constructor(name) {
                  this[protects] = {}
                  this[protects].host = "http://www.xxx.com"
                  this[protects].name = name
              }
              set name(name) {
                  this[protects].name = name
              }
              get name() {
                  return this[protects].name
              }
          }
          let u = new User('sdsds');
          u.host = 'bbb' //bbb
          console.log(u[protects].host == u.host); //false
  ```

- 使用weakMap来声明保护属性

  ```
  const protects = new WeakMap()
          class User {
              constructor(name) {
                  protects.set(this,{
                      host : 'http://www.xxx.com',
                      name:name
                  })
              }
              set url(url) {
                 protects.set(this,{...protects.get(this),url:host})
              }
              get url() {
                  return protects.get(this)['host']
              }
              // get name() {
              //     return protects.get(this)['name']
              // }
          }
          let u = new User('aa');
          console.log(u.name); //undefined
          console.log(u.url);  //http://www.xxx.com
  ```

- 使用关键字 *#*  声明私有属性

  ```
  class User {
              #host = "http://www.xxx.com"
              constructor(name) {
                  this.name = name;
                  this.#checked(name);
              }
              set url(url) {
                  this.#host = url
              }
              #checked = () => {
                  if (this.name.length < 5) {
                      throw new Error('名字不能小于五位')
                  } 
                  return true                
              }
          }
          let u = new User('aaaaaa');
          u.url = "www.aaa.com"
          console.log(u);
  ```

 ##  模块按需加载

  ```
  document.querySelector("button").addEventListener("click",()=>{
  	import("./modules/m1.js").then((module)=>{
  	  console.log(module)
  	})
  })
  //import("./modules/m1.js")  返回一个Promise对象
  ```

  

##  JS中常用数据类型

- 基本数据类型

  - 数字Number

    Number()

    parseInt()

    parseFloat()

  - 字符串String

    toString()转换字符串

    Object.prototype.toString方法是用来监测数据类型的

  - 布尔Boolean

  - 空对象指针Null

  - 未定义Underfined

- 引用数据类型

  - 对象数据类型
    - {}普通对象
    - []数组对象
    - /^$/正则对象
    - Math数学函数对象
    - Date 日期对象
  - 函数数据类型function

##  `JS`中数据比较流程

![数据类型判断](/frontendpic/数据类型判断.jpg)

##  栈堆内存

-  基本数据类型的值直接存储在当前的作用域下

-  引用数据类型的值不能直接存储到当前的作用域下（因为存储内容可能过于复杂），我们需要开辟一个新的空间，把内容存进去

-  栈内存：本身就是一个供JS代码执行的环境，所有的基本类型值都会直接的在栈内存中开辟一个位置进行存储

-  堆内存：用来存储引用类型中的信息值。（对象存储的是键值对，函数存储的是代码字符串）


##  Promise

​		pending（准备状态）

​		fullfilled （完成状态）

​		rejected （失败状态）

```javascript
new Promise((resolve,reject)=>{
	setTimeout(()=>{
		console.log(1)
		resolve()
	},1000)
}).then((res)={
	setTimeout(()=>{
		console.log(2)
	},2000)
})

```





```javascript
Promise.race([p1,p2,p3]).then((res)=>{
	console.log(res)
	}).catch((err)=>{
	console.log(err)	
})
```

```
Promise.all([p1,p2,p3]).then((res)=>{
	console.log(res)
	}).catch((err)=>{
	console.log(err)	
})
```

##  `Form`表单

- `<label for="ye"><input id="ye" type="checkbox" />文本</label>`点击标签中的文本，可使多选框聚焦