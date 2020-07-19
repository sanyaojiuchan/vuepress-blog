---
title: CSS3查漏补缺
date: 2020-06-10
categories:
  - 前端
  - 面试
tags:
  - CSS3
author: 王负剑
---


##   文本溢出处理

```
.main{
    width: 20px;
    border: 1px solid #ddd;
    text-overflow: ellipsis;
    overflow: hidden;
}

<div class="main">  sssssssssssssssssssss
</div>


//IE
.main{
	overflow:hidden;
	width:xxx;
	white-space:nowrap;
	text-overflow:ellipsis;
}
```

##   文字排版

```
<div class="main">  sssssssssssssssssssss
</div>

.main{
	width:20px;
    writing-mode: vertical-rl;
}
```

##   渐变属性

```
<div class="d0"></div>
    <div class="d1"></div>
    <div class="d2"></div>
    <div class="d3"></div>
    //
   body{
    width: 100%;
    height: 300px;
    display: inline-flex;
   flex-direction: row;
}
body div{
    margin-left: 15px;
} 
//线性渐变
   .d0{
    width: 300px;
    height: 300px;
    background: linear-gradient(red 50%,50%,black)
}
//径向渐变
.d1{
    width: 300px;
    height: 300px;
    background: radial-gradient(red,yellow 30% ,
    black 50%,black)
}
//重复线性渐变
.d2{
    width: 300px;
    height: 300px;
    background:repeating-linear-gradient(90deg ,red ,25px,yellow 25px,25px,black 50px)
}
//重复径向渐变
.d3{
    width: 300px;
    height: 300px;
    background: repeating-radial-gradient(red,24px,yellow 25px,26px,black 50px)
}
```

##   元素默认蓝色边框

​	`input`标签元素，如`button、text、areatext`的一些事件，在很多浏览器默认情况下会出现蓝色边框。这是由于元素默认的轮廓线产生的。取消方式如下：

```
//方法1
outline:none /default
//方法2
outline-width:0
```

##   背景透明，文字不透明

​	我们通常是使用`opacity`来做背景的透明化处理。使用`opacity`会导致所有子元素都透明。如果只想让背景透明，其他不透明，可以使用`rgba`来处理背景

```
background-color: rgba(red,green,blue,alpha)
```

##   `div`内置`img`元素，底部总有距离

​	用一个``div`包裹一个`img`,底边会有一个缝隙。这是由于`img`是行内元素，浏览器为下行字符留下的一些空间（与当前字体大小有关）。

解决办法：

```
<div> <img /></div>
// 1. 给 div的font-size或者ling-height设置为0
div{font-size:0}
// 2. 改变img的垂直对齐方式
img{ vertical-align:top |  middle}
//img变成块级元素(inline-block不可以)
img{ display : block}
```

##   元素自动填充背景色

​	当浏览器（chrome）给输入框自动填充内容后，也会自动给输入框带上背景。该问题是由于chrome会默认给自动填充的`input`、`select`、`textarea`等加上`:-webkit-autofill`私有伪属性造成的

解决办法：

```
input:-webkit-autofill{
  box-shadow: 0 0 0px 1000px white inset !important;
}
select:-webkit-autofill{
  box-shadow: 0 0 0px 1000px white inset !important;
}
textarea:-webkit-autofill{
  box-shadow: 0 0 0px 1000px white inset !important;
} 
```

##   transform奇数数值导致字体模糊

​	当元素设置有transform，且其值为基数或小数，同事其整体高度也有基数时，其内部文字会变模糊

解决方案：

- 不要给transform属性值设置奇数和小数值；
- 调整整体元素高度不要为奇数。

##   :last-child 和 :last-of-type

```
<style>
        .content{
            width: 500px;
            height: 500px;
            background: #ddd;
            display: flex;
        }
        .content div{
            width: 150px;
            height: 150px;
            background: #000;
            margin: 10px;
        }
        //最后一个 div 的border未生效
        /* .content div:last-child{
            border: 5px solid #ff0;
        } */
        //最后一个div的border生效
        .content div:last-of-type{
            border: 5px solid #ff0;
        }

    </style>
 <div class="content">
       <div>aaaa</div>
       <div>bbbb</div>
       <div>cccc</div>
       <span>dddd</span>
   </div>
```

结论：

1. `:last-child`选取一群兄弟元素中的最后一个元素，并且最后的这个元素必须是所声明的指定元素（注意2个条件）；
2. `:last-of-type`选取一群兄弟元素中的最后一个指定类型的元素。

综上：推荐使用`:last-of-type`  。同理适用于`:nth-last-child(n)`和`:nth-last-of-type(n)`

##   `DIV CSS`设计中如何去掉链接的虚线框？

`IE`下：`<a href="#"onfocus="this.blur();">  FF下:a{outline:none;}`

##   如何区别`display:none与visibility:hidden?`

相同的是display:none与visibility:hidden都可以用来隐藏某个元素；

不同的是display:none在隐藏元素的时候，将其占位空间也去掉；而visibility:hidden只是隐藏了内容而已，其占位空间仍然保留。

##   `float`和`margin`同时使用时， IE6的双倍边距BUG如何解决？

​	解决办法就是是加上`display:inline `代码

## 清除浮动的几种方式，各自的优缺点

- 父级`div`定义`height`
- 结尾处加空`div`标签`clear:both`
- 父级`div`定义伪类`:after`和`zoom`
- 父级`div`定义`overflow:hidden`
- 父级`div`也浮动，需要定义宽度
- 结尾处加`br`标签`clear:both`
- 比较好的是第3种方式，好多网站都这么用

##  display:inline-block 什么时候不会显示间隙？(携程)

- 移除空格
- 使用`margin`负值
- 使用`font-size:0`
- `letter-spacing`
- `word-spacing`

## 如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

- 多数显示器默认频率是`60Hz`，即`1`秒刷新`60`次，所以理论上最小间隔为`1/60*1000ms ＝ 16.7ms`

## 几种常见的CSS布局

+ 流体布局

```css
	.left {
		float: left;
		width: 100px;
		height: 200px;
		background: red;
	}
	.right {
		float: right;
		width: 200px;
		height: 200px;
		background: blue;
	}
	.main {
		margin-left: 120px;
		margin-right: 220px;
		height: 200px;
		background: green;
	}
<div class="container">
    <div class="left"></div>
    <div class="right"></div>
    <div class="main"></div>
</div>
```

+ 圣杯布局

```css
.container {
    margin-left: 120px;
    margin-right: 220px;
}
.main {
    float: left;
    width: 100%;
    height:300px;
    background: green;
}
.left {
    position: relative;
    left: -120px;
    float: left;
    height: 300px;
    width: 100px;
    margin-left: -100%;
    background: red;
}
.right {
    position: relative;
    right: -220px;
    float: right;
    height: 300px;
    width: 200px;
    margin-left: -200px;
    background: blue;
}
<div class="container">
	<div class="main"></div>
	<div class="left"></div>
	<div class="right"></div>
</div>
```

+ 双飞翼布局

```css
.content {
    float: left;
    width: 100%;
}
.main {
    height: 200px;
    margin-left: 110px;
    margin-right: 220px;
    background: green;
}
.main::after {
    content: '';
    display: block;
    font-size:0;
    height: 0;
    zoom: 1;
    clear: both;
}
.left {
    float:left;
    height: 200px;
    width: 100px;
    margin-left: -100%;
    background: red;
}
.right {
    float: right;
    height: 200px;
    width: 200px;
    margin-left: -200px;
    background: blue;
}
<div class="content">
    <div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```

##  css中可以让文字在垂直和水平方向上重叠的两个属性是什么？

- 垂直方向：`line-height`
- 水平方向：`letter-spacing`

## 如何使用CSS实现硬件加速？

> 硬件加速是指通过创建独立的复合图层，让GPU来渲染这个图层，从而提高性能，

- 一般触发硬件加速的`CSS`属性有`transform`、`opacity`、`filter`，为了避免2D动画在 开始和结束的时候的`repaint`操作，一般使用`tranform:translateZ(0)`