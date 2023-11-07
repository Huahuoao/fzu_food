export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/register/register',
    'pages/my/my',
    'pages/store/store',
    'pages/storedetail/storedetail',
    'pages/dishdetail/dishdetail',
    'pages/leaderboard/leaderboard'
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
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#FFC765',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    initialRenderingCache: 'static'
  }
})
