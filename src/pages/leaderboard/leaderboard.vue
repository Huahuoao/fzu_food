<template>
  <view class="leaderboard">
    <nut-tabs v-model="value" swipeable>
      <template #titles>
        <div class="mytab" style="display: flex;">
          <div class="nut-tabs__titles-item" v-for="item in list" @click="changelist(item)" :class="{ active: value == item.paneKey }"
            :key="item.paneKey" >
            <div :class="{ 'activeCss': value == item.paneKey }"><span class="nut-tabs__titles-item__text">{{ item.title
            }}</span></div>
          </div>
        </div>
      </template>
      <nut-tab-pane v-for="item in list" :pane-key="item.paneKey">
        <view class="top-three" style="display: flex; gap: 5vw;justify-content: center;">
          <view style="display: flex;flex-direction: column;">
            <image src="../../images/皇冠2.png" class="crown" />
            <image src="../../images/basidigua.png" class="top_img" />
            <text
              style="font-family: 'PingFang';font-size: 12px; font-weight: 700;text-align: center;margin-top: 1vw;">{{ renderlist[1].name }}</text>
            <text
              style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;text-align: center;margin-top: 1vw;">{{renderlist[1].num}}</text>
          </view>
          <view style="display: flex;flex-direction: column;position: relative; top: -5vw;">
            <image src="../../images/皇冠1.png" class="crown" />
            <image src="../../images/basidigua.png" class="top_img" style="width: 80px;height: 80px;" />
            <text
              style="font-family: 'PingFang';font-size: 12px; font-weight: 700;text-align: center;margin-top: 1vw;">{{ renderlist[0].name }}</text>
            <text
              style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;text-align: center;margin-top: 1vw;">{{renderlist[0].num}}</text>
          </view>
          <view style="display: flex;flex-direction: column;">
            <image src="../../images/皇冠3.png" class="crown" />
            <image src="../../images/basidigua.png" class="top_img" />
            <text
              style="font-family: 'PingFang';font-size: 12px; font-weight: 700;text-align: center;margin-top: 1vw;">{{ renderlist[2].name }}</text>
            <text
              style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;text-align: center;margin-top: 1vw;">{{renderlist[2].num}}</text>
          </view>
        </view>
        <view class="tab_pane">
          <view v-for="(item, index) in renderlist.slice(3,10)"  class="remainder" :key="item.id">
            
            <view style="display:flex;align-items: center;width: 150px;padding-left: 20px;">
              <text style="font-family: 'DM Sans';font-size: 16px; font-weight: 700;  color:#F6AC15;width: 20px;height: 21px;">{{
                item.id }}</text>
              <image src="../../images/basidigua.png" class="img" />
              <text
                style="font-family: 'PingFang';font-size: 12px; font-weight: 700; margin-left:20px;text-align: center;width: 48px;">{{
                  item.name }}</text>
            </view>
            <view style="display: flex;">
              <text style="font-family: 'PingFang';font-size: 12px; font-weight: 400;">{{ count }}</text>
              <text
                style="font-family: 'DM Sans';font-size: 12px; font-weight: 700; color:#F6AC15;margin-right: 25px;">{{ item.num }}</text>
            </view>
          
          </view>
        </view>

      </nut-tab-pane>
    </nut-tabs>
  </view>
</template>

<script setup>
import Taro, {useDidShow, useLoad} from "@tarojs/taro";
import { ref, render } from 'vue'
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
const count =ref('评论数')
const favouritelist = ref([
  {
    id: 1,
    name: '第一名',
    num:1000
  },
  {
    id: 2,
    name: '第二名',
    num:900
  },
  {
    id: 3,
    name: '第三名',
    num:800
  },
  {
    id: 4,
    name: '第四名',
    num:400
  },
  {
    id: 5,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 6,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 7,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 8,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 9,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 10,
    name: '拔丝地瓜',
    num:400
  },

]);
const hotlist = ref([
{
    id: 1,
    name: 'first',
    num:1000
  },
  {
    id: 2,
    name: 'second',
    num:900
  },
  {
    id: 3,
    name: 'three',
    num:800
  },
  {
    id: 4,
    name: 'four',
    num:400
  },
  {
    id: 5,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 6,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 7,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 8,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 9,
    name: '拔丝地瓜',
    num:400
  },
  {
    id: 10,
    name: '拔丝地瓜',
    num:400
  },
]);
const renderlist = ref([
  {
    id: 1,
    name: '',
    num:400
  },
  {
    id: 1,
    name: '',
    num:400
  },
  {
    id: 1,
    name: '',
    num:400
  },
]);
const changelist=(item)=>{
  value.value = item.paneKey
  if(item.title=='热度排行榜'){
    renderlist.value = hotlist.value
    count.value='评论数'
  }
  else{
    renderlist.value = favouritelist.value
    count.value='点赞数'
  }
};
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
  left: -5vw;
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
  background: radial-gradient(circle, rgba(246, 172, 21, 1), #fff9ee);
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


