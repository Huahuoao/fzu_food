<template>
    <div class="store">
      <div class="search">
          <div class="search_line">
            <input v-model="search_data" class="search_input">
            <nut-divider direction="vertical"  style="background-color: black;height: 70%;"/>
            <IconFont name="search" size="20px" style="margin-right: 2.5vw;"></IconFont>
          </div>
        </div>
        <div class="store_list">
          <nut-tabs v-model="tabvalue" @click="changeTab" color="black" background="#F6AC15">
            <template #titles>
              <div
                class="nut-tabs__titles-item"
                @click="tabvalue = item.paneKey"
                :class="{ active: tabvalue == item.paneKey }"
                :key="item.paneKey"
                v-for="item in list"
                style="border: 1px solid transparent;
                border-image: linear-gradient(to bottom, #f00, #00f) 0.5;"
              >
                <span class="nut-tabs__titles-item__text">{{ item.title }}</span>
                <span class="nut-tabs__titles-item__line"></span>
                <nut-divider direction="vertical"  style="background-color: black;height: 70%;"/>
              </div>
          </template>
          <nut-tab-pane v-for="item in list" :pane-key="item.paneKey"> 
            <div class="box"></div>
          </nut-tab-pane>
          </nut-tabs>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import './store.css'
import { IconFont } from '@nutui/icons-vue-taro';
var search_data = ref()
var tabvalue = ref(0)
const list = ref([
  {
    title: '自定义 1',
    paneKey: '0'
  },
  {
    title: '自定义 2',
    paneKey: '1'
  },
  {
    title: '自定义 3',
    paneKey: '2'
  }
])
const changeTab = (tab) => {
  tabvalue.value = tab.paneKey;
  console.log(tab.paneKey)
};
</script>
<style>
.box {
  width: 200px;
  height: 200px;
  border: 100px solid transparent;
  border-image: linear-gradient(to bottom, #f00, #00f) 1;
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
  justify-content: space-around;
}
.search_line{
  width: 80%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 5%;
  box-shadow: 5px 5px 20px -5px rgba(0,0,0,0.5);
  background-color: #FFC765
}
.search_input{
  height: 100%;
  width: 80%;
}
.store_list{
  width: 100%;
  height: 90%;
  background-color: #F6AC15;
}
</style>
