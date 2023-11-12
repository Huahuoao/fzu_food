<template>
  <div class="my_divider"   v-for="(item,index) in canteenlist" :style="{left:(len) * (index+1) +'%'}"></div>
    <div class="store">
      <div class="search">
          <div class="search_line">
            <input v-model="searchdata" class="search_input">
            <nut-divider direction="vertical"  style="background-color: black;height: 70%;"/>
            <image src="../../images/search.svg" style="object-fit: cover;width: 35px;margin-right: 8px;margin-top: 8px;"></image>
          </div>
        </div>
        
        <div class="store_list">
          <nut-tabs v-model="tabactive" @click="changeTab" color="black" background="#FFC765" style="font-family: 'PingFang';
  font-size: 16Px;
  font-weight: bold;" size="large">
          <nut-tab-pane v-for="item in canteenlist" :pane-key="item.paneKey" :title=item.title class="tab_pane"> 
            <div v-for="(item,index) in storelist" class="store_line" >
              <image src="https://images.fzuhuahuo.cn/mcdona.png" class="store_logo_img" />
              <div class="store_rate" @click="navitoStoreDetail()">
                <div style="margin-bottom: 20px;">{{ item.name }}</div>
                <div style="display: flex;">
                  <nut-rate v-model="item.star" readnoly active-color="#F6AC15" size="13" class="rate_star" spacing="8" style="width: 103px;"/>
                  <span style="font-family: 'PingFang';font-size: 10px; margin-top: 0.5vh;">{{ item.star }}分</span>
                </div>
              </div>
              <div class="store_line_right">
                
                <div style="position: absolute;">
                  <div class="heart1" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></div>
                  <div class="heart_left" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></div>
                  <div class="heart" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></div>
                  <div class="heart_right" :class="{red:item.color==1,white:item.color==0}" @click="changeColor(index)"></div>
              </div>
            <div class="store_type">
              {{ item.type }}
            </div>
              </div>
            </div>
          </nut-tab-pane>
          </nut-tabs> 
        </div>
    </div>
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
    type:'西餐堡',
    logo:'https://images.fzuhuahuo.cn/mcdona.png',
    color:0,
    tap:false
  },
  {
    id:2,
    name:'麦当劳',
    star:5,
    type:'西餐',
    logo:'https://images.fzuhuahuo.cn/mcdona.png',
    color:0,
    tap:false
  },
  {
    id:2,
    name:'麦当劳',
    star:5,
    type:'西餐汉堡',
    logo:'https://images.fzuhuahuo.cn/mcdona.png',
    color:0,
    tap:false
  },
  {
    id:2,
    name:'麦当劳',
    star:5,
    type:'西餐汉堡',
    logo:'https://images.fzuhuahuo.cn/mcdona.png',
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
var len = 100/(canteenlist.value.length )
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
  border-radius: 15px;
  box-shadow: inset 5px 5px 20px -13px rgba(0,0,0,0.5);
  background-color: #FCE8C5
}
.search_input{
  height: 100%;
  width: 80%;
  font-family: 'PingFang';
  font-size: 16Px;
}
.store_list{
  width: 100%;
  height: 80vh;
  background: linear-gradient(#FFC765,#FDDDA3);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
.tab_pane{
  width:100%;
  height: 88vh;
  background: linear-gradient(#FFC765,#FDDDA3);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* align-content:flex-start  */
}
 .my_divider{
  z-index: 2;
  position: absolute;
  top: 130px;
  width :5px;
  height: 40px;
  background-color: black;

}
.store_line{
  width: 640px;
  height: 164px;
  background-color: #FFF9EE;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 5px 5px 20px -13px rgba(0,0,0,0.5);
  margin-bottom: -15px;
}
.store_logo_img{
  object-fit: cover;
  width:140px;
  height: 126px;
  margin-left: 14px;
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
  width: 25vw;
  margin-bottom: 20px;
}
.heart {
  position:absolute;
  top: 30px;
  left: 120px;
  width: 16px;
  height: 16px;
  transform: rotate(-45deg);
  border-bottom: 4px solid #F6AC15;
  border-left: 4px solid #F6AC15;
}
.heart1 {
  z-index: 5;
  position:absolute;
  top: 30px;
  left: 120px;
  width: 16px;
  height: 16px;
  transform: rotate(-45deg);
  border-bottom: 4px solid #F6AC15;
  border-left: 4px solid #F6AC15;
}
.heart_left {
  border: 4px solid #F6AC15;
  width: 16px;
  height: 16px;
  left: 113px;
  border-radius: 20px;
  transform: rotate(-45deg);
  position: absolute;
  top: 22px;
}
.heart_right {
  transform: rotate(-45deg);
  border: 4px solid #F6AC15;
  width: 16px;
  height: 16px;
  left: 124px;
  border-radius: 20px;
  position: absolute;
  top: 22px;
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
  margin-top: 86px;
  margin-right: 20px;
  font-family: 'PingFang';
  font-size: 16Px;
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
