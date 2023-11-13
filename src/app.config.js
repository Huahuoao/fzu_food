export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my/my',
    'pages/leaderboard/leaderboard',
    'pages/randomselection/randomselection'
  ],
  subpackages: [
    {
      "root": "pagesA",
      "pages": [
        "store/store",
        "storedetail/storedetail",
        "dishdetail/dishdetail"
      ]
    }
  ],
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath:"images/s1.png", // 激活前的图片
      selectedIconPath:"images/s2.png", // 激活后的图片
    }, {
      pagePath: 'pages/my/my',
      text: '个人',
      iconPath:"images/m1.png",
      selectedIconPath:"images/m2.png",

    }],
    'color': '#000',
    'selectedColor': '#56abe4',
    'backgroundColor': '#FFF9EE',
    'borderStyle': 'white'
  },
  window: {
    handleWebviewPreload: "auto",
    disableScroll: true,
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFC765',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    initialRenderingCache: 'static',
    enablePullDownRefresh:true,
  }
})
