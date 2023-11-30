<template>
  <view class="leaderboard"  >
    <view style="height: 15px;"></view>
    <nut-tabs v-model="value" swipeable @change="swipChange(value)">
      <template #titles>
        <div class="mytab" style="display: flex;">
          <div class="nut-tabs__titles-item" v-for="item in list"  @click="changelist(item)"  :class="{ active: value == item.paneKey }"
            :key="item.paneKey" >
            <div :class="{'activeCss':value == item.paneKey}"><span style="text-align: center;">{{ item.title
            }}</span></div>
          </div>
        </div>
      </template>
      <nut-tab-pane v-for="item in list" :pane-key="item.paneKey" >
        <view class="top-three" style="display: flex; gap: 5vw;justify-content: center;" >
          <view style="display: flex;flex-direction: column;">
            <image src="https://images.fzuhuahuo.cn/%E7%9A%87%E5%86%A02.png" class="crown" />
            <image :src="renderlist[1].url" class="top_img" />
            <text
              style="font-family: 'PingFang';font-size: 12px; font-weight: 700;text-align: center;margin-top: 1vw;margin-left:10px;">{{ renderlist[1].foodName }}</text>
            <text
              style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;text-align: center;margin-top: 1vw;margin-left:10px;">{{renderlist[1].value}}</text>
          </view>
          <view style="display: flex;flex-direction: column;position: relative; top: -5vw;">
            <image src="https://images.fzuhuahuo.cn/%E7%9A%87%E5%86%A01.png" class="crown" />
            <image :src="renderlist[0].url" class="top_img" style="width: 80px;height: 80px;" />
            <text
              style="font-family: 'PingFang';font-size: 12px; font-weight: 700;text-align: center;margin-top: 1vw;margin-left:10px;">{{ renderlist[0].foodName }}</text>
            <text
              style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;text-align: center;margin-top: 1vw;margin-left:10px;">{{renderlist[0].value}}</text>
          </view>
          <view style="display: flex;flex-direction: column;">
            <image src="https://images.fzuhuahuo.cn/%E7%9A%87%E5%86%A03.png" class="crown" />
            <image :src="renderlist[2].url" class="top_img" />
            <text
              style="font-family: 'PingFang';font-size: 12px; font-weight: 700;text-align: center;margin-top: 1vw;margin-left:10px;">{{ renderlist[2].foodName }}</text>
            <text
              style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;text-align: center;margin-top: 1vw;margin-left:10px;">{{renderlist[2].value}}</text>
          </view>
        </view>
        <view class="tab_pane">
          <view v-for="(item, index) in renderlist.slice(3,10)"  class="remainder" :key="item.id">

            <view style="display:flex;align-items: center;padding-left: 20px;">
              <text style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;  color:#F6AC15;width: 20px;height: 21px;">{{
                index+4 }}</text>
              <image :src="item.url" class="img" />
              <span
                style="font-family: 'PingFang';font-size: 12px; font-weight: 700; margin-left:20px;text-align: center;line-height: 16.8px;">{{
                  item.foodName }}</span>
            </view>
            <view style="display: flex;">
              <text style="font-family: 'PingFang';font-size: 12px; font-weight: 400;">{{ count }}</text>
              <text
                style="font-family: 'DM Sans';font-size: 12px; font-weight: 700; color:#F6AC15;margin-right: 25px;">{{ item.value }}</text>
            </view>
          </view>
        </view>
      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>

<script setup>
import Taro, {useDidShow, useLoad} from "@tarojs/taro";
import { reactive, ref, render,onMounted } from 'vue'
import { getRankListByHotValue,getRankListByLikeNum } from "../../request/new_api.js";
import './leaderboard.css'
const value = ref('c1');
const list = ref([
  {
    title: '热度排行榜',
    paneKey: 'c1'
  },
  {
    title: '喜爱排行榜',
    paneKey: 'c2'
  },
]);
const count =ref('热点值')
const favouritelist = ref([]);
const hotlist = ref([{url:''},{url:''},{url:''}]);
const renderlist = ref([{url:''},{url:''},{url:''}]);
const changelist=(item)=>{
  value.value = item.paneKey
  if(item.title=='热度排行榜'){
    renderlist.value = hotlist.value
    count.value='热点值'
  }
  else{
    renderlist.value = favouritelist.value
    count.value='点赞数'
  }
};
const swipChange=(item)=>
{
  
  if(item=='c1'){
    renderlist.value = hotlist.value
    count.value='热点值'
  }
  else{
    renderlist.value = favouritelist.value
    count.value='点赞数'
  }
}
const init = async () => {
  const hotlist_res = await getRankListByHotValue()
  const favouritelist_res = await getRankListByLikeNum()
  for(var i=0;i<hotlist_res.data.data.length;i++){
    if(hotlist_res.data.data[i].url==null){
      hotlist_res.data.data[i].url='https://images.fzuhuahuo.cn/QQ%E5%9B%BE%E7%89%8720231129233810.jpg'
    }
  }
  for(var i=0;i<favouritelist_res.data.data.length;i++){
    if(favouritelist_res.data.data[i].url==null){
      favouritelist_res.data.data[i].url='https://images.fzuhuahuo.cn/QQ%E5%9B%BE%E7%89%8720231129233810.jpg'
    }
  }
  hotlist.value = hotlist_res.data.data
  favouritelist.value = favouritelist_res.data.data
  renderlist.value= hotlist.value
}
onMounted(async () => {
  init()
})
useDidShow(() => {
  renderlist.value= hotlist.value
})
</script>
<style>
:root,
page {
  --nut-tabs-titles-background-color: transparent;
  --nut-tabs-horizontal-titles-height: 60px;
}

.activeCss {
  background-color: #FFC765;
  height: 48px;
  border-radius: 30px;
  width: 240px;
  transition: .2s;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}


.nut-tab-pane {
  padding: 0%;
  background-color: transparent;
  
}

/* .nut-tabs__titles-item__text{
  background-color: #FFF9EE;
} */
.nut-tabs__titles .nut-tabs__list {
  justify-content: center;
  margin-top: 10px;

}

.mytab {
  border-radius: 30px;
  height: 48px;
  width: 480px;
  margin: 0 auto;
  background-color: #FCE8C5;
}

.crown {
  position: relative;
  left: -4vw;
  top: 6vw;
  object-fit: cover;
  width: 12vw;
  height: 12vw;
  margin-left: 5px;
  z-index: 2;
}

.top_img {
  object-fit: cover;
  width: 140px;
  height: 140px;
  margin-left: 20px;
  border: 1px solid #FFF9EE;
  filter: drop-shadow(0px 4px 4px rgba(255, 249, 238, 0.6));
  border-radius: 10px;
  z-index: 1;
}

.top_three {
  margin: auto;
}

.img {
  object-fit: cover;
  width: 92px;
  height: 92px;
  margin-left: 20px;
  border-radius: 10px;
}

.remainder {

  height: 92px;
  padding-top: 40px;

  border-radius: 20px;
  font-family: 'PingFang';
  font-size: 14Px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tab_pane {
  left: 5vw;
  right: 5vw;
  width: 85vw;
  height: 73%;
  margin: 0 auto;
  margin-bottom: 5%;
  padding-top: 20px;
  padding-bottom: 60px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  margin-top: 20px;
}

.hotleaderboard {
  background-color: transparent;
}

.leaderboard {
  height: 100vh;
  background: linear-gradient(#FFF9EE, #FFF9EE, #FCE8C5, #FCE8C5, #FFF9EE, #FFF9EE);
}
</style>

/* Ellipse 26 */

position: absolute;
left: 0%;
right: 0%;
top: 26.72%;
bottom: 18.1%;

background: rgba(246, 172, 21, 0.8);
filter: blur(75px);


