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
          <view class="price">
            <text class="title-big" style="color:#F6AC15">￥{{ dish.data.price }}</text>
          </view>
          <view class="right_image" >
            <image src="https://images.fzuhuahuo.cn/good.png" class="good_image" :class="{op:good}" :onTap="chooseGood"/>
            <image src="https://images.fzuhuahuo.cn/bad.png" class="bad_image" :class="{op:bad}" :onTap="chooseBad"/>
          </view>
        </view>
      </view>
    <view class="comment_line">
      <nut-avatar class="comment_avt" size="normal">
        <img
          src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
        />
      </nut-avatar>
      <input type="text" v-model="comment" class="comment_inp"/>
      <button class="comment_btn" @click="submit">评分</button>
    </view>
    <view class="comments">
      <view class="single_comment" v-for="(item,index) in userlist.data">
        <nut-avatar class="comment_img" size="normal">
        <img
          src="https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png"
        />
      </nut-avatar>
      <view class="comment_right">
        <view class="comment_username">{{ item.username }}</view>
        <view class="comment_info">{{ item.commentinfo }}</view>
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
var cmt = reactive({
  info:{
    content: '', // 评论详情
    nickName: '', // 评论人的姓名
    score: 5, // 评论星星数
    avatar: 'https://img12.360buyimg.com/imagetools/jfs/t1/196430/38/8105/14329/60c806a4Ed506298a/e6de9fb7b8490f38.png', // 评论人头像
    time: '', // 评论时间
    size: '', // 评论人购买的商品规格
    replay: 23, // 此评论的回复数
    like: 1 // 此评论的点赞数
  }
})
var good = ref(0)
var bad = ref(0)
var star = ref(0)
var dish = reactive({data:''})
var comment = ref('')
var userlist = reactive({
  data:[
    {
      username:'帕恰狗',
      commentinfo:'黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！'
    },
    {
      username:'aaaa',
      commentinfo:'黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！'
    },
    {
      username:'aaaa',
      commentinfo:'黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡好吃'
    },
    {
      username:'aaaa',
      commentinfo:'黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！黄焖鸡米饭超级好吃！'
    },
  ]
})
var dishs  =reactive({
    id:1,
    name:'板烧鸡腿堡',
    star:0,
    typetag:'种类标签',
    tastytag:'口味标签',
    logo:'https://images.fzuhuahuo.cn/hum_c.png',
    price:23
  },)
onMounted(()=>{
  dish['data'] = JSON.parse(getCurrentInstance().router.params.id)
})
const submit = ()=>{
  console.log(comment.value)
}
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
        top: 3vh;
        left: 11vw;
      }
      .head_image{
        object-fit: fill;
        width:88vw;
        height: 30vh;
        margin-top: 30px;
    }
  }
  .head_detail{
    margin-top: 20px;
    display: flex;
    width: 100vw;
    height: 10vh;
    justify-content: space-around;
      .left{
      width: 50vw;
      margin-left: 50px;
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
        width: 35vw;
        height: 10vh;
        margin-left: 100px;
        .price{
         margin-left: 80px;
        }
        .right_image{
          display: flex;
          justify-content: space-around;
          .good_image{
            width: 55px;
            height: 55px;
            object-fit: fill;
            transition-duration: 2s;
            margin-right: 50px;
          }
          .bad_image{
            margin-top: 10px;
            width: 55px;
            height: 45px;
            object-fit: fill;
            transition-duration: 2s;
            margin-right: 50px;
          }
        }
      }
  }
  .comment_line{
    width: 100vw;
    height: 12vh;
    display: flex;
    justify-content: center;
    border-bottom: 5px solid rgba($color: #F6AC15, $alpha: 0.25);
    align-items: center;
    .comment_avt{
      margin-left: 50px;
    }
    .comment_inp{
      width: 55vw;
      height: 66px;
      background-color: #FCE8C5;
      border-radius: 40px;
      margin-left: 20px;
    }
    .comment_btn{
      width: 120px;
      height: 66px;
      background-color: #FCE8C5;
      font-family: 'PingFang';
      font-size: 16Px;
      font-weight: 600;
      line-height: 56px;
      color: #F6AC15;
      border-radius: 34px;
      line-height: 66px;
      border: none;
    }
  }
  .comments{
    width: 100vw;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 30px;
    overflow: scroll;
    .single_comment{
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      .comment_img{
        margin-right: 50px;
      }
      .comment_right{
        width: 70vw;
        .comment_username{
          font-family: 'PingFang';
          font-size: 16Px;
          font-weight: 600;
          color: #A1A1A1;
        }
        .comment_info{
          width: 70vw;
          word-break: break-all;
          font-family: 'PingFang';
          font-size: 12Px;
        }
      }
    }
  }
 }
</style>
