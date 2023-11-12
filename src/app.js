import { createApp } from 'vue'
import './app.css'
import Taro, {loadFontFace} from "@tarojs/taro";
import './icon/font/font_66cezw049xu/iconfont.css';
const App = createApp({
  onShow (options) {
    console.log('App onShow.')
    Taro.loadFontFace({
      global: true,
      family: 'PingFang',
      source:
        'url(https://images.fzuhuahuo.cn/%E8%8B%B9%E6%96%B9-%E7%AE%80.woff2)',
    }).then(res=>{
      console.log("载入字体成功")
    });
  },
  onPullDownRefresh:function(){
    this.onRefresh();
  },
  onRefresh:function(){
      //导航条加载动画
      wx.showNavigationBarLoading();
      setTimeout(function () {
        wx.hideNavigationBarLoading();
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }, 2000);
    },

  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})


export default App
