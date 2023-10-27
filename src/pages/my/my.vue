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

<view @click="showLogin"><text>{{nickName}}</text></view>


    </view>
    <nut-popup :style="{borderTopLeftRadius:'25px',borderTopRightRadius:'25px'  }" position="bottom"  v-model:visible="showBottom">
      <view style="display: flex;flex-direction: column;">
        <view style="margin:15px;display: flex;flex-direction: column;">
        <text>知食分子 申请使用</text>
        <text>获取您的手机号码</text>
        <nut-input>输入手机号码</nut-input>
        <text>获取您的名称</text>
        <nut-input>输入昵称</nut-input>
        <text>获取您的微信头像</text>
        <button open-type="chooseAvatar" @chooseAvatar="bind"
                style="border-radius: 50vw;width: 3rem;height: 3rem;margin: 20px;">
        </button>
        <nut-button>确认授权并保存</nut-button>
      </view>
      </view>


    </nut-popup>    <view style="display: flex;justify-content: space-around;margin-top: 5px;">
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
const nickName = ref("点击登陆")
const code = ref()
const fileManager = Taro.getFileSystemManager()
const showBottom = ref(false)
const login = () => {
  Taro.login().then(res => {
    code.value = res.code
    console.log(code.value)
  })
}
const show = ref(false);
const showLogin=()=>{
  console.log("login")
  showBottom.value = true;
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
.login-popup{
  height: 40%;

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

