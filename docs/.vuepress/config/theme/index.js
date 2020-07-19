const themeReco = require('./themeReco.js')
const nav = require('./nav.js')
const sidebar = require('./sidebar.js')

module.exports = Object.assign({}, themeReco, {
  // 首页相关配置部分在 /README.md 文件中
  type: 'blog',
  nav,
  sidebar,
  logo: '/4.jpg',
  authorAvatar: '/4.jpg', // 设置博客头像
  // 搜索设置
  search: true,
  searchMaxSuggestions: 10,
  // 自动形成侧边导航
  sidebar: 'auto',
  sidebarDepth: 2
  // 配置评论功能
})