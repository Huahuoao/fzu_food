<template>
  <view class="dishdetail">
    <view class="head_image_area">
      <text class="title-medium" style="height: 20px;">{{ dish.data.foodName }} </text>
      <nut-rate v-model="star"  class="star" count="1" void-color="#FFFFFF"/>
      <image :src="dish.data.imgUrl" class="head_image"/>
    </view>
    <view class="head_detail">
        <view class="left">
          <div style="display: flex;align-items: center;">
            <IconFont name="right"></IconFont>
            <text class="input-text" style="font-weight: 600;">{{ dish.data.location }} </text>
          </div>
          <view class="price">
            <text class="title-big" style="color:#F6AC15">￥{{ dish.data.price }}</text>
          </view>
        </view>
        <view class="right">
          <div class="tag">
              <div class="dish_type text-small"  v-if="tag.data.length!=0">
                     {{ tag.data[0].tagName }}
                  </div>
                  <div class="dish_type text-small"  v-if="tag.data.length!=0">
                     {{ tag.data[1].tagName  }}
                  </div>
            </div>
          <view class="right_image">
            <nut-animate type="shake" :show="show1" style="margin-right: 20px;">
              <image src="https://images.fzuhuahuo.cn/good_ash.png" class="good" v-if="!goodclick" :onTap="goodClick"/>
            <image src="https://images.fzuhuahuo.cn/good_red.png" class="good" v-if="goodclick" :onTap="goodClick"/>
          </nut-animate>
          <nut-animate type="shake" :show="show2">
            <image src="https://images.fzuhuahuo.cn/good_ash.png" class="bad " v-if="!badclick" :onTap="badClick"/>
            <image src="https://images.fzuhuahuo.cn/good_red.png" class="bad" v-if="badclick" :onTap="badClick"/>
          </nut-animate>
            <!-- <image src="https://images.fzuhuahuo.cn/good.png" class="good_image" :class="{op:good}" :onTap="chooseGood"/>
            <image src="https://images.fzuhuahuo.cn/bad.png" class="bad_image" :class="{op:bad}" :onTap="chooseBad"/> -->
          </view>
        </view>
      </view>
    <view class="comment_line">
      <nut-avatar class="comment_avt" size="normal">
        <img
          :src="avatarurl"
          class="comment_img"
        />
      </nut-avatar>
      <div class="comment_inp_div">
        <nut-input type="text" v-model="comment" class="input-text comment_inp" input-align="left" :border="false"/>
      </div>
      <div class="comment_btn_div">
        <div class="comment_btn" @click="submit" style="border: none;">评分</div>
      </div>
    </view>
    <view class="comments">
      <view class="single_comment" v-for="(item,index) in commentlist.data">
          <nut-avatar class="comment_img" size="normal">
          <img
            src="https://images.fzuhuahuo.cn/default_headImg.jpeg" style="border-radius: 50%;"
          />
        </nut-avatar>
        <view class="comment_right">
          <view class="comment_username">{{ item.username }}</view>
          <view class="comment_info">{{ item.content }}</view>
        </view>
        <view class="comment_comment">
          <nut-animate type="shake" :show="item.show1">
            <image src="https://images.fzuhuahuo.cn/good_ash.png" class="comment_good" v-if="!item.good" :onTap="goodCommentClick" :data-index =index />
          <image src="https://images.fzuhuahuo.cn/good_red.png" class="comment_good" v-if="item.good" :onTap="goodCommentClick" :data-index =index />
        </nut-animate>
        <nut-animate type="shake" :show="item.show2">
          <image src="https://images.fzuhuahuo.cn/good_ash.png" class="comment_bad" v-if="!item.bad" :onTap="badCommentClick" :data-index =index />
          <image src="https://images.fzuhuahuo.cn/good_red.png" class="comment_bad" v-if="item.bad" :onTap="badCommentClick" :data-index =index />
        </nut-animate>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref,onBeforeMount} from 'vue'
import './dishdetail.css'
import Taro,{getCurrentInstance, getStorageSync} from '@tarojs/taro';
import { IconFont,HeartFill } from '@nutui/icons-vue-taro';
import { getFoodTagbyID } from '../../request/tagapi';
import { getFoodbyFoodId } from '../../request/food_api';
import {getImagebyID} from '../../request/new_api'
import { getReviewOfFood,postReview,getReviewIsUserLiked,getReviewIsUserDisliked,postReviewLike,postReviewDislike } from '../../request/review_api';
import { getUserByUnionId,getUnionId } from '../../request/api';
import { getStorebyID } from '../../request/new_api';
var show1 = ref(false)
var show2 = ref(false)
var goodclick = ref(false)
var badclick = ref(false)
var id = ref(0)
var star = ref(0)
var dish = reactive({data:''})
var comment = ref('')
var avatarurl = ref('https://images.fzuhuahuo.cn/default_headImg.jpeg')
var userid = ref(0)
var commentlist = reactive({
  data:[]
})
var tag = reactive({
  data:[]
})
const goodClick = ()=>{
  goodclick.value = !goodclick.value
  show1.value = !show1.value
  console.log('ss')
}
const badClick = ()=>{
  badclick.value = !badclick.value
  show2.value = !show2.value
  console.log('sss')
}
const goodCommentClick = async(e)=>{
  var index = e.target.dataset.index
    if(commentlist.data[index].good==true){
       commentlist.data[index].good = !commentlist.data[index].good
       commentlist.data[index].show1 = false
       return 
     }
     console.log('sss')
     const like_res = await postReviewLike({"reviewId":commentlist.data[index].id,"userId":userid.value})
     commentlist.data[index].good = true
      commentlist.data[index].show1 = true
}
const badCommentClick = async(e)=>{
  var index = e.target.dataset.index
     if(commentlist.data[index].bad==true){
       commentlist.data[index].bad = !commentlist.data[index].bad
        commentlist.data[index].show2 = false
       return 
     }
     const dislike_res = await postReviewDislike({"reviewId":commentlist.data[index].id,"userId":userid.value})
     commentlist.data[index].bad = true
      commentlist.data[index].show2 = true
}
const getUserId = async()=>{
  let res= await Taro.login()
  let code = res.code
  const getunion_res = await getUnionId(code)
  let openid = getunion_res.data.data.openid
  const getuser_res = await getUserByUnionId(openid)
  userid.value = getuser_res.data.data.id
  console.log(userid.value)
}
onBeforeMount(async()=>{
   const getuser_res = await getUserId()
   if(getStorageSync('isLogin')==true){
     avatarurl.value = Taro.getStorageSync('headImg')
     console.log(avatarurl.value)
   }
  id.value = JSON.parse(getCurrentInstance().router.params.id)
  const review_res = await getReviewOfFood({"foodId":id.value,'page':0,'size':500})
  commentlist.data = review_res.data.data
   for(var i=0;i<commentlist.data.length;i++){
     const like_res = await getReviewIsUserLiked({"reviewId":commentlist.data[i].id,"userId":userid.value})
     commentlist.data[i].good = like_res.data.data
     const dislike_res = await getReviewIsUserDisliked({"reviewId":commentlist.data[i].id,"userId":userid.value})
     commentlist.data[i].bad = dislike_res.data.data
     commentlist.data[i].show1 = false
     commentlist.data[i].show2 = false
   }
  //typetag.value = JSON.parse(getCurrentInstance().router.params.typetag)
  //console.log(JSON.parse(getCurrentInstance().router.params.id))
  const food_res = await getFoodbyFoodId({"foodId":id.value})
  dish.data = food_res.data.data
  const tag_res = await getFoodTagbyID({"foodId":id.value})
  tag.data = tag_res.data.data
  const img_res = await getImagebyID({"belongType":"Food","belongId":id.value})
  try{
    dish.data.imgUrl = img_res.data.data[0].url
  }
  catch{
    dish.data.imgUrl = ''
  }
  const store_res = await getStorebyID({"storeId":dish.data.storeId})
  dish.data.location = store_res.data.data.location
})
const submit = async()=>{
  if(comment.value==''){
    Taro.showToast({
      title: '评论不能为空~',
      icon: 'error',
      duration: 2000
    })
    return
  }
  if(getStorageSync('isLogin')!=true){
    Taro.showToast({
      title: '请先登录~',
      icon: 'error',
      duration: 2000
    })
    return
  }
  const date1 = new Date();
  const isoString1= date1.toISOString();
  var form = {
  "attitudeScore": 5,
  "content": comment.value,
  "flavorScore": 5,
  "foodId": id.value,
  "foodScore": 5,
  "reviewTime": isoString1,
  "storeId": 0,
  "storeScore": 5,
  "userId": userid.value,
  "waitTimeScore": 5
}
const review_res = await postReview(form)
console.log(review_res.data.data)
comment.value = ''
try{
  commentlist.data.push(review_res.data.data)
  Taro.showToast({
      title: '评论发布成功！',
      duration: 2000
    })
}
catch{
  
}
}
</script>
<style lang="scss">
.bad{
  width: 50px;
  height: 50px;
  transform: scaleY(-1);
}
.good{

  width: 50px;
  height: 50px;
}
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
  background-color: #8a8a8a;
}
 .dishdetail{
  background-color: #FFF9EE;
  height: 100vh;
  width: 100vw;
  .head_image_area{
    width: 100vw;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
      .star{
        position:absolute;
        top: 8vh;
        left: 11vw;
      }
      .head_image{
        object-fit: fill;
        width:88vw;
        height: 30vh;
        margin-top: 30px;
        border-radius: 50px;
    }
  }
  .head_detail{
    margin-top: 20px;
    display: flex;
    width: 100vw;
    height: 8vh;
    justify-content: space-around;
      .left{
      width: 50vw;
      margin-left: 50px;
    }
      .right{
        width: 45vw;
        height: 10vh;
        margin-left: 100px;
        .tag{
          display: flex;
          .dish_type{
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #595959;
            color: #595959;
            width: 20vw;
            height: 3vh;
            border-radius:20px;
            margin-right: 20px;
            font-weight: 500;
          }
        }
        .right_image{
          display: flex;
          justify-content: space-around;
          width: 150px;
          margin-left: 150px;
          margin-top: 20px;
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
    height: 10vh;
    display: flex;
    justify-content: center;
    border-bottom: 5px solid rgba($color: #F6AC15, $alpha: 0.25);
    align-items: center;
    .comment_avt{
      margin-left: 15px;
    }
    .comment_img{
    border-radius: 50%;
  }
    .comment_inp_div{
      width: 430px;
      height: 78px;
      background-color: #FCE8C5;
      border-radius: 40px;
      margin-left: 20px;
      display: flex;
      justify-content: left;

      .comment_inp{
        margin-left: 20px;
        height: 78px;
        width: 420px;
        background-color: #FCE8C5;
        border-radius: 40px;
      }
    }
    .comment_btn_div{
        width: 130px;
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: center;
        .comment_btn{
        margin-left: 15px;
        width: 130px;
        height: 66px;
        background-color: #FCE8C5;
        font-family: 'PingFang';
        font-size: 16Px;
        font-weight: 600;
        color: #F6AC15;
        line-height: 66px;
        border-radius: 28px;
        text-align: center;
        transition-duration: 0.5s;
      }
      .comment_btn:active{
        width: 100px;
        height:  50px;
        font-size: 14Px;
        line-height: 50px;
      }
    }
  }
  .comments{
    width: 100vw;
    height: 600px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    padding-top: 30px;
    overflow: scroll;
    .single_comment{
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      justify-content: right;
      .comment_comment{
        width: 70px;
        height: 50px;
        display: flex;
        .comment_good{
          width: 30px;
          height: 30px;
          object-fit: fill;
          margin-right: 20px;
        }
        .comment_bad{
          width: 30px;
          height: 30px;
          transform: scaleY(-1);
          object-fit: fill;
        }
      }
      .comment_img{
        margin-right: 50px;
      }
      .comment_right{
        width: 50vw;
        .comment_username{
          font-family: 'PingFang';
          font-size: 16Px;
          font-weight: 600;
          color: #A1A1A1;
        }
        .comment_info{
          width: 50vw;
          word-break: break-all;
          font-family: 'PingFang';
          font-size: 12Px;
        }
      }
    }
  }
 }
</style>
