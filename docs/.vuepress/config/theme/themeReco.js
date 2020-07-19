module.exports = {
  type: 'blog',
  // 博客设置
  // blogConfig: {
  //   category: {
  //     location: 2, // 在导航栏菜单中所占的位置，默认2
  //     text: '文章分类' // 默认 “分类”
  //   },
  //   tag: {
  //     location: 3, // 在导航栏菜单中所占的位置，默认3
  //     text: '标签' // 默认 “标签”
  //   }
  // },
  blogConfig:{
    category: {
          location: 2, // 在导航栏菜单中所占的位置，默认2
          text: 'Category'  // 默认 “分类”
        },
    tag:{
      location: 3, // 在导航栏菜单中所占的位置，默认3
      text: 'Tag' // 默认 “标签”
    }
  },
   // 备案
   record: 'ICP 备案文案',
   recordLink: 'ICP 备案指向链接',
   cyberSecurityRecord: '公安部备案文案',
   cyberSecurityLink: '公安部备案指向链接',
   // 项目开始时间，只填写年份
   startYear: '2017'
}