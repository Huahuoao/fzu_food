<template>
  <div class="store_detail">
    <div class="head_color">

    </div>
    <div class="store_line0">
      <div  class="store_line" >
              <image :src="store.data.imgUrl" class="store_logo_img" />
              <div class="store_rate">
                <div style="margin-bottom: 10px;" class="title-medium">{{ store.data.storeName }}</div>
                <div  class="text-small store_line_middle">
                  <image src="../../images/location.svg" class="loc_img"/>
                  {{ store.data.location }}
                </div>
              </div>
              <div class="store_line_right">
                <div class="store_line_right_top">
                  <div class="rate_score text-small">{{ store.data.star}}.0分</div>
                  <nut-rate :custom-icon="HeartFill" v-model="value"  count="1" size="20" style="margin-right: 15px;"/>
                </div>
                <div class="store_type">
                  {{ store.data.tag }}
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
              <div class="menu_img">
                <image :src="item.url" class="menu_logo_img" v-show="item.url"/>
              </div>
              <div class="menu_rate" @click="navitoDishDetail(item.id)">
                <div style="margin-top: 10px;" class="label menu_rate_name">{{ item.foodName }}</div>
                <div style="display: flex;">
                   <div class="menu_type text-small">
                    {{ item.typetag1 }}
                  </div>
                  <div class="menu_type text-small">
                    {{ item.typetag2}}
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
import Taro,{useReachBottom, getCurrentInstance} from '@tarojs/taro';
import { HeartFill } from '@nutui/icons-vue-taro';
import { onBeforeMount, onMounted, reactive, ref } from 'vue'
import { getStorebyID,getFoodbyID,getImagebyID } from '../../request/new_api';
import { getFoodTagbyID } from '../../request/tagapi';
import './storedetail.css'
var page = ref(1)
var value =ref(0)
var store = reactive({
  data:{}
})
var menulist = reactive({
  data:[]
})
const navitoDishDetail = (index)=>{
  Taro.navigateTo({
    url:'../dishdetail/dishdetail?id='+ index,
  })
}
useReachBottom(async()=>{
  const food_res = await getFoodbyID({"storeId":store.data.id,"page":page.value,"size":6})
  menulist.data.push(...(food_res.data.data))
  for(var i=0;i<menulist.data.length;i++){
    var item = menulist.data[i]
    const img_res = await getImagebyID({"belongId":item.id,"belongType":"Food"})
    //Reflect(menulist.value[i],'url',img_res.data.data[0].url)
    try{
      menulist.data[i].url = img_res.data.data[0].url
    }
    catch(err){
      menulist.data[i].url = ''
    }
    const tag_res = await getFoodTagbyID({"foodId":item.id})
    console.log(tag_res.data.data)
    try{
      //menulist.data[i].typetag.push(...(tag_res.data.data))
      menulist.data[i].typetag2 = tag_res.data.data[0].tagName
    }
    catch(err){
      menulist.data[i].typetag2 = '暂无'
    }
    try{
      menulist.data[i].typetag1 = tag_res.data.data[1].tagName
    }
    catch{
      menulist.data[i].typetag1 = '暂无'
    }
  }
  page.value += 1
})
onBeforeMount(async()=>{
  store.data.storeid = getCurrentInstance().router.params.id
  const store_res = await getStorebyID({"storeId":store.data.storeid})
  store.data = store_res.data.data
  store.data.star = Math.floor(Math.random()*5+1)
  const food_res = await getFoodbyID({"storeId":store.data.id,"page":0,"size":6})
  menulist.data= food_res.data.data
  for(var i=0;i<menulist.data.length;i++){
    var item = menulist.data[i]
    const img_res = await getImagebyID({"belongId":item.id,"belongType":"Food"})
    //Reflect(menulist.value[i],'url',img_res.data.data[0].url)
    try{
      menulist.data[i].url = img_res.data.data[0].url
    }
    catch(err){
      menulist.data[i].url = ''
    }
    const tag_res = await getFoodTagbyID({"foodId":item.id})
    console.log(tag_res.data.data)
    try{
      //menulist.data[i].typetag.push(...(tag_res.data.data))
      menulist.data[i].typetag1 = tag_res.data.data[0].tagName
      menulist.data[i].typetag2 = tag_res.data.data[1].tagName
    }
    catch(err){
      menulist.data[i].typetag1 = '暂无'
      menulist.data[i].typetag2 = '暂无'
    }
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
    margin-top: 160px;
    display: flex;
    flex-wrap: wrap;
    overflow: scroll;
    align-content: flex-start;
    background-color: #FFF9EE;
    height: 85vh;
    .menu_line{
      width: 100vw;
      height: 160px;
      display: flex;
      border-bottom:2px solid rgba(0,0,0,0.1);
      padding: 20px;
      justify-content: space-evenly;
        .menu_img{
          width:160px;
          height: 160px;
          border-radius: 20px ;
          .menu_logo_img{
            object-fit: cover;
            width:160px;
            height: 160px;
            border-radius: 20px ;
          }
        }
        .menu_rate{
          width: 45vw;
          margin-left: 30px;
          margin-top: 7px;
          text-overflow:ellipsis;
          white-space:nowrap;
          overflow:hidden;
          .menu_rate_name{
            text-overflow:ellipsis;
            white-space:nowrap;
            overflow:hidden;
          }
        }
        .menu_type{
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #595959;
          width: 140px;
          height: 40px;
          border-radius:20px;
          margin-top: 20px;
          margin-right: 20px;
        }
      .dish_line_right{
        width: 20vw;
        margin-bottom: 20px;

        .menu_price{
          width: 60px;
          margin-left: 25px;
          margin-top: 15px;
          align-items: center;
          border-radius:20px;
          font-family: 'PingFang';
          font-size: 20Px;
          font-weight: bold;
          text-align: center;
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
  display: flex;
  justify-content: center;
  .store_line{
    width: 640px;
    height: 164px;
    background-color: #FFF9EE;
    border-radius: 20px;
    display: flex;
    align-items: center;
    box-shadow: 5px 5px 20px -13px rgba(0,0,0,0.5);
    margin-bottom: 40px;
    .store_logo_img{
      object-fit: cover;
      width:140px;
      height: 126px;
      margin-left: 14px;
      border-radius: 10px;
  }
.store_rate{
  width: 45vw;
  margin-left: 30px;
}
.loc_img{
  width: 40px;
  height: 40px;
  object-fit: fill;
}
.store_line_middle{
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: left;
  font-weight: 600;
  width: 300px;
}

.rate_star{
  margin-top: 10px;
  width: 30vw;
}
.store_line_right{
  width: 22vw;
  .store_line_right_top{
    width: 22vw;
    height: 42px; 
    display: flex;
    line-height: 42px;
    margin-top: 55px;
    .rate_score{
      width: 170px;
      margin-left: 20px;
      color: #F6AC15;
    }
  }
  .store_type{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #595959;
    width: 132px;
    height: 37px;
    border-radius:20px;
    border: 2px solid #595959;
    margin-top: 26px;
    margin-bottom: 50px;
    font-family: 'PingFang';
    font-size: 13Px;
    font-weight: 600;
  }
}
}

}

</style>
