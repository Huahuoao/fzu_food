<template>
  <view class="index-app" style="display: flex;flex-direction: column;justify-content: center;">
    <view class="index-bg">
    <!--  <nut-button @click="handleRegister">跳转到注册</nut-button>-->
    <nut-row style="height: 60px;display: flex;align-items: center;margin-bottom: 10px;margin-top: 100px;">
      <nut-col :span="18">
        <view style="margin-left: 5vw;">
          <view v-if="isLogin">
          <text class="title-medium" style="margin-bottom: 5px;">Hi!{{ nickName }}</text>
          <text class="text-small">{{ br }}{{ title }}</text>
          </view>
          <view v-if="!isLogin">
            <text class="title-medium" style="margin-bottom: 5px;">未登录</text>
            <text class="text-small">{{ br }}请前往个人页面进行登录哦</text>
          </view>
        </view>
      </nut-col>
      <nut-col :span="6">
        <view >
          <image :src="headImg" style="    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.11);
width: 65px;height: 65px;border-radius: 50px;"> </image>
        </view>
      </nut-col>
    </nut-row>
    <view
      style=" display: flex;
      justify-content:center; align-item:center; flex-wrap: wrap;margin-bottom: 10px;margin-top: 0px;">
      <IndexBar background-url="https://images.fzuhuahuo.cn/home-bg.svg" icon-url="https://images.fzuhuahuo.cn/home-icon.svg" msg="校园食堂，美味尽享"
                title="商铺详情" @click="navitoStore"></IndexBar>
      <IndexBar
        background-url="https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Vector%20%281%29.svg"
        icon-url="https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Vector.svg"
        msg="校园美食，热门排行" title="排行榜" @click="navitoLeaderboard"></IndexBar>
      <IndexBar
        background-url="https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Auto%20stories.svg"
        icon-url="https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Vector%20%282%29.svg"
        msg="享受美味，记录瞬间" title="干饭日记" @click="navitoEatdiary"></IndexBar>
      <IndexBar icon-url="https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Sync.svg"
                background-url="https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Sync%20%281%29.svg"
                msg="摇出美食，惊喜上桌" title="随机摇菜" @click="navitoRandom"></IndexBar>

    </view>
    </view>
    <view>

      <view
        style="display: flex;width: 100%;justify-content: center;flex-grow: 1;flex-direction: column;align-items: center;">
        <view style="width: 90%;margin-bottom: 15px;">
          <text class="title-medium">推荐 </text>
          <text class="input-text">| 来看看今天都吃什么吧</text>
        </view>

        <nut-swiper :init-page="page" :pagination-visible="true" pagination-color="#426543" auto-play="3000"
                    style="width: 90%; border-radius: 15px;">
          <nut-swiper-item>
            <img src="https://images.fzuhuahuo.cn//1698725729118.jpeg?imageslim/zlevel/6"
                 alt=""/>
          </nut-swiper-item>
          <nut-swiper-item>
            <img src="https://images.fzuhuahuo.cn//1698727133477.jpeg?imageslim/zlevel/6"
                 alt=""/>
          </nut-swiper-item>
          <nut-swiper-item>
            <img src="https://images.fzuhuahuo.cn//1698726919664.jpeg?imageslim/zlevel/6"
                 alt=""/>
          </nut-swiper-item>
          <nut-swiper-item>
            <img src="https://images.fzuhuahuo.cn//1698727361927.jpeg?imageslim/zlevel/6"
                 alt=""/>
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import Taro, {useDidShow, useLoad} from "@tarojs/taro";
import {ref} from "vue";
import IndexBar from "../../component/IndexBar.vue"
const navitoStore = ()=>{
  Taro.navigateTo({
    url:'../../pagesA/store/store'
  })
}
const navitoRandom = ()=>{
  Taro.navigateTo({
    url:'../randomselection/randomselection'
  })
}
const navitoLeaderboard =()=>{
  Taro.navigateTo({
    url:'../leaderboard/leaderboard'
  })
}
const navitoEatdiary =()=>{
  Taro.navigateTo({
    url:'../../pagesB/eatdiary/eatdiary'
  })
}
const title = ref("这么晚了还没睡，有什么心事吗？")
const br = ref("\n")
const nickName = ref()
const headImg = ref()
const isLogin = ref(false)
useDidShow(() => {
  if(Taro.getStorageSync("isLogin") == true){
    isLogin.value = true
    nickName.value = Taro.getStorageSync("nickName")
    headImg.value = Taro.getStorageSync("headImg")
    console.log(headImg.value+'sssssssssss')
    console.log(nickName.value+'aaaaaaa')
    var data = new Date()
    var hour = data.getHours()
    if(hour>22||hour<6){
      title.value = "这么晚了还没睡，有什么心事吗？"
    }else if(hour>6&&hour<12){
      title.value = "早上好，今天早饭吃什么呢？"
    }else if(hour>12&&hour<14){
      title.value = "中午好，今天午饭吃什么呢？"
    }else if(hour>14&&hour<18){
      title.value = "下午好，今天下午茶吃什么呢？"
    }else if(hour>18&&hour<22){
      title.value = "晚上好，今天晚餐吃什么呢？"
    }
  }else {
    nickName.value = ""
    headImg.value = "https://images.fzuhuahuo.cn/default_headImg.jpeg"
  }
})
useLoad(() => {

})

</script>
<style>

.box {
  margin: 2vh 2vw;
  width: 40%;
  height: 40%;
  background-color: gray;
}

.nut-swiper-item {
  line-height: 500px;
}

.nut-swiper-item img {
  width: 100%;
  height: 100%;
}

.index-app {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(#FFC765,#FFF9EE,#FFF9EE,#FFF9EE,#FFF9EE,#FFF9EE,#FFF9EE);

}
</style>
