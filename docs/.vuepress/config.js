const themeConfig = require('./config/theme/')

module.exports = {
  title: "王负剑的博客",
  description: '不要在该奋斗的年纪选择安逸，在这记录了我成长的脚步',
  base:'/docs/',
  dest: 'public',
  head: [
    ['link', {
      rel: 'icon',
      href: '/4.jpg'
    }],
    ['meta', {
      name: 'viewport',
      content: 'width=device-width,initial-scale=1,user-scalable=no'
    }]
  ],
  theme: 'reco',
  themeConfig,
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom', 'flowchart',[
    "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    {
      theme: ["shizuku"],
      clean: true,
      modelStyle: {
        position: "fixed",
        left: "0px",
        bottom: "0px",
        opacity: "0.9",
        zIndex: 99999
      }
    }
  ]]
}  