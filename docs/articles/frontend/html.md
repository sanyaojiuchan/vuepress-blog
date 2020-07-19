---
title: HTML查漏补缺
date: 2020-06-10
categories:
  - 前端
tags:
  - HTML
author: 王负剑
---

##  meta 标签

`<meta name="keyword" content="教程,购物,学习"> //作为搜索关键字`

`<meta name="description" content="xxxx教育机构-133xxxxxx">//描述`

##  article 标签

作为独立区域分区使用

##  section 标签

有大量相似结构的区域时候使用

##  aside 标签

作为侧边零部件，或者与主体结构关联不多的时候使用

##  pre 标签

保留原有格式展示

##  small 标签

作为描述性标签使用

##  time 标签

作为时间标签使用（语义化）

##  abbr 标签

作为解释类（名词解释）标签使用

##  sub 标签

作为下标使用

##  sup 标签

作为上标使用

##  常用语义化标签

- progress 进度条标签
- strong 强调时候使用
- em 斜体
- mark 类似马克笔效果
- cite 引用其他文献
- blockquote 引用大段文献
- address 表示地址

##  a 标签技巧

```
 <a href="tel:+18222222">电话</a> //调用拨号
<a href="mailto:18329403005@163.com">邮件</a>//调用发送邮件
```

##  form 表单 _表单收集多个数据使用 [ ]_

- 表单提交

1. `<button type="submit"></button>`
2. `<input type="submit" name="save" value="保存草稿">`
3. `<input type="submit" name="put" value="发布">`

- 下拉列表框

  ```
  <select name="" >
         <optgroup label="新闻">
             <option value="1">国内新闻</option>
             <option value="2">国外新闻</option>
         </optgroup>
        <optgroup label="游戏">
             <option value="1">单机</option>
            <option value="2">网游</option>
       </optgroup>
  </select>
  ```

- 选项框

  ```
  <input type="checkbox" name="categray[]" id="email" value="email">
      <label for="email">邮箱</label>
      <input type="checkbox" name="categray[]" id="mobile" value="mobile">
      <label for="mobile">手机</label>
  ```

- 文件上传

  ```
  <input type="file" name="file[]"  multiple accept=".png,.gif">
  ```

  使用 **accept=".png,.gif"**来限制上传文件类型

- 时间与日期

  ```
  <input type="date" name="time" min="2020-02-20" max="2025-02-20" step="3">
  ```

- 搜索和 DATALIST 数据列表

  ```\
  <input type="search" name="search" list="lesson">
              <datalist id="lesson">
                  <option value="mysql">数据库</option>
                  <option value="Python">人工智能</option>
                  <option value="Java">Java</option>
                  <option value="css">css</option>
              </datalist>
  ```

##  音频和视频

```
 <video controls muted preload="auto" width="300px" height="150px">
      <source src="" type="video/mp4">
      <source src="" type="video/avi">
  </video>
  <audio controls muted preload="auto">
      <source srcset="" type="audio/mp3">
      <source srcset="" type="audio/wav">
  </audio>
```
