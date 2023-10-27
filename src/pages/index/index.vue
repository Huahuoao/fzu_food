<template>
  <view class="index-app">
    <!--  <nut-button @click="handleRegister">跳转到注册</nut-button>-->
    <nut-row style="height: 60px;display: flex;align-items: center;margin: 2vw;">
      <nut-col :span="18">
        <view style="margin-left: 5vw;">
          <text> Hi,同学{{ br }}这么晚了，有什么心事吗？</text>
        </view>
      </nut-col>
      <nut-col :span="6">
        <view style="width: 56px;height: 56px;border-radius: 50px;background-color: aliceblue;"></view>
      </nut-col>

    </nut-row>
    <view
      style=" display: flex;flex-wrap: wrap; justify-content: center; align-items: center;margin-bottom: 30px;margin-top: 30px;">
      <IndexBar background-url="../../images/home-bg.svg" icon-url="../../images/home-icon.svg" msg="校园食堂，美味尽享" title="商铺详情"></IndexBar>
      <IndexBar background-url="" icon-url="" msg="" title=""></IndexBar>
      <IndexBar background-url="" icon-url="" msg="" title=""></IndexBar>
      <IndexBar background-url="" icon-url="" msg="" title=""></IndexBar>
    </view>

    <view>
      <view style="display: flex;width: 100%;justify-content: center;flex-grow: 1;">
        <nut-swiper :init-page="page" :pagination-visible="true" pagination-color="#426543" auto-play="3000"
                    style="width: 90%; border-radius: 15px;box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), 4px 0px 6px rgba(0, 0, 0, 0.1);">
          <nut-swiper-item>
            <img src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg" alt=""/>
          </nut-swiper-item>
          <nut-swiper-item>
            <img src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg" alt=""/>
          </nut-swiper-item>
          <nut-swiper-item>
            <img src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg" alt=""/>
          </nut-swiper-item>
          <nut-swiper-item>
            <img src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg" alt=""/>
          </nut-swiper-item>
        </nut-swiper>
      </view>
    </view>
  </view>
</template>

<script setup>
import Taro from "@tarojs/taro";
import {ref} from "vue";
import IndexBar from "../index/../../component/IndexBar.vue"
import "../../images/home-bg.svg"
const br = ref("\n")
const handleRegister = () => {
  Taro.navigateTo({
    url: '/pages/register/register',
  })
}
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
  background-color: #FFF9EE;

}
</style>
