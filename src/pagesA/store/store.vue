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
            
          </nut-popover><div class="triangle"></div>
          <image src="../../images/search.svg"  :onTap="Search" class="search_img"></image>
        </div>
        
        <div class="store_list">
          <nut-tabs v-model="tabactive"  color="black" background="#FFC765" style="font-family: 'PingFang';
  font-size: 16Px;
  font-weight: bold;" size="large" title-scroll name="tabName" title-gutter="10" @change="changeTabs">
          <nut-tab-pane v-for="item in canteenlist.data" :pane-key="item.id" :title=item.canteenName class="tab_pane"> 
            <div v-for="(item1,index) in item.storelist" class="store_line">
              <image  :src="item1.imgUrl" class="store_logo_img" />
              <div class="store_rate" >
                <div class="store_name" @click="navitoStoreDetail(item1.id)">{{ item1.storeName }}</div>
                <div style="display: flex;">
                  <nut-rate v-model="item1.storeScore " readnoly active-color="#F6AC15" size="13" class="rate_star" spacing="8" style="width: 103px;" readonly/>
                  <span style="font-family: 'PingFang';font-size: 10px; margin-top: 0.5vh;">{{ item1.storeScore }}分</span>
                </div>
              </div>
              <div class="store_line_right">
                <div class="collect_heart">
                  <nut-rate :custom-icon="HeartFill" v-model="item1.collect"  count="1" />
                </div>
                
                <div class="store_type text-small">
                  {{ item1.tag }}
                </div>
              </div>
            </div>
          </nut-tab-pane>
          </nut-tabs> 
        </div>
    </div>
</template>

<script setup>
import Taro, { useReachBottom  } from "@tarojs/taro";
import {  onMounted, reactive, ref } from 'vue'
import './store.css'
import { HeartFill} from '@nutui/icons-vue-taro';
import { getCanteenList,getStoreListID } from "../../request/new_api.js";
var popvisible = ref(false)
var tabactive = ref(1)
const canteenlist = reactive({
  data:[]
})
var searchdata = ref('')
var activelist = reactive({"id":1,"name":'店铺'})
var chooselist = reactive([{"id":1,"name":'店铺'},{"id":2,"name":'菜品'}])
var showsearch=ref(0)
const storelist = reactive({
  data:[]
})
const Search = () =>{
  Taro.navigateTo({
    url:'../search/search?searchdata='+searchdata.value+'&activelist='+activelist.id
  })
}
const chooseList = (item) =>{
  activelist = item
}
const navitoStoreDetail =(id)=>{
  Taro.navigateTo({
    url:'../storedetail/storedetail?id='+id
  })
}
const changeTabs = async(tab) => {
  showsearch.value = 0
  storelist.data = []
  if(canteenlist.data[tabactive.value-1].storelist.length == 0){
    const store_res = await getStoreListID({"canteenId":tabactive.value,"page":canteenlist.data[tabactive.value-1].page,"size":6})
    canteenlist.data[tabactive.value-1].storelist.push(...(store_res.data.data))
    canteenlist.data[tabactive.value-1].page += 1
    for(var i = 0;i<canteenlist.data[tabactive.value-1].storelist.length;i++){
      canteenlist.data[tabactive.value-1].storelist[i].storeScore = Math.floor(Math.random()*5+1)
    }
  }
  for(var i = 0;i<canteenlist.data[tabactive.value-1].storelist.length;i++){
    if(canteenlist.data[tabactive.value-1].storelist[i].imgUrl==null){
      canteenlist.data[tabactive.value-1].storelist[i].imgUrl='https://images.fzuhuahuo.cn/QQ%E5%9B%BE%E7%89%8720231129233810.jpg'
    }
  }
};
useReachBottom(async() => {
  const store_res = await getStoreListID({"canteenId":tabactive.value,"page":canteenlist.data[tabactive.value-1].page,"size":6})
  for(var i=0;i<store_res.data.data.length;i++){
    store_res.data.data[i].storeScore = Math.floor(Math.random()*5+1)
  }
  canteenlist.data[tabactive.value-1].storelist.push(...(store_res.data.data))
  canteenlist.data[tabactive.value-1].page += 1
})
onMounted(async () => {
  const cant_res = await getCanteenList({"page":0,"size":50})
  const store_res = await getStoreListID({"canteenId":tabactive.value,"page":0,"size":6})
  canteenlist.data =cant_res.data.data
  for (var i=0;i<canteenlist.data.length;i++){
    canteenlist.data[i].storelist = []
    canteenlist.data[i].page = 0
  }
  canteenlist.data[0].storelist = store_res.data.data
  for(var i = 0;i<canteenlist.data[0].storelist.length;i++){
    // const score_res = getReviewStore({"storeId":canteenlist.data[0].storelist[i].id})
    // console.log(score_res)
    if(canteenlist.data[0].storelist[i].imgUrl==null){
      canteenlist.data[0].storelist[i].imgUrl='https://images.fzuhuahuo.cn/QQ%E5%9B%BE%E7%89%8720231129233810.jpg'
    }
    canteenlist.data[0].storelist[i].storeScore = Math.floor(Math.random()*5+1)
  }
  canteenlist.data[0].page = 1
  //len.value = 100/(canteenlist.data.length)

})

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
  width: 100%;
  height: 80vh;
  background: linear-gradient(#FFC765,#FDDDA3);
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
}
.tab_pane{
  width:100vw;
  height: 88vh;
  background: linear-gradient(#FFC765,#FDDDA3);
  justify-content: center;
  overflow: scroll;
  /* align-content:flex-start  */
}
 /* .my_divider{
  z-index: 2;
  position: absolute;
  top: 130px;
  width :5px;
  height: 40px;
  background-color: black;

} */
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
.store_name{
  margin-bottom: 23px;
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
  margin-bottom: 6px;
}
.rate_star{
  margin-top: 5px;
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
  width: 132px;
  height: 40px;
  border-radius:20px;
  border: 2px solid #595959;
  margin-top: 10px;
  margin-right: 25px;
  margin-bottom:15px;
}
.collect_heart{
  margin-top: 15px;
  margin-left: 80px;
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
.triangle {
  position: absolute;
  top: 70px;
  left: 600px;

  width: 12px;
  height: 12px;
  background: linear-gradient(-45deg,black 50%, transparent 50% ) ;
}
</style>
