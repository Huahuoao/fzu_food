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
              style="border-radius: 50vw;width: 3rem;height: 3rem;margin: 20px; ">
      </button>
      <view @click="showLogin">
        <text>{{ nickName }}</text>
      </view>


    </view>

    <nut-popup :style="{borderTopLeftRadius:'25px',borderTopRightRadius:'25px'  }" position="bottom"
               v-model:visible="showBottom">
      <view style="display: flex;flex-direction: column;">
        <view style="margin:15px;display: flex;flex-direction: column; ">
          <text >知食分子 申请使用</text>
          <text class="my-ts-text">获取您的名称</text>
          <input type="nickname" :modle="nickName" style="margin-left:5px; "/>
          <nut-divider :style="{color: '#F1EBE1', padding: '0 0',margin: '0px'}"/>
          <text class="my-ts-text pop-title">获取您的微信头像</text>
          <view>
            <button open-type="chooseAvatar" @chooseAvatar="bind" plain="true"
                    :style="{ backgroundImage: `url(${bgImageUrl})`, borderRadius: '50%', width: '68px', height: '68px', margin: '0px 0px 0px 5px', backgroundPosition: 'center', backgroundSize: 'contain' }"
            >
            </button>

          </view>
          <nut-button type="success" class="normal-text" @click="handleAuth" style="margin-top: 20px;">确认授权并保存</nut-button>
        </view>
      </view>


    </nut-popup>
    <view style="display: flex;justify-content: space-around;margin-top: 5px;">
      <view class="my-button-all">
        <view class="my-button-item">
          <image src="../../images/my-like.svg" style="width: 23px;height: 30px;"></image>
        </view>
        <text>我的收藏</text>
      </view>
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
import Taro, {getUserProfile} from "@tarojs/taro";
import {useLoad} from "@tarojs/taro";
import {getUnionId, getUserByUnionId, register} from "../../request/api";
const headBase64 = ref()
const nickName = ref("点击登陆")
const code = ref()
const fileManager = Taro.getFileSystemManager()
const showBottom = ref(false)
const openid = ref()
const  bgImageUrl = ref("https://images.fzuhuahuo.cn/Snipaste_2023-10-29_17-59-00.png")
const handleAuth = async () => {
  await Taro.login().then(res => {
    code.value = res.code
  })
  console.log(code.value)
  //换取appid
  getUnionId(code.value).then(res => {
    openid.value = res.data.data.openid
    register({
      avatarBase64: headBase64.value,
      unionId: res.data.data.openid,
      username: nickName.value
    }).then(res => {
      getUserByUnionId(openid.value).then(res => {
        console.log(res)
      })
    })
  })

  //注册

}
const bind = (event) => {
  console.log(event.detail.avatarUrl)
  headBase64.value = fileManager.readFileSync(event.detail.avatarUrl, "base64")
  bgImageUrl.value = event.detail.avatarUrl
  console.log(headBase64.value)
}
const show = ref(false);
const showLogin = () => {
  showBottom.value = true;
}
useLoad(() => {

})


</script>
<style>
image{
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}
.my-button-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  background-color: white;
  border-radius: 20px;
}

.login-popup {
  height: 40%;

}

.my-button-all {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.my-icon {
  width: 80px;
  height: 80px;
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

.my-ts-text {
  margin: 10px;
}
</style>
