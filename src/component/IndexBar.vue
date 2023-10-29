<template>
  <view class="index-bar">
    <view class="inner-bar">
      <view class="inner-bar-ball">
      </view>
      <image  :src="props.iconUrl" style=" width:35px; height: 32px;  z-index: 999;">
      </image>
    </view>
    <view class="indexBarText">
      <text class="indexbart1" >{{ props.title }}{{ br }}</text>
      <text class="indexbart2">{{ props.msg }}</text>
    </view>
    <image :src="props.backgroundUrl"
           style="width: 38%; height: 65%;position: absolute; bottom: 5px;right: 8px;"></image>
  </view>
</template>

<script setup>
import {ref} from "vue";
import {useLoad} from "@tarojs/taro";

const br = ref("\n")
let props = defineProps({
  title: String,
  msg: String,
  iconUrl: String,
  backgroundUrl: String
});
useLoad(() => {
  console.log(props.iconUrl)
})

</script>

<style>
.index-bar {
  margin:34px;
  position: relative;
  display: flex;
  width: 300px;
  height: 185px;
  background-color: rgba(255, 199, 101, 1);
  border-radius: 30px;
  align-items: center;
}

.inner-bar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 28px;
  min-width: 96px;
  min-height: 96px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
}

.inner-bar-ball {
  z-index: 1;
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgba(246, 172, 21, 1);
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
}

.indexbart1 {
  font-size: 32px;
  font-weight: bold;
  line-height: 44px;
  letter-spacing: 0em;
  text-align: center;

}

.indexbart2 {

  font-size: 24px;
  font-weight: normal;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;


}

.indexBarText {
  margin-left: 10px;
}
</style>
