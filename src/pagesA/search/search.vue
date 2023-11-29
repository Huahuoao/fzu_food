<template>
  <!-- <div class="my_divider"   v-for="(item,index) in 4" :style="{left:20 * (index+1) +'%'}"></div> -->
    <div class="store">
      <div class="search">
          <div class="search_line">
            <input v-model="searchdata" class="search_input">
            <!-- <nut-divider direction="vertical"  style="background-color: black;height: 70%;"/> -->
          </div>
          <nut-popover 
            bg-color="#FFF9EE"
            v-model:visible="popvisible"
            :list="chooselist"
            :offset=[15,0]
            location="bottom-start"
            @choose="chooseList"
          >
            <template #reference>
              <nut-button  class="choose_list_button label">{{ activelist.name }}</nut-button>
            </template>
          </nut-popover>
          <image src="../../images/search.svg"  :onTap="Search" class="search_img"></image>
        </div>
        
        <div class="store_list">
          <div v-for="(item,index) in storelist.data" class="store_line" v-if="searchtype == 1">
              <image  :src="item.imgUrl" class="store_logo_img" />
              <div class="store_rate" >
                <div style="margin-bottom: 20px;" class="label" @click="navitoStoreDetail(item.id)">{{ item.storeName }}</div>
                <div style="display: flex;">
                  <nut-rate v-model="item.storeScore " readnoly active-color="#F6AC15" size="13" class="rate_star" spacing="8" style="width: 103px;"/>
                  <span style="font-family: 'PingFang';font-size: 10px; margin-top: 0.5vh;">{{ item.storeScore }}分</span>
                </div>
              </div>
              <div class="store_line_right">
                <div style="margin-left: 50px;margin-top: 2px;">
                  <nut-rate :custom-icon="HeartFill" v-model="item.collect"  count="1" />
                </div>
                <div class="store_type">
                  {{ item.tag }}
                </div>
              </div>
            </div>
            <div v-for="(item,index) in foodlist.data" class="store_line"  v-if="searchtype == 2">
              <div class="store_img">
                <image :src="item.url" class="store_logo_img" />
              </div>
              <div class="store_rate" @click="navitoDishDetail(item.id)">
                <div class="label food_name">{{ item.foodName }}</div>
                <div style="display: flex;">
                  <div class="menu_type text-small" >
                    {{ item.typetag1 }}
                  </div>
                  <div class="menu_type text-small" >
                    {{ item.typetag2 }}
                  </div>
                </div>
              </div>
              <div class="menu_line_right">
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
</template>

<script setup>
import Taro, {getCurrentInstance,useReachBottom} from "@tarojs/taro";
import {  onMounted, reactive, ref } from 'vue'
import './search.css'
import { HeartFill} from '@nutui/icons-vue-taro';
import { getImagebyID } from "../../request/new_api";
import { getFoodTagbyID } from "../../request/tagapi";
import { getSearchStorebyName,getSearchFoodbyName } from "../../request/search_api";
var page = ref(1)
var popvisible = ref(false)
var searchdata = ref()
var activelist = reactive({"id":1,"name":'店铺'})//控制展示的是菜品数据还是店铺数据
var chooselist = reactive([{"id":1,"name":'店铺'},{"id":2,"name":'菜品'}])
const storelist = reactive({
  data:[]
})
const foodlist = reactive({
  data:[]
})
const taglist = reactive({
  data:[]
})
var searchtype = ref(1) //控制点击搜索按键搜索的是菜品还是店铺
  
const Search = async() =>{
  searchtype.value = activelist.id
  if(searchtype.value == 1){
    const getStoreList_res = await getSearchStorebyName({"page":0,"size":6,"storeName":searchdata.value})
    storelist.data = getStoreList_res.data.data
    for(var i=0;i<storelist.data.length;i++){
      storelist.data[i].storeScore = Math.floor(Math.random()*5+1)
    }
  }
  else if(searchtype.value == 2){
    const getStoreList_res = await getSearchFoodbyName({"page":0,"size":6,"foodName":searchdata.value})
    foodlist.data = getStoreList_res.data.data
    //Reflect(menulist.value[i],'url',img_res.data.data[0].url)
    for(var i=0;i<foodlist.data.length;i++){
    var item = foodlist.data[i]
    const img_res = await getImagebyID({"belongId":item.id,"belongType":"Food"})
    try{
      foodlist.data[i].url = img_res.data.data[0].url
    }
    catch(err){
      foodlist.data[i].url = ''
    }
    const tag_res = await getFoodTagbyID({"foodId":item.id})
    console.log(tag_res.data.data)
    try{
      //menulist.data[i].typetag.push(...(tag_res.data.data))
      foodlist.data[i].typetag1 = tag_res.data.data[0].tagName
      foodlist.data[i].typetag2 = tag_res.data.data[1].tagName
    }
    catch(err){
      foodlist.data[i].typetag1 = '暂无'
      foodlist.data[i].typetag2 = '暂无'
    }
    }
  }
  page.value = 1
}
const chooseList = (item) =>{
  activelist = item
}
const navitoStoreDetail =(id)=>{
  Taro.navigateTo({
    url:'../storedetail/storedetail?id='+id
  })
}
const navitoDishDetail = (index)=>{
  Taro.navigateTo({
    url:'../dishdetail/dishdetail?id='+ index,
  })
}
useReachBottom(async()=>{
  if(searchtype.value == 1){
    const getStoreList_res = await getSearchStorebyName({"page":page.value,"size":6,"storeName":searchdata.value})
    storelist.data.push(...(getStoreList_res.data.data))
    for(var i=0;i<storelist.data.length;i++){
      storelist.data[i].storeScore = Math.floor(Math.random()*5+1)
    }
  }
  else if(searchtype.value == 2){
    const getStoreList_res = await getSearchFoodbyName({"page":page.value,"size":6,"foodName":searchdata.value})
    foodlist.data.push(...(getStoreList_res.data.data))
    for(var i=0;i<foodlist.data.length;i++){
      var item = foodlist.data[i]
      const img_res = await getImagebyID({"belongId":item.id,"belongType":"Food"})
      try{
        foodlist.data[i].url = img_res.data.data[0].url
      }
      catch{
        foodlist.data[i].url = ''
      }
      const tag_res = await getFoodTagbyID({"foodId":item.id})
      try{
        foodlist.data[i].typetag1 = tag_res.data.data[0].tagName
        foodlist.data[i].typetag2 = tag_res.data.data[1].tagName
      }
      catch{
        foodlist.data[i].typetag1 = ''
        foodlist.data[i].typetag2 = ''
      }
    }
  }
  page.value += 1
})
onMounted(async () => {
  searchtype.value = getCurrentInstance().router.params.activelist
  searchdata.value = getCurrentInstance().router.params.searchdata
  if(searchtype.value == 1){
    const getStoreList_res = await getSearchStorebyName({"page":0,"size":6,"storeName":searchdata.value})
    storelist.data = getStoreList_res.data.data
    for(var i=0;i<storelist.data.length;i++){
      storelist.data[i].storeScore = Math.floor(Math.random()*5+1)
    }
  }
  else if(searchtype.value == 2){
    const getStoreList_res = await getSearchFoodbyName({"page":0,"size":6,"foodName":searchdata.value})
    foodlist.data = getStoreList_res.data.data
    //Reflect(menulist.value[i],'url',img_res.data.data[0].url)
    for(var i=0;i<foodlist.data.length;i++){
    var item = foodlist.data[i]
    const img_res = await getImagebyID({"belongId":item.id,"belongType":"Food"})
    try{
      foodlist.data[i].url = img_res.data.data[0].url
    }
    catch(err){
      foodlist.data[i].url = ''
    }
    const tag_res = await getFoodTagbyID({"foodId":item.id})
    console.log(tag_res.data.data)
    try{
      //menulist.data[i].typetag.push(...(tag_res.data.data))
      foodlist.data[i].typetag1 = tag_res.data.data[0].tagName
      foodlist.data[i].typetag2 = tag_res.data.data[1].tagName
    }
    catch(err){
      foodlist.data[i].typetag1 = '暂无'
      foodlist.data[i].typetag2 = '暂无'
    }
    }
  }
})

</script>
<style lang="scss">
.store_img{
  width: 140px;
  height: 126px;
  margin-left: 10px;
  border-radius: 18px;
}
.red{
  background-color: red;
}
.white{
  background-color: white;
}
.store{
  width: 100%;
  height: 100vh;
  font-family: 'PingFang';
}
.search{
  height: 100%;
  background-color: #FFF9EE;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: center;
  
}
.search_line{
  width: 444px;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 15px;
  box-shadow: inset 5px 5px 20px -13px rgba(0,0,0,0.5);
  background-color: #FCE8C5
}
.search_img{
  object-fit: cover;
  width: 50px;
  margin-top: 8px;
  font-family: PingFang;
}
.search_input{
  height: 100%;
  width: 400px;
  font-family: 'PingFang';
  font-size: 16Px;
}
.choose_list_button{
  border: 0px;
  background-color: #FFF9EE;
  width: 150px;
}
.store_list{
  width: 100vw;
  height: 100vh;
  background: linear-gradient(#FFC765,#FDDDA3);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: scroll;
  align-content: flex-start;
}
.store_line{
  margin-top: 50px;
  margin-left: 15px;
  width: 640px;
  height: 164px;
  background-color: #FFF9EE;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 5px 5px 20px -13px rgba(0,0,0,0.5);
}
.store_logo_img{
  object-fit: cover;
  width:140px;
  height: 126px;
  margin-left: 14px;
  border-radius: 18px;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.11);
}
.store_rate{
  width: 45vw;
  margin-left: 30px;
  margin-bottom: 10px;
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
  margin-top: 25px;
  margin-right: 20px;
  font-family: 'PingFang';
  font-size: 16Px;
}
.food_name{
  margin-top: 5px;
  margin-bottom: 20px;
}
.menu_type{
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #595959;
  width: 132px;
  height: 40px;
  border-radius:20px;
  margin-top: 10px;
  margin-right: 20px;
}
.menu_price{
  margin-top: 15px;
  align-items: center;
  justify-content: center;
  border-radius:20px;
  font-family: 'PingFang';
  font-size: 20Px;
  font-weight: bold;
  text-align: center;
}
.dish_rate{
  margin-left: 75px;
  margin-top: 20px;
}
.menu_line_right{
  width: 20vw;
  margin-bottom: 20px;
}

</style>
