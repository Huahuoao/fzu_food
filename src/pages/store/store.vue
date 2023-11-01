<template>
<!--  <view class="my_divider" v-for="(item,index) in list" :style="{left:(len) * (index+1) +'%'}"></view>-->
  <view class="store">
    <view class="search">
      <view class="search_line">
        <input v-model="searchdata" class="search_input" />
        <nut-divider direction="vertical" style="background-color: black;height: 70%;" />
        <IconFont name="search" size="20px" style="margin-right: 2.5vw;"></IconFont>
      </view>
    </view>

    <view class="store_list">
      <nut-tabs v-model="tabactive" @click="changeTab" color="black" background="#F6AC15" style="font-family: 'PingFang';
  font-size: 16Px;
  font-weight: bold;">
        <nut-tab-pane v-for="item in canteenlist" :pane-key="item.paneKey" :title=item.title  class="tab_pane" :key="item.paneKey">
          <view v-for="(item,index) in storelist" class="store_line" :key="item.id">
            <image src="https://images.fzuhuahuo.cn/mcdona.png" class="store_logo_img" />
            <view class="store_rate" @click="navitoStoreDetail()">
              <view style="margin-bottom: 20px;">{{ item.name }}</view>
              <view style="display: flex;">
                <nut-rate v-model="item.star" readnoly active-color="#F6AC15" size="13" class="rate_star" spacing="8" data-desc="this" />
                <text style="font-family: 'PingFang';font-size: 10px; margin-top: 0.5vh;">{{ item.star }}分</text>
              </view>
            </view>
            <view class="store_line_right">
              <view style="position: absolute;">
                <view class="heart1" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></view>
                <view class="heart_left" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></view>
                <view class="heart" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></view>
                <view class="heart_right" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></view>
              </view>
              <view class="store_type">
                {{ item.type }}
              </view>
            </view>
          </view>
        </nut-tab-pane>
      </nut-tabs>
    </view>
  </view>

</template>

<script setup>
import Taro from "@tarojs/taro";
import {  ref } from 'vue'
import './store.css'
import { IconFont } from '@nutui/icons-vue-taro';
var searchdata = ref()
var tabactive = ref(0)
const canteenlist = ref([
  {
    title: '食堂',
    paneKey: '0'
  },
  {
    title: '紫荆园',
    paneKey: '1'
  },
  {
    title: '玫瑰园',
    paneKey: '2'
  },
  {
    title: '京元餐厅',
    paneKey: '3'
  },
  {
    title: '芙蓉园',
    paneKey: '4'
  }
])
const storelist = ref([
  {
    id:1,
    name:'麦当劳',
    star:3,
    type:'西餐汉堡',
    logo:'/src/images/macdona.png',
    color:0,
    tap:false
  },
  {
    id:2,
    name:'麦当劳',
    star:5,
    type:'西餐汉堡',
    logo:'../../images/macdona.png',
    color:0,
    tap:false
  }
])
var len = 100/(storelist.value.length )
const changeTab = (tab) => {
  tabactive.value = tab.paneKey;
  console.log(len)
};
const changeColor = (index) =>{
  if(storelist.value[index].color == 0){
    storelist.value[index].color = 1
  }else{
    storelist.value[index].color =0
  }
  console.log(storelist.value[index].color)
  storelist.value[index].tap = !storelist.value[index].tap
  setTimeout(()=>{
  storelist.value[index].tap = !storelist.value[index].tap
  },100)
}
const navitoStoreDetail =()=>{
  Taro.navigateTo({
    url:'../storedetail/storedetail'
  })
}
</script>
<style>
.red{
  background-color: red;
}
.white{
  background-color: white;
}
.store{
  width: 100%;
  height: 100vh;
}
.search{
  height: 100%;
  background-color: #FFF9EE;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.search_line{
  width: 80%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 5%;
  box-shadow: 5px 5px 20px -5px rgba(0,0,0,0.5);
  background-color: #FFC765
}
.search_input{
  height: 100%;
  width: 80%;
  font-family: 'PingFang';
  font-size: 16Px;
}
.store_list{
  width: 100%;
  height: 90vh;
  background-color: #F6AC15;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
.tab_pane{
  width:100%;
  height: 90vh;
  background-color: #F6AC15;
  justify-content: center;
}
 .my_divider{
  z-index: 2;
  position: absolute;
  top: 140px;
  width :5px;
  height: 40px;
  background-color: black;

}
.store_line{
  width: 90vw;
  height: 13vh;
  background-color: #fce8c5;
  margin-bottom: 20px;
  border-radius: 20px;
  font-family: 'PingFang';
  font-size: 14Px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.store_logo_img{
  object-fit: cover;
  width:22vw;
  height: 22vw;
  margin-left: 5px;
}
.store_rate{
  width: 45vw;
  margin-left: 30px;
}
.rate_star{
  margin-top: 10px;
  width: 30vw;
}
.store_line_right{
  display: flex;
  width: 20vw;
  margin-bottom: 20px;
}
.heart {
  position:absolute;
  top: 10px;
  left: 80px;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
  border-bottom: 2px solid #F6AC15;
  border-left: 2px solid #F6AC15;
}
.heart1 {
  z-index: 5;
  position:absolute;
  top: 10px;
  left: 80px;
  width: 20px;
  height: 20px;
  transform: rotate(-45deg);
  border-bottom: 2px solid #F6AC15;
  border-left: 2px solid #F6AC15;
}
.heart_left {
  border: 2px solid #F6AC15;
  width: 20px;
  height: 20px;
  left: 70px;
  border-radius: 20px;
  transform: rotate(-45deg);
  position: absolute;
}
.heart_right {
  transform: rotate(-45deg);
  border: 2px solid #F6AC15;
  width: 20px;
  height: 20px;
  left: 88px;
  border-radius: 20px;
  position: absolute;
}
.store_type{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #595959;
  width: 20vw;
  height: 3vh;
  border-radius:20px;
  border: 2px solid #595959;
  margin-top: 75px;
  margin-right: 20px;
}
/* .heart::before{
  border-top: 5px solid black;
  border-bottom: 5px solid black;
  content: "";
  width: 200px;
  height: 200px;
  border-radius: 200px;
  position: absolute;
  top: -100px;
  left: 0;
}
.heart::after {
  border-right: 5px solid black;
  border-bottom: 5px solid black;
    content: "";
    width: 200px;
    height: 200px;
    border-radius: 200px;
    position: absolute;
    top: 0;
    left: 100px;
} */
</style>
