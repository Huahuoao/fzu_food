<template>
  <view class="dishdetail">
    <view class="head_image_area">
      <view class="title-medium" style="height: 20px;width: 400px;text-align: center;">{{ dish.data.foodName }} </view>
      <nut-rate v-model="star"  class="star" count="1" active-color="#F6AC15" void-color="#FFFFFF" @click="collect"/>
      <image :src="imgUrlList[0]" class="head_image" />
    </view>
    <view class="head_detail">
        <view class="left">
          <div style="display: flex;align-items: center;">
            <IconFont name="right"></IconFont>
            <text class="input-text" style="font-weight: 600;">{{ dish.data.storeName }} </text>
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
            <nut-animate type="shake" :show="show1" style="">
              <image src="https://images.fzuhuahuo.cn/good_ash.png" class="good" v-if="likelist.data.like == false" :onTap="goodClick"/>
            <image src="https://images.fzuhuahuo.cn/good_red.png" class="good" v-if="likelist.data.like == true" :onTap="goodClick"/>
          </nut-animate>
          <view class="text-small" style="width: 50px;font-weight: 600;">{{ likelist.data.likenum }}</view>
          <nut-animate type="shake" :show="show2" style="margin-left: 15px;">
            <image src="https://images.fzuhuahuo.cn/good_ash.png" class="bad " v-if="likelist.data.unlike == false" :onTap="badClick"/>
            <image src="https://images.fzuhuahuo.cn/good_red.png" class="bad" v-if="likelist.data.unlike == true" :onTap="badClick"/>
          </nut-animate>
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
          <nut-popover v-model:visible="popvisible" location="top" :offset=[-70,10] arrow-offset=40 @open="openPop">
            <template #reference>
              <div class="comment_btn" @click="submit" style="border: none;">{{comment==''?'评分':'评论'}}</div>
            </template>
            <template #content >
              <div class="score_food">
                <nut-rate v-model="score"  class="star" count="5" active-color="#F6AC15" void-color="#FFFFFF" size="20" style="margin-top: 3px;" @change="scoreFood"  />
              </div>
            </template>
          </nut-popover>
        
      </div>
    </view>
      <view class="comments">
        <view class="single_comment" v-for="(item,index) in commentlist.data">
        <nut-avatar class="comment_img" size="normal">
        <img
          :src="item.avatarUrl" style="border-radius: 50%;"
        />
      </nut-avatar>
      <view class="comment_right">
        <view class="comment_username">{{ item.username }}</view>
        <view class="comment_info">{{ item.content }}</view>
      </view>
        </view>
      </view>
  </view>
</template>

<script setup>
import { reactive, ref,onBeforeMount} from 'vue'
import './dishdetail.css'
import Taro,{getCurrentInstance, getStorageSync} from '@tarojs/taro';
import { IconFont } from '@nutui/icons-vue-taro';
import { getFoodTagbyID } from '../../request/tagapi';
import { getFoodbyFoodId,getFoodLike,postFoodLike,getFoodIsCollect,postFoodScore,getFoodCollect,getFoodLikeByFoodId } from '../../request/food_api';
import {getCommentOfFood,postCommentOfFood } from '../../request/review_api';
import { getUserByUnionId,getUnionId } from '../../request/api';
import { getStorebyID } from '../../request/new_api';
var score = ref(0)
var show1 = ref(false)
var show2 = ref(false)
var id = ref(0)
var star = ref(0)
var dish = reactive({data:{}})
var imgUrlList = ref([])
var comment = ref('')
var avatarurl = ref('https://images.fzuhuahuo.cn/default_headImg.jpeg')
var popvisible = ref(false)
var score  = ref(0)
var userid = ref(0)
var likelist = reactive({
  data:{
    like:false,
    unlike:false,
    likenum:0
  }
})
var commentlist = reactive({
  data:[]
})
var tag = reactive({
  data:[]
})
const openPop = ()=>{
  if(comment.value != ''){
    popvisible.value = false
  }
}
const goodClick = async()=>{
    const like_res = await postFoodLike({"foodId":id.value,"userId":userid.value})
    if(likelist.data.like == true){
      likelist.data.likenum  = likelist.data.likenum  - 1
    }
    else{
      likelist.data.likenum  = likelist.data.likenum  + 1
    }
    likelist.data.like = !likelist.data.like
      show1.value = true
      setTimeout(()=>{
        show1.value = false
      },1000)
  }
const badClick = ()=>{
  likelist.data.unlike = !likelist.data.unlike
  show2.value = true
  setTimeout(()=>{
        show2.value = false
      },1000)
}
const scoreFood = async(value)=>{
  popvisible.value = false
  const score_res = await postFoodScore({"foodId":id.value,"userId":userid.value,"foodScore":score.value})
  console.log(score_res.data.data)
  Taro.showToast({
    title: '评分成功！',
    duration: 2000
  })
}
const collect  = async(item)=>{
   const collect_res = await getFoodCollect({"foodId":id.value,"userId":Taro.getStorageSync('userId')})
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
   }
  id.value = JSON.parse(getCurrentInstance().router.params.id)
  commentlist.data =  (await getCommentOfFood({"foodId":id.value,'page':0,'size':500})).data.data
  likelist.data.like = (await getFoodLike({"foodId":id.value,"userId":userid.value})).data.data
  likelist.data.likenum = (await getFoodLikeByFoodId({"foodId":id.value})).data.data
  dish.data = (await getFoodbyFoodId({"foodId":id.value})).data.data
  if(dish.data.imgUrlList.length==0){
    dish.data.imgUrlList.push('https://images.fzuhuahuo.cn/QQ%E5%9B%BE%E7%89%8720231129233810.jpg')
  }
  
  imgUrlList.value = dish.data.imgUrlList
  tag.data =  (await getFoodTagbyID({"foodId":id.value})).data.data
  const store_res =  await getStorebyID({"storeId":dish.data.storeId})
  dish.data.storeName = store_res.data.data.storeName
  dish.data.location = store_res.data.data.location

  //是否收藏食物
  const collect_res = await getFoodIsCollect({"foodId":id.value,"userId":Taro.getStorageSync("userId")})
  if(collect_res.data.data == true){
    star.value = 1
  }
  else{
    star.value =0
  }
})
const submit = async()=>{
  if(comment.value != ''){
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
      "content": comment.value,
      "foodId": id.value,
      "reviewTime": isoString1,
      "userId": userid.value,
    }
    const review_res = await postCommentOfFood(form)
    console.log(review_res.data.data)
    comment.value = ''
    try{
      commentlist.data.unshift(review_res.data.data)
      Taro.showToast({
          title: '评论发布成功！',
          duration: 2000
        })
    }
    catch{
      
    }
  }
  else{
    return 
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
  width: 750px;
  .head_image_area{
    width: 750px;
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
          text-align: center;
          align-items: center;
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
      height: 74px;
      background-color: #FCE8C5;
      border-radius: 40px;
      margin-left: 20px;
      display: flex;
      justify-content: left;
      align-items: center;

      .comment_inp{
        height: 74px;
        width: 420px;
        background-color: #FCE8C5;
        border-radius: 40px;
      }
    }
    .comment_btn_div{
        width: 130px;
        height: 74px;
        display: flex;
        align-items: center;
        justify-content: center;
        .comment_btn{
        margin-left: 15px;
        width: 130px;
        height: 74px;
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
        width: 65vw;
        .comment_username{
          font-family: 'PingFang';
          font-size: 16Px;
          font-weight: 600;
          color: #A1A1A1;
        }
        .comment_info{
          width: 65vw;
          word-break: break-all;
          font-family: 'PingFang';
          font-size: 12Px;
        }
      }
    }
  }
}
.score_food{
  background-color: #FCE8C5;
  height: 69px;
  width: 340px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}
</style>
