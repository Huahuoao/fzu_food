export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/register/register',
    'pages/my/my'
  ],
  tabBar: {
    list: [{
      pagePath: 'pages/index/index',
      text: '首页',
      iconPath:"pages/images/index_tabbar_before.png", // 激活前的图片
      selectedIconPath:"pages/images/index_tabbar_before.png", // 激活后的图片
    }, {
      pagePath: 'pages/my/my',
      text: '个人',
      iconPath:"pages/images/my_tabbar_before.png",
      selectedIconPath:"pages/images/my_tabbar_before.png",

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
