<template>
  <!--  <nut-row>-->
  <!--    <button open-type="chooseAvatar" @chooseAvatar="bind"-->
  <!--            style="border-radius: 50vw;width: 8rem;height: 8rem;"></button>-->
  <!--  </nut-row>-->
  <!--  <nut-row>-->
  <!--    <input type="nickname"/>-->
  <!--  </nut-row>-->
  <!--  <nut-row type="flex" justify="center">-->
  <!--    <nut-button>注册</nut-button>-->
  <!--  </nut-row>-->
  <view class="my-app">
    <view style="display: flex;align-items: center;">
      <button open-type="chooseAvatar" @chooseAvatar="bind"
              style="border-radius: 50vw;width: 3rem;height: 3rem;margin: 20px;">
      </button>
      <text>点击登陆</text>
    </view>
    <view style="display: flex;justify-content: space-around;margin-top: 5px;">
      <view class="my-button-item"></view>
      <view class="my-button-item"></view>
      <view class="my-button-item"></view>
      <view class="my-button-item"></view>
    </view>
    <view class="my-bottom">
    </view>

  </view>
</template>

<script setup>
import {ref} from 'vue'
import './my.css'
import Taro from "@tarojs/taro";
import {useLoad} from "@tarojs/taro";

const code = ref()
const fileManager = Taro.getFileSystemManager()

const login = () => {
  Taro.login().then(res => {
    code.value = res.code
    console.log(code.value)
  })
}
// useLoad(() => {
//   Taro.hideTabBar()
// })
const bind = (event) => {
  console.log(event.detail.avatarUrl)
  const headImgBase64 = fileManager.readFileSync(event.detail.avatarUrl, "base64")
}
</script>
<style>
.my-button-item {
  width: 2.8em;
  height: 2.8em;
  background-color: blue;
}

.my-app {
  background: linear-gradient(#FFF9EE, #FFc765, #FFF9EE);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.my-bottom {
  flex-grow: 1;
  background: url("../../images/my-bg.svg") no-repeat center;
}
</style>

