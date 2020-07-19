module.exports = [
  {
    text: "首页",
    link: "/",
    icon: "reco-home",
  },
  {
    text: "时间线",
    link: "/timeline/",
    icon: "reco-date",
  },
  {
    text: "文章列表",
    icon: "reco-coding",
    ariaLabel: "Language Menu",
    items: [
      {
        text: "前端",
        link: "/articles/frontend/",
        items: [
          { text: "HTML", link: "/articles/frontend/html" },
          { text: "CSS", link: "/articles/frontend/css" },
          { text: "JavaScript", link: "/articles/frontend/javascript" },
        ],
      },
      {
        text: "后端",
        link: "/articles/backend/",
        items: [
          { text: "nodeJS", link: "/articles/backend/nodejs" },
          { text: "CSS", link: "/articles/backend/css" },
          { text: "JavaScript", link: "/articles/backend/javascript" },
        ],
      },
      {
        text: "WEB",
        link: "/articles/webwork/",
        items: [
          { text: "HTML", link: "/articles/webwork/html" },
          { text: "CSS", link: "/articles/webwork/css" },
          { text: "JavaScript", link: "/articles/webwork/javascript" },
        ],
      },
      {
        text: "框架",
        link: "/articles/framework/",
        items: [
          { text: "Vue", link: "/articles/framework/vue" },
          { text: "React", link: "/articles/framework/react" },
          { text: "Element", link: "/articles/framework/element" },
        ],
      },{
        text: "学习",
        link: "/articles/study/",
      }
    ],
  },
];
