<template>
  <view class="dishdetail">
    <view class="head_image_area">
      <nut-rate v-model="star"  class="star" count="1" void-color="#FFFFFF"/>
      <image :src="dish.data.logo" class="head_image"/>
    </view>
    <view class="head_detail">
        <view class="left">
          <text class="title-medium">{{ dish.data.name }} </text>
            <div class="tag">
              <div class="dish_type">
                {{ dish.data.typetag }}
              </div>
              <div class="dish_type">
                {{ dish.data.tastytag }}
              </div>
            </div>
        </view>
        <view class="right">
          <text class="title-big" style="color:#F6AC15">￥{{ dish.data.price }}</text>
          <view class="right_image"  @click="chooseGood">
            <image src="https://images.fzuhuahuo.cn/good.png" class="good_image" :class="{op:good}" @click="chooseGood"/>
            <image src="https://images.fzuhuahuo.cn/bad.png" class="bad_image" :class="{op:bad}" :onTap="chooseBad"/>
          </view>
        </view>
      </view>
  </view>
</template>

<script setup>
import { onMounted, reactive, ref, setBlockTracking } from 'vue'
import './dishdetail.css'
import Taro,{getCurrentInstance} from '@tarojs/taro';
import { IconFont } from '@nutui/icons-vue-taro';
var good = ref(0)
var bad = ref(0)
var star = ref(0)
var dish = reactive({data:''})
var dishs  =reactive({
    id:1,
    name:'板烧鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:'https://images.fzuhuahuo.cn/hum.png',
    price:23
  },)
onMounted(()=>{
  dish['data'] = JSON.parse(getCurrentInstance().router.params.id)
})
const chooseGood = ()=>{
  good.value = !good.value
  console.log(good)
}
const chooseBad = ()=>{
  bad.value = !bad.value
  console.log(bad)
}
</script>
<style lang="scss">

.op{
  opacity: 0;
}
.icon{
  transition-duration: 2s;
  border:1px solid black;
}
.red{
  background-color: red;
}
.white{
  background-color: white;
}
 .dishdetail{
  background-color: #FFF9EE;
  height: 100vh;
  width: 100vw;
  .head_image_area{
    width: 100vw;
    display: flex;
    justify-content: center;
      .star{
        position:absolute;
        top: 5vh;
        left: 15vw;
      }
      .head_image{
        object-fit: fill;
        width:85vw;
        height: 30vh;
        margin-top: 30px;
    }
  }
  .head_detail{
    margin-top: 20px;
    display: flex;
    width: 100vw;
    height: 20vh;
    justify-content: space-around;
      .left{
      width: 50vw;
      .dish_type{
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
      .tag{
        display: flex;
      }
    }
      .right{
        width: 20vw;
        height: 10vh;
        .right_image{
          display: flex;
          justify-content: center;
          .good_image{
            width: 7vw;
            height: 7vw;
            object-fit: fill;
            transition-duration: 2s;
          }
          .bad_image{
            margin-top: 10px;
            width: 6vw;
            height: 6vw;
            object-fit: fill;
            transition-duration: 2s;
          }
        }
      }
  }
 }
</style>
