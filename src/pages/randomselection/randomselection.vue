<template>
  <view class="randomselection">
    <nut-popup  v-model:visible="popupresult" pop-class="dialog" close-icon-position="top-right" closeable="true">
      <view class="dialog_in">
        <image :src="choosefinal.imgUrl" class="dialog_img"/>
        <view class="dialog_content">
          <view style="font-family: PingFang;font-size: 22Px;font-weight: 600;color: black;">{{ choosefinal.data.foodName }}</view>
          <!-- <view class="input-text" style="margin-top: 5px;">商铺: &nbsp;{{ choosefinal.storename }}</view>
          <view class="input-text" style="margin-top: 5px;">餐厅: &nbsp;{{ choosefinal.dinneroom }}</view>
          <view class="input-text" style="margin-top: 5px;">品类: &nbsp;{{ choosefinal.typetag }}</view>
          <view class="input-text" style="margin-top: 5px;">口味: &nbsp;{{ choosefinal.tastytag }}</view> -->
          <view class="input-text" style="margin-top: 5px;">价格: &nbsp;{{ choosefinal.data.price }}</view>
          <view class="input-text" style="margin-top: 5px;">口味: &nbsp;{{ choosefinal.data.intro }}</view>
        </view>
        <view class="dialog_btn">
          <nut-button color="#FFC765" >
            <view class="dialog_btns" @click="decideChoose()">就决定是你了!</view>
          </nut-button>
          <nut-button color="#FFC765" @click="chooseAgain()">
            <view class="dialog_btns">不喜欢，换一个!</view>
          </nut-button>
        </view>
      </view>
    </nut-popup>
    <view class="random_word">
      <image src="https://images.fzuhuahuo.cn/random.png" class="random_img"/>
    </view>
    <view class="main_tain">
      <view @click="turnTables" class="pole_img">
        <image src="https://images.fzuhuahuo.cn/Line.png"  class="line_img"/>
        <image src="https://images.fzuhuahuo.cn/click_pull_c.png"  class="round_img" />
      </view>
      <image src="https://images.fzuhuahuo.cn/turntable_c.png" class="turntable_img" :class="{rotate360:turnflag==1}"/>
      <image src="https://images.fzuhuahuo.cn/pointer.png" class="pointer_img"/>
      <view class="choose_list">
        <view class="choose_type">
              <view class="menu-container">
                <IconFont name="arrow-up" style="width: 50px;margin-top: 10px;"></IconFont>
              <view class="dropdown">
                <view @click="chooseRoom(item)" v-for="(item,index) in chooselist.dinneroom">{{ item.canteenName }}</view>
              </view>
          </view> 
            <view style="height: 60px;display: flex;align-items: center;">{{ choose.dinneroom.canteenName }}</view>
            <view class="choose_name">
              餐厅
            </view>
        </view>
        <view class="choose_type">
          <view class="menu-container">
                <IconFont name="arrow-up" style="width: 50px;margin-top: 10px;"></IconFont>
              <view class="dropdown">
                  <view @click="chooseType(item)" v-for="(item,index) in chooselist.type">{{ item.tagName }}</view>
              </view>
          </view> 
            <view style="height: 60px;display: flex;align-items: center;">{{ choose.type.tagName}}</view>
            <view class="choose_name">
              品种
            </view>
        </view>
        <view class="choose_type">
          <view class="menu-container">
                <IconFont name="arrow-up" style="width: 50px;margin-top: 10px;"></IconFont>
              <view class="dropdown">
                  <view @click="chooseTasty(item)" v-for="(item,index) in chooselist.tasty">{{ item.tagName }}</view>
              </view>
          </view> 
            <view style="height: 60px;display: flex;align-items: center;">{{ choose.tasty.tagName }}</view>
            <view class="choose_name">
              口味
            </view>
        </view>
      </view>
    </view>
  </view>
  
</template>

<script setup>
import { ref,reactive, onMounted } from 'vue'
import './randomselection.css'
import { IconFont } from '@nutui/icons-vue-taro';
import { getFoodTagbyID, getFoodTagbyType } from '../../request/tagapi';
import { getCanteenList, getStoreList } from '../../request/new_api';
import {postRandom} from '../../request/random_api'
var choosefinal = reactive({
  data:{}
})
const foodlist = reactive({
  data:[]
})
const popupresult = ref(false); // 显示转盘结果
const choose = reactive({ //选择的范围
  dinneroom:{
      "id": 0,
      "canteenName": "全部",
    },
  type:{
      "id": 0,
      "tagName": "全部",
      "tagType": 1
    },
  tasty:{
      "id": 0,
      "tagName": "全部",
      "tagType": 1
    }
})
const chooselist = reactive({
  dinneroom:[],
  type:[],
  tasty:[]
})
onMounted(async()=>{
  const tagtasty_res = await getFoodTagbyType({"tagType":1})
  chooselist.tasty = tagtasty_res.data.data
  chooselist.tasty.push({
      "id": 0,
      "tagName": "全部",
      "tagType": 1
    })
  const tagtype_res = await getFoodTagbyType({"tagType":0})
  chooselist.type = tagtype_res.data.data
  chooselist.tasty.push({
      "id": 0,
      "tagName": "全部",
      "tagType": 1
    })
  const tagcanteen_res = await getCanteenList({"page":0,"size":50})
  chooselist.dinneroom = tagcanteen_res.data.data
})
const turnflag = ref(0) // 控制转盘旋转
const ppflag = ref(0)
const turnTables = (res) =>{ // 旋转转盘
    turnflag.value = 1
    setTimeout(async()=>{
      turnflag.value = 0
      popupresult.value = true
      var postlist = []
      if(choose.type.id != 0){
        postlist.push(choose.type.id)
      }
      if(choose.tasty.id != 0){
        postlist.push(choose.tasty.id)
      }
      const food_res = await postRandom(postlist)
      choosefinal.data = food_res.data.data
      if(choosefinal.data.intro == ''){
        choosefinal.data.intro = '暂无'
      }
      if(choosefinal.data.imgUrlList.length == 0){
        choosefinal.data.imgUrlList.push('https://images.fzuhuahuo.cn/QQ%E5%9B%BE%E7%89%8720231129233810.jpg')
      }
      console.log(choosefinal.data)

    },5000 )

}
const chooseRoom = function(e){
  choose.dinneroom = e
}
const chooseType = function(e){
  choose.type = e
}
const chooseTasty = function(e){
  choose.tasty = e
}
const chooseAgain = ()=>{
  popupresult.value=false
  turnTables()

}
const decideChoose = ()=>{
  popupresult.value=false
}
</script>
<style lang="scss">
// #box{width:200px; height:50px; overflow:hidden; cursor: pointer; transition: all 0.35s;}
// #box:hover{height:250px;}
// #box ul{list-style:none; margin:0; padding:0;}
// #box ul li{width:198px; height:48px; line-height: 50px; text-align: center; border:1px red solid; background:#000000; color:white;}
  //   .pp{
  //     animation: ss 0.5 ease-out;
  //   }
  // @keyframes ss {
  //   0%{
  //     opacity: 0;
  //   }
  //   100% {
  //     opacity: 1;
  //   }
  // }
.randomselection{
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: #FFF9EE;
  display: flex;
  justify-content: center;
  .dialog{
    transition-duration: 0.8s;
    width: 582px;
    height: 950px;
    background-color: #FFF9EE;
    border-radius: 70px;
    .dialog_in{
      width: 582px;
      height: 900px;
      text-align: center;
      .dialog_img{
        margin-top: 50px;
        object-fit: cover;
        width: 400px;
        height: 400px;
      }
      .dialog_content{
        margin-top: 30px;
        text-align: center;
        height: 250px;
        color: #595959;
        font-weight: 600;
      }
      .dialog_btn{
        margin-top: 30px;
        display: flex;
        width: 582px;
        height: 140px;
        justify-content: space-evenly;
        align-items: center;
        .dialog_btns{
          color: black;
          font-size: 14Px;
          font-family: 'PingFang';
          font-weight: 600;
        }
      }
    }
  }
  .random_word{
    position: fixed;
    left: 108px;
    z-index: 2;
    .random_img{
      object-fit: cover;
      width: 534px;
      height: 80px;
    }
  }
  .main_tain{
    width:80vw;
    height: 90vh;
    margin-top: 40px;
    border-radius: 44px;
    background-color: #FCE8C5;
    position: relative;
    .choose_list{
      margin-top: 900px;
      width: 80vw;
      height: 30vh;
      display: flex;
      justify-content: space-evenly;
      .choose_type{
        height: 23vh;
        width: 19vw;
        background-color: #FFF9EE;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        font-family: 'PingFang';
        font-size: 20Px;
        font-weight: 400;
        border-radius: 70px;
        text-align: center;
        box-shadow: -5px 5px 16px rgba(0, 0, 0,0.2);
        .menu-container {
          position: relative;
          display: flex;
          justify-content: center;
          width: 200px;
          .dropdown {
            width: 100%;
            height: 50px;
            position: absolute;
            bottom: 100%;
            left: 0;
            background-color: #f9f9f9;
            z-index: 1;
            opacity: 0;
            // transform: translateY(-10px);
            transition-duration: 0.5s;
            overflow-y: scroll;
            overflow-x: visible;
            // animation: ss 0.5 ease-out;
          view {
            color: #333;
            display: none;
            width: 100%;
            height: 60px;
            // transition: opacity 3s ease-out
            transition-duration: 3s;
            //animation: ss 0.5 ease-out;
            background-color: #FFF9EE;
            font-family: 'PingFang';
            font-size: 12Px;
            font-weight: 200;
            overflow-x: visible;
          }
        }
      }
      .menu-container:hover .dropdown {
          height: 240px;
          opacity: 1;
          view{
            display: block;
          }
      }
        .choose_name{
          box-shadow: inset 0px 0px 15px 5px rgba(0,0,0,0.1);
          border-radius: 50%;
          width: 116px;
          height: 116px;
          background-color: #FFC765;
          font-family: 'PingFang';
          font-size: 20Px;
          font-weight: 400;
          line-height: 116px;
          text-align: center;
        }
      }
    }
    .pole_img{
      .line_img{
        position:absolute;
        object-fit: cover;
        width:25px;
        height: 460px;
        top: 28px;
        left: 83px;
        transition-duration: 0.51s;
      }
        .round_img{
        position:absolute;
        object-fit: cover;
        width: 130px;
        height: 165px;
        top: 475px;
        left: 38px;
        transition-duration: 0.5s;
      }
    }
    .pole_img:active{
      .line_img{
        height: 600px;
      }
      .round_img{
        top: 615px;
      }
    }
    .turntable_img{
    position: absolute;
    width: 790px;
    height: 790px;
    left: 160px;
    top: 65px;
    transition-duration: 0.5s;
  }
    .pointer_img{
      position: absolute;
      left: 522px;
      top: 180px;
      object-fit: cover;
      height: 295px;
      width: 60px;
    }
  .rotate360 {
      animation: rotate360 5s ease-out 0s;
  }
  @keyframes rotate360 {
    0%{
      transform: rotate(0deg);
    }
    100% {
        transform: rotate(1440deg);

    }
  }
  }
}

</style>
