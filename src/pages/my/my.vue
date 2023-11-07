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
    <view style="margin-top: 80px; display: flex; flex-direction: column;">
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
          <view class="my-button-all" @click="handleMyLike">
            <view class="my-button-item">
              <view v-if="selectValue==1"
                    style="width: 20px;height: 18px;background-color: #f6ac15;position: absolute;right: 3px;bottom: 3px;border-radius: 50%;"></view>
              <image src="../../images/my-like.svg" class="my-item-icon"></image>
            </view>
            <text style="margin-top: 3px;" class="text-small">我的收藏</text>
          </view>
          <view class="my-button-all" @click="handleMyMsg">
            <view class="my-button-item">
              <view v-if="selectValue==2"
                    style="width: 20px;height: 18px;background-color: #f6ac15;position: absolute;right: 3px;bottom: 3px;border-radius: 50%;"></view>
              <image src="https://images.fzuhuahuo.cn/Input.png" style="object-fit: contain;"
                     class="my-item-icon"></image>
            </view>
            <text class="text-small" style="margin-top: 3px;">贡献信息</text>
          </view>
          <view class="my-button-all" @click="handleMyFocus">
            <view class="my-button-item">
              <view v-if="selectValue==3"
                    style="width: 20px;height: 18px;background-color: #f6ac15;position: absolute;right: 3px;bottom: 3px;border-radius: 50%;"></view>

              <image src="https://images.fzuhuahuo.cn/Vector.png" class="my-item-icon"></image>
            </view>
            <text class="text-small" style="margin-top: 3px;">店铺关注</text>
          </view>
          <view class="my-button-all" @click="handleAdmin">
            <view class="my-button-item">
              <view v-if="selectValue==4"
                    style="width: 20px;height: 18px;background-color: #f6ac15;position: absolute;right: 3px;bottom: 3px;border-radius: 50%;"></view>
              <image src="https://images.fzuhuahuo.cn/Vector (1).png" class="my-item-icon"></image>
            </view>
            <text class="text-small" style="margin-top: 3px;">联系管理</text>
          </view>
        </view>
      </view>

    </view>
    <view class="my-bottom" style="display: flex;justify-content: center;">
<!--      我的收藏-->
      <view   v-if="selectValue==1"   style="display:flex; width: 90%;height: 90%;background-color:
rgba(255, 255, 255, 0.6);border-radius: 15px;margin-top: 20px; align-items: center;justify-content: center;position: relative;">
        <image src="https://images.fzuhuahuo.cn/Vector (2).png"
               style="right: 0px;top: 0px;position: absolute;width: 28px;height: 28px; margin: 5px;"></image>
        <view style="height: 95%;width: 95%;display: flex;position: relative;flex-direction: column;">
          <view style="margin-left: 5px;">
            <text class="label">|</text>
            <text class="text-small" style="margin-left: 5px;margin-bottom: 10px;"> 默认收藏夹</text>
          </view>
          <view style="justify-content: center;align-items: center;">
            <view style="display: flex;flex-direction: column;justify-content: center;margin: 10px; width: 65px;align-items: center;">
              <image src="https://images.fzuhuahuo.cn/20231102002910.png"
                     style="width: 65px;height: 65px;object-fit: contain; border-radius: 10px;">
              </image>
              <text class="icon-name" style="margin-top: 3px;">
                拔丝地瓜
              </text>
            </view>
          </view>
        </view>
      </view>
<!--      贡献信息-->
      <view   v-if="selectValue==2"   style="display:flex; width: 90%;height: 90%;background-color:
rgba(255, 255, 255, 0.6);border-radius: 15px;margin-top: 20px; align-items: center;justify-content: center;position: relative;">
        <view class="my-top-select" >
         <view @click="contributeFood" class="my-select-left" :style="{ backgroundColor: bgColorLeft }" ><text class="input-text">贡献餐品</text></view>
          <view  @click="contributeShop" class="my-select-right" :style="{ backgroundColor: bgColorRight }"><text class="input-text">贡献店铺</text></view>

        </view>


        <view class="con-main" style="width: 100%;height: 100%;margin-top: 36%;display: flex;flex-direction: column;margin-left: 5%;margin-right: 5%;">

          <view>
            <text class="text-small">1.请上传店铺封面：</text>
            <nut-divider :style="{ color: '#A1A1A140'}" ></nut-divider>
          </view>
          <view>   <text  class="text-small">2.请上传店铺名字：</text>            <nut-divider :style="{ color: '#A1A1A140'}"></nut-divider>
          </view>
          <view>  <text  class="text-small">3.请选择店铺的位置：</text>            <nut-divider :style="{ color: '#A1A1A140'}"></nut-divider>
          </view>
          <view><text  class="text-small">4.请选择店铺的标签：</text></view>




        </view>


      </view>

<!--      店铺关注-->
      <view   v-if="selectValue==3"   style="display:flex; width: 90%;height: 90%;background-color:
rgba(255, 255, 255, 0.6);border-radius: 15px;margin-top: 20px; align-items: center;justify-content: center;position: relative;">
      </view>
<!--      联系管理-->
      <view   v-if="selectValue==4"   style="display:flex; width: 90%;height: 90%;background-color:
rgba(255, 255, 255, 0.6);border-radius: 15px;margin-top: 20px; align-items: center;justify-content: center;position: relative;">
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

const selectValue = ref(1)
const value = ref('0');
const nickNameInput = ref()
const headBase64 = ref()
const nickName = ref("点击登录")
const code = ref()
const fileManager = Taro.getFileSystemManager()
const showBottom = ref(false)
const openid = ref()
const bgImageUrl = ref("https://images.fzuhuahuo.cn/Snipaste_2023-10-29_17-59-00.png")
const headImg = ref()
const isLogin = ref()
const translateX = ref(0)
const bgColorLeft = ref("#FFC765")
const bgColorRight = ref('white')
const myContributeType = ref(1)
const contributeFood = ()=> {
  bgColorLeft.value = "#FFC765"
  bgColorRight.value = "white"
  myContributeType.value = 1;
}
const contributeShop = ()=> {
  bgColorRight.value = "#FFC765"
  bgColorLeft.value = "white"
  myContributeType.value = 2;

}
//我的收藏
const handleMyLike = () => {
  selectValue.value = 1;
}
//贡献信息
const handleMyMsg = () => {
  selectValue.value = 2;
}
//店铺关注
const handleMyFocus = () => {
  selectValue.value = 3;
}
//联系管理

const handleAdmin = () => {
  selectValue.value = 4;
}

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
  if (!isLogin.value) {
    showBottom.value = true;
  }
}


useLoad(() => {
  if (Taro.getStorageSync("isLogin")) {
    isLogin.value = true
    nickName.value = Taro.getStorageSync("nickName")
    headImg.value = Taro.getStorageSync("headImg")
  } else {
    nickName.value = ""
    headImg.value = "https://images.fzuhuahuo.cn/default_headImg.jpeg"
  }


})


</script>
<style>
.my-top-select{
  position: absolute;
  box-shadow: 5px 5px 5px rgba(220, 38, 38, 0.3);
  display: flex;
  width: 150Px;
  height: 22Px;
  border-radius: 11Px;
  background-color: white;
  left: 20Px;
  top: 20Px;
}
.my-select-left{
  display: flex;
  justify-content: center;
  width: 120Px;
  height: 22Px;
  border-radius: 11Px;

}
.my-select-right{
  display: flex;
  justify-content: center;
  width: 120Px;
  height: 22Px;
  border-radius: 11Px;
}
image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.my-item-icon {
  object-fit: contain;
  width: 60%;
  height: 60%;
  z-index: 100;
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
  position: relative;
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
}

.my-ts-text {
  margin: 10px;
}
</style>
