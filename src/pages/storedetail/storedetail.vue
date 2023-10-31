<template>
  <div class="store_detail">
    <div class="head_color">

    </div>
    <div class="store_line0">
      <div v-for="(item,index) in storelist" class="store_line" >
              <image src="../../images/mcdona.png" class="store_logo_img" />
              <div class="store_rate" @click="navitoStoreDetail()">
                <div style="margin-bottom: 20px;font-family: 'PingFang';font-size: 20Px;font-weight: bold;">{{ item.name }}</div>
                <div style="display: flex;">
                  <nut-rate v-model="item.star" readnoly active-color="#F6AC15" size="13" class="rate_star" spacing="8" data-desc="this"/>
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
    </div>
    <div class="menu">
      <div class="menu_title">
        <div class="line"></div>
        <div class="menu_word"> &nbsp菜单</div>
      </div>
      <div class="menu_list">
        <div v-for="(item,index) in menulist" class="menu_line" >
              <image :src="item.logo" class="store_logo_img" />
              <div class="store_rate" @click="navitoDishDetail()">
                <div style="margin-top: 10px;font-family: 'PingFang';font-size: 20Px;font-weight: bold;">{{ item.name }}</div>
                <div style="display: flex;">
                  <div class="menu_type">
                    {{ item.typetag }}
                  </div>
                  <div class="menu_type">
                    {{ item.tastytag }}
                  </div>
                </div>
              </div>
              <div class="dish_line_right">
                <div class="dish_rate">
                  <nut-rate v-model="item.star" readnoly active-color="#F6AC15" size="20" class="rate_star" count="1"/>
              </div>
              <div class="menu_price">
                ￥{{ item.price }}
              </div>
              </div>
            </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Taro from '@tarojs/taro';
import { ref } from 'vue'
import './storedetail.css'
var storelist = ref([
  {
    id:1,
    name:'麦当劳',
    star:3,
    type:'西餐汉堡',
    logo:'/src/images/macdona.png',
    color:0,
    tap:false,
    price:23
  }
])
var menulist = ref([
  {
    id:1,
    name:'板烧鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:require('../../images/hum.png'),
    price:23
  },
  {
    id:2,
    name:'麦辣鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:require('../../images/hum1.png'),
    price:23
  }
])
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
const navitoDishDetail = ()=>{
  Taro.navigateTo({
    url:'../dishdetail/dishdetail?id='+ JSON.stringify(menulist.value[0]),
  })
}
</script>
<style lang="scss">
.red{
  background-color: red;
}
.white{
  background-color: white;
}
.menu{
  width: 100vw;
  height: 90vh;
  background-color: #FFF9EE;
  display: flex;
  .menu_title{
    display: flex;
    margin-top: 150px;
    width:100vw;
    height: 3vh;
    align-items: center;
      .line{
      height: 3vh;
      width:0.8vw;
      background-color: black;
      border-radius: 25%;
      margin-left: 50px;
    }
    .menu_word{
      font-family: 'PingFang';
      font-size: 20Px;
      font-weight: bold;
    }
  }
  .menu_list{
   position: absolute;
    margin-top: 250px;
    .menu_line{
      width: 100vw;
      display: flex;
      border-bottom:2px solid rgba(0,0,0,0.1);
      padding: 20px;
      margin-top: 20px;
        .menu_type{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #595959;
        color: #595959;
        width: 20vw;
        height: 3vh;
        border-radius:20px;
        margin-top: 20px;
        margin-right: 20px;
      }
      .dish_line_right{
        width: 10vw;
        margin-bottom: 20px;
        .menu_price{
          margin-top: 15px;
          align-items: center;
          justify-content: center;
          border-radius:20px;
          font-family: 'PingFang';
          font-size: 20Px;
          font-weight: bold;
        }
        .dish_rate{
          margin-left: 50px;
          margin-top: 20px;
        }
      }
    }
  }
}
.store_detail{
  width: 100vw;
  height: 100vh;
}
.head_color{
  width: 100vw;
  height: 10vh;
  background-color: #F6AC15;
}
.store_line{
  width: 90vw;
  height: 13vh;
  margin-bottom: 20px;
  border-radius: 20px;
  font-family: 'PingFang';
  font-size: 14Px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 5px 5px 10px 0px rgb(232,227,217);
}
.store_line0{
  position: absolute;
  top: 3vh;
  left: 5vw;
}
.store_logo_img{
  object-fit: cover;
  width:22vw;
  height: 22vw;
  margin-left: 15px;
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
  left: 71px;
  border-radius: 20px;
  transform: rotate(-45deg);
  position: absolute;
}
.heart_right {
  transform: rotate(-45deg);
  border: 2px solid #F6AC15;
  width: 20px;
  height: 20px;
  left: 89px;
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
</style>
