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
    <view style="margin-top: 80px;;">
      <view style="display: flex;align-items: center; margin-left: 30px;margin-bottom: 20px;">
        <view>
          <image
            :src="headImg"
            style="width: 65px;height: 65px;border-radius: 50px;  box-shadow: 2px 2px 2px rgba(220,38,38,0.3);"></image>
        </view>
        <view @click="showLogin">
          <text class="title-medium" style="margin-left: 10px;">{{ nickName == "" ? '点击登录' : nickName }}</text>
        </view>


      </view>

      <nut-popup :style="{borderTopLeftRadius:'25px',borderTopRightRadius:'25px', backgroundColor: '#FFF9EE' }"
                 position="bottom"
                 v-model:visible="showBottom">
        <view style="display: flex;flex-direction: column;">
          <view style="margin:15px;display: flex;flex-direction: column; ">
            <text class="text-small" style="margin-bottom: 10px;">知食分子 申请使用</text>
            <view style="margin-bottom: 10px;">
              <text class="label" style="margin-bottom: 5px;">获取您的名称</text>
              <input type="nickname" style="margin-left:5px;" v-model="nickNameInput"/>
              <nut-divider
                :style="{color: '#F1EBE1', padding: '0 0',margin: '0px', marginBottom: '5px', marginTop: '5px'}"/>
              <text class="label" style="margin-bottom: 10px;">获取您的微信头像</text>
              <view>
                <button open-type="chooseAvatar" @chooseAvatar="bind" plain="true"
                        :style="{ backgroundImage: `url(${bgImageUrl})`, borderRadius: '50%', width: '60px', height: '60px', margin: '10px 0px 0px 5px', backgroundPosition: 'center', backgroundSize: 'contain' }"
                >
                </button>
              </view>
            </view>
            <nut-button type="success" class="normal-text" @click="handleAuth" style="margin-top: 0px;">
              确认授权并保存
            </nut-button>
          </view>

        </view>

      </nut-popup>
      <view style="display: flex;justify-content: center;align-items: center;width: 100vw;">
        <view style="display: flex;justify-content: space-around;margin-top: 5px;width: 95%;">
          <view class="my-button-all">
            <view class="my-button-item">
              <image src="https://images.fzuhuahuo.cn/my-like.svg" style="width: 23px;height: 30px;"></image>
            </view>
            <text style="margin-top: 3px;" class="text-small">我的收藏</text>
          </view>
          <view class="my-button-all">
            <view class="my-button-item">
              <image src="https://images.fzuhuahuo.cn/my-like.svg" style="width: 23px;height: 30px;"></image>
            </view>
            <text class="text-small" style="margin-top: 3px;">贡献信息</text>
          </view>
          <view class="my-button-all">
            <view class="my-button-item">
              <image src="https://images.fzuhuahuo.cn/my-like.svg" style="width: 23px;height: 30px;"></image>
            </view>
            <text class="text-small" style="margin-top: 3px;">店铺关注</text>
          </view>
          <view class="my-button-all">
            <view class="my-button-item">
              <image src="https://images.fzuhuahuo.cn/my-like.svg" style="width: 23px;height: 30px;"></image>
            </view>
            <text class="text-small" style="margin-top: 3px;">联系管理</text>
          </view>
        </view>
      </view>
      <view class="my-bottom">
      </view>
    </view>
  </view>

</template>

<script setup>
import {ref} from 'vue'
import './my.css'
import Taro, {getUserProfile, useDidShow} from "@tarojs/taro";
import {useLoad} from "@tarojs/taro";
import {getUnionId, getUserByUnionId, register} from "../../request/api";
const nickNameInput = ref()
const headBase64 = ref()
const nickName = ref("点击登录")
const code = ref()
const fileManager = Taro.getFileSystemManager()
const showBottom = ref(false)
const openid = ref()
const bgImageUrl = ref("https://images.fzuhuahuo.cn/Snipaste_2023-10-29_17-59-00.png")
const headImg = ref()
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
      username: nickNameInput.value
    }).then(res => {
      getUserByUnionId(openid.value).then(res => {
        headImg.value = res.data.data.avatarUrl
        showBottom.value = false;
        nickName.value = res.data.data.username
        Taro.showToast({
          title: "登录成功",
        })
        Taro.setStorageSync("isLogin", true)
        Taro.setStorageSync("headImg", headImg.value)
        Taro.setStorageSync("nickName", nickNameInput.value)
      })
    })
  })

  //注册

}
const bind = (event) => {
  console.log(event.detail.avatarUrl)
  headBase64.value = fileManager.readFileSync(event.detail.avatarUrl, "base64")
  bgImageUrl.value = 'data:image/png;base64,' + headBase64.value
  console.log(bgImageUrl)
}
const show = ref(false);
const showLogin = () => {
  showBottom.value = true;
}


useLoad(() => {
  if (Taro.getStorageSync("isLogin")) {
    nickName.value = Taro.getStorageSync("nickName")
    headImg.value = Taro.getStorageSync("headImg")
  } else {
    nickName.value = ""
    headImg.value = "https://images.fzuhuahuo.cn/default_headImg.jpeg"
  }


})


</script>
<style>
image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.my-button-item {
  box-shadow: 5px 5px 5px rgba(220, 38, 38, 0.3);
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
  margin: 5px;
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
  background: linear-gradient(#FFF9EE, #FFF9EE, #FCE8C5, #FCE8C5, #FFF9EE, #FFF9EE);
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.my-bottom {
  flex-grow: 1;
  background: url("https://images.fzuhuahuo.cn/my-bg.svg") no-repeat center;
}

.my-ts-text {
  margin: 10px;
}
</style>
