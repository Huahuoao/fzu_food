import { createApp } from 'vue'
import './app.css'
import Taro, {loadFontFace} from "@tarojs/taro";

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

  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})


export default App
