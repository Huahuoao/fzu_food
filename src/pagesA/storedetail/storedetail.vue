<template>
  <div class="store_detail">
    <div class="head_color">

    </div>
    <div class="store_line0">
      <div  class="store_line" >
              <image :src="store.data.imgUrl" class="store_logo_img" />
              <div class="store_rate">
                <div style="margin-bottom: 10px;font-family: 'PingFang';font-size: 20px;font-weight: 600;">{{ store.data.storeName }}</div>
                <div style="display: flex;">
                  <nut-rate v-model="store.data.star" readnoly active-color="#F6AC15" size="12" class="rate_star" spacing="8" style="width: 100px;"/>
                  <span style="font-family: 'PingFang';font-size: 10px; margin-top: 0.5vh;">{{ store.data.star}}.0分</span>
                </div>
              </div>
              <div class="store_line_right">
                <div style="margin-left: 50px;">
                  <nut-rate :custom-icon="HeartFill" v-model="value"  count="1" />
                </div>
                
                <div class="store_type">
                  {{ store.data.intro }}
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
        <div v-for="(item,index) in menulist.data" class="menu_line" >
              <image :src="item.url" class="menu_logo_img" />
              <div class="store_rate" @click="navitoDishDetail(index)">
                <div style="margin-top: 10px;font-family: 'PingFang';font-size: 20Px;font-weight: 600;">{{ item.foodName }}</div>
                <div style="display: flex;">
                  <div class="menu_type" v-if="item.typetag.length!=0" >
                    {{ item.typetag[0].tagName }}
                  </div>
                  <div class="menu_type" v-if="item.typetag.length!=0" >
                    {{ item.typetag[1].tagName }}
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
import Taro,{getCurrentInstance} from '@tarojs/taro';
import { HeartFill } from '@nutui/icons-vue-taro';
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getStorebyID,getFoodbyID,getImagebyID } from '../../request/new_api';
import { getFoodTagbyID } from '../../request/tagapi';
import './storedetail.css'
var page = ref(0)
var value =ref(0)
var store = reactive({
  data:{
    storeid:0,
    storeName:'麦当劳',

  }
})
var menulist = reactive({
  data:[]
})
var menulist1 = ref([
  {
    id:1,
    name:'板烧鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:'https://images.fzuhuahuo.cn/hum.png',
    price:23
  },
  {
    id:2,
    name:'麦辣鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:'https://images.fzuhuahuo.cn/hum1.png',
    price:23
  },
  {
    id:2,
    name:'麦辣鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:'https://images.fzuhuahuo.cn/hum1.png',
    price:23
  },
  {
    id:2,
    name:'麦辣鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:'https://images.fzuhuahuo.cn/hum1.png',
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
const navitoDishDetail = (index)=>{
  Taro.navigateTo({
    url:'../dishdetail/dishdetail?id='+ JSON.stringify(menulist.data[index])+'&typetag='+JSON.stringify(menulist.data[index].typetag),
  })
}

onBeforeMount(async()=>{
  store.data.storeid = getCurrentInstance().router.params.id
  console.log(store)
  console.log(getCurrentInstance().router.params)
  const store_res = await getStorebyID({"storeId":store.data.storeid})
  store.data = store_res.data.data
  store.data.star = Math.floor(Math.random()*5+1)
  const food_res = await getFoodbyID({"storeId":store.data.id,"page":0,"size":5})
  menulist.data = food_res.data.data
  for(var i=0;i<menulist.data.length;i++){
    var item = menulist.data[i]
    menulist.data[i].typetag = []
    const img_res = await getImagebyID({"belongId":item.id,"belongType":"Food"})
    menulist.data[i].url = img_res.data.data[0].url
    const tag_res = await getFoodTagbyID({"foodId":item.id})
    menulist.data[i].typetag = []
    menulist.data[i].typetag.push(...(tag_res.data.data))
    console.log(JSON.stringify(menulist.data[i].typetag))
  }
  page.value += 1
})
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
    margin-top: 110px;
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
    margin-top: 140px;
    display: flex;
    flex-wrap: wrap;
    .menu_line{
      width: 100vw;
      display: flex;
      border-bottom:2px solid rgba(0,0,0,0.1);
      padding: 20px;
      margin-top: 20px;
      justify-content: space-evenly;
        .menu_logo_img{
          object-fit: cover;
          width:160px;
          height: 160px;
          border-radius: 20px ;
        }
        .menu_type{
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #595959;
        width: 20vw;
        height: 3vh;
        border-radius:20px;
        margin-top: 20px;
        margin-right: 20px;
        font-size:30px;
        font-family: 'PingFang';
        font-weight: 400;
      }
      .dish_line_right{
        width: 20vw;
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
  background-color: #FFC765;
}
.store_line0{
  position: absolute;
  top: 3vh;
  left: 7.2vw;
  font-family: 'PingFang';
  .store_line{
  margin-left: 15px;
  width: 640px;
  height: 164px;
  background-color: #FFF9EE;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 5px 5px 20px -13px rgba(0,0,0,0.5);
  margin-bottom: 40px;
}
.store_logo_img{
  object-fit: cover;
  width:140px;
  height: 126px;
  margin-left: 14px;
  border-radius: 15px;
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
  width: 22vw;
}
.store_type{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #595959;
  width: 21vw;
  height: 3vh;
  border-radius:20px;
  border: 2px solid #595959;
  margin-top: 36px;
  margin-right: 20px;
  font-family: 'PingFang';
  font-size: 16Px;
}
}

</style>
