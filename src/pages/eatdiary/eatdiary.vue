<template>
  <div class="eatdiary">
    <nut-tabs v-model="value">
      <template #titles>
        <div class="tab_left">
          <div class="tabs" style="display: flex;flex-direction: column;">
            <div class="top_tab" style="display: flex;">
              <div class="nut-tabs__titles-item" v-for="item in month" @click="changeTopList(item)"
                :class="{ active: value.top == item.paneKey }" :key="item.paneKey">
                <span :class="{ 'activeMonth': value.top == item.paneKey, 'defaultMonth': value.top != item.paneKey }"
                  style="font-family:'PingFang SC';font-size: 16px;font-weight: 500;">{{ item.title }}</span>
              </div>
            </div>
            <div class="buttom_tab" style="display: flex;">
              <div class="nut-tabs__titles-item" v-for="item in day" @click="changeButtomList(item)"
                :class="{ active: value.bottom == item.paneKey }" :key="item.paneKey">
                <div class="top_circle" :class="{ 'activeCss': value.bottom == item.paneKey }">
                  <div :class="{ 'activeDay': value.bottom == item.paneKey, 'defaultDay': value.bottom != item.paneKey }"
                    style="font-size: 16px;font-family: 'DM Sans';font-weight: 500;">{{
                      item.title }}</div>
                </div>
                <span class="nut-tabs__titles-item__line"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="tab_right" style="display: flex;align-items: center;">
          <IconFont name="date" @click="openSwitch('isVisible')" size="20"></IconFont>
          <nut-calendar ref="calendarRef" v-model:visible="isVisible" :default-value="date" type="range"
            :start-date="null" :end-date="null" @close="closeSwitch('isVisible')" @choose="setChooseValue">
            <template #day="date">
              <span>{{ date.date.day }}</span>
            </template>
          </nut-calendar>
        </div>
      </template>
      <nut-tab-pane>
        <view class="con">
          <view v-for="item in diary" :key="item.time">
            <view class="con-item" style="display: flex;">
              <view class="left">
                <view
                  style="font-size: 14px; font-family: 'DM Sans'; font-weight: 500; margin-bottom: 5px;text-align: right;">
                  {{ item.year }}</view>
                <view style="font-size: 16px; font-family: 'DM Sans'; font-weight: 700;">{{ item.day }}</view>
              </view>
              <view class="right">
                <view class="circle"></view>
                <view class="time">
                  <view class="line"></view>
                  <view class="text">{{ item.time }}</view>
                </view>
                <view class="r_box">
                  <view class="up_text" v-if="item.image!=''">
                    <image :src="item.image" class="text_image"></image>
                  </view>
                  {{ item.content }}
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="out_button">
          <nut-cell @click="button_show = true"><text class="button_text">记录</text></nut-cell>
        </view>
        <nut-popup position="bottom" closeable round :style="{ height: '85%' }" v-model:visible="button_show"
          :overlay="false">
          <text class="pop_title">日期</text>
          <view>
            <view class="inside_button">
              <nut-cell :title="date_popupDesc" @click="date_show = true"></nut-cell>
            </view>
            <nut-popup position="bottom" v-model:visible="date_show">
              <nut-date-picker v-model="currentDate" :min-date="minDate" :max-date="maxDate" @confirm="popupConfirm"
                :is-show-chinese="true">
                <nut-button block type="primary" @click="alwaysFun">永远有效</nut-button>
              </nut-date-picker>
            </nut-popup>
          </view>
          <text class="pop_title">时间</text>
          <view>
            <view class="inside_button">
              <nut-cell :title="time_popupDesc" @click="time_show = true"></nut-cell>
            </view>
            <nut-popup position="bottom" v-model:visible="time_show">
              <nut-date-picker v-model="currentTime" title="时间选择" type="hour-minute" :min-date="minDate"
                :max-date="maxDate" @confirm="confirm"></nut-date-picker>
            </nut-popup>
          </view>
          <text class="pop_title">标题</text>
          <nut-input v-model="val" placeholder="请输入文本" />
          <text class="pop_title">文字</text>
          <nut-textarea v-model="record"  />
          <text class="pop_title">图片</text>
          <view style="display: flex;align-items: flex-end;"><nut-uploader :url="uploadUrl"
              :source-type="['camera']"></nut-uploader><view class="final_button"><span
                style="font-size: 20px;font-family: 'PingFang SC';font-weight: 400;text-align: center;color: #595959;line-height: 35px;">记录</span></view>
          </view>
        </nut-popup>
      </nut-tab-pane>
    </nut-tabs>
  </div>
</template>
<script  setup>
import { reactive, toRefs, ref } from 'vue';
import { IconFont } from '@nutui/icons-vue-taro';
const record = ref('');
const date_show = ref(false);
const time_show = ref(false);
const date_popupDesc = ref("选择日期");
const time_popupDesc = ref("选择时间");
const minDate = new Date(2021, 0, 1);
const maxDate = new Date(2026, 10, 1);
const currentDate = new Date(2023, 4, 10, 10, 10);
const currentTime = new Date(2023, 4, 10, 10, 10);
const val = ref('');
const confirm = ({ selectedValue, selectedOptions }) => {
  console.log(selectedValue.join(':'));
  time_popupDesc.value = selectedOptions.map((val) => val.text).join(':');
  time_show.value = false;
};
const popupConfirm = ({ selectedValue, selectedOptions }) => {
  console.log(selectedValue.join(':'));
  // date_popupDesc.value = selectedOptions.map((val) => val.text).join('');
  date_popupDesc.value = selectedValue.join('/')
  date_show.value = false;
};
const alwaysFun = () => {
  date_popupDesc.value = '永远有效';
  date_show.value = false;
};
const button_show = ref(false);
const value = ref({ top: 'c3', bottom: 'c3' });
const changeTopList = (item) => {
  value.value.top = item.paneKey
};
const changeButtomList = (item) => {
  value.value.bottom = item.paneKey
};
const month = ref([
  {
    title: 'May',
    paneKey: 'c1'
  },
  {
    title: 'Jun',
    paneKey: 'c2'
  },
  {
    title: 'Jul',
    paneKey: 'c3'
  },
  {
    title: 'Aug',
    paneKey: 'c4'
  },
  {
    title: 'Sep',
    paneKey: 'c5'
  }
]);
const day = ref([
  {
    title: '22',
    paneKey: 'c1'
  },
  {
    title: '23',
    paneKey: 'c2'
  },
  {
    title: '24',
    paneKey: 'c3'
  },
  {
    title: '25',
    paneKey: 'c4'
  },
  {
    title: '26',
    paneKey: 'c5'
  }
]);
const diary = ref([
  {
    year: "2023年",
    day: "7月23日",
    time: "7:30",
    image: "",
    content: "吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭"
  },
  {
    year: "2023年",
    day: "7月23日",
    time: "12:00",
    image: "https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Rectangle%2067.png",
    content: "吃了一碗饭吃了一碗饭"
  },
  {
    year: "2023年",
    day: "7月23日",
    time: "18:30",
    image: "",
    content: "吃了一碗饭"
  },
  // {
  //   year: "2023年",
  //   day: "7月23日",
  //   time: "7:30",
  //   content: "吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭"
  // },
  // {
  //   year: "2023年",
  //   day: "7月23日",
  //   time: "12:00",
  //   content: "吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭"
  // },

])
const state = reactive({
  date: [],
  isVisible: false
});
const calendarRef = ref(null);
const getNumTwoBit = (n) => {
  n = Number(n);
  return (n > 9 ? '' : '0') + n;
};

const date2Str = (date, split = '-') => {
  const y = date.getFullYear();
  const m = getNumTwoBit(date.getMonth() + 1);
  const d = getNumTwoBit(date.getDate());
  return [y, m, d].join(split);
};

const getDay = (i = 0) => {
  let date = new Date();
  const diff = i * (1000 * 60 * 60 * 24);
  date = new Date(date.getTime() + diff);
  return date2Str(date);
};

const isLeapYear = (y) => {
  return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
};

const getMonthDays = (year, month) => {
  if (/^0/.test(month)) {
    month = month.split('')[1];
  }
  return ([0, 31, isLeapYear(Number(year)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]);
};

const openSwitch = (param) => {
  state[`${param}`] = true;
};

const closeSwitch = (param) => {
  state[`${param}`] = false;
};

const setChooseValue = (param) => {
  state.date = param[3];
};

const { date, isVisible } = toRefs(state);
</script>
<style>
.eatdiary {
  background: #FFF9EE;
  height: 100%;
}

:root,
page {
  --nut-tabs-titles-background-color: #FCE8C5;
  --nut-tabs-horizontal-titles-height: 172px;
}

.nut-tabs__titles-item.active .nut-tabs__titles-item__line {
  top: 80px;
  width: 60px;
  border: 1px solid #595959;
  background: #595959;
  border-radius: 8px;
}

.activeCss {
  display: flex;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #595959;
  justify-content: center;
  align-items: center;
}

.activeMonth {
  color: #000000;
}

.defaultMonth {
  color: #a1a1a1;
}

.activeDay {
  color: rgba(255, 255, 255, 1);
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 16px;

}

.defaultDay {
  color: rgba(89, 89, 89, 1);
  font-family: 'DM Sans';
  font-weight: 500;
  font-size: 16px;
}

.nut-tabs__titles .nut-tabs__list {
  justify-content: center;
  margin-top: 10px;
  top: 0;
}

.nut-tabs__titles {
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;

}

.nut-tab-pane {
  height: 90%;
  position: fixed;
  top: 170px;
  padding: 0%;
  background-color: #FFF9EE;
}
.tabs {
  align-items: center;
}

.top_tab {
  align-items: center;
}

.buttom_tab {
  margin: 0 auto;
  margin-top: 20px;
  width: 594px;
  align-items: center;
}
.tab_right{
  position: absolute;
  top: 15px;
  right: 40px;
}
.con {
  flex: 1;
  height: 80%;
  margin: 40px auto;
  box-sizing: border-box;
  padding: 37px 24px;
  font-size: 24px;
  font-weight: 500;
  color: #4d4d4d;
}

.left {
  width: 130px;
  text-align: center;
  line-height: 33px;
  margin-right: 60px;
  flex-shrink: 0;
  padding-right: 10px;
}

.right {
  flex: 1;
  font-size: 26px;
  font-weight: 500;
  line-height: 37px;
  color: #333;
  position: relative;
  
}

.right::after {
  content: '';
  position: absolute;
  width: 4px;
  background: #FCE8C5;
  border-radius: 4px;
  height: 100%;
  left: -40px;
  top: 35px;
}

.right .circle {
  position: absolute;
  width: 29px;
  height: 29px;
  border: 4px solid #FCE8C5;
  border-radius: 50%;
  top: 0px;
  left: -54px;
  z-index: 2;
  background: transparent;
}

.right .circle::after {
  content: '';
  position: absolute;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #FFC765;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.right .time {
  font-family: 'DM Sans';
  font-size: 40px;
  font-weight: 400;
  line-height: 56px;
  color: #595959;
  
}
.time .line {
  position: absolute;
  width: 105px;
  height: 14px;
  
  top: 30px;
  background: #FFC765;
  border-radius: 7px;
  z-index: 1;
}

.text_image {
  width: 140px;
  height: 140px;
  border-radius: 20px;
}

.time .text {
  position: relative;
  width: 105px;
  text-align: center;
  z-index: 2;
}

.r_box {
  width: 453px;
  border-radius: 14px;
  box-sizing: border-box;
  padding: 16px 28px 23px 29px;
  position: relative;
  margin-bottom: 60px;
  background: #FFC765;
  border: 6px solid #FCE8C5;
  border-radius: 40px;
}

.out_button .nut-cell {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #FFC765;
  border: 12px solid #FCE8C5;
  position: fixed;
  left: 72.53%;
  right: 8.8%;
  bottom: 6%;
  padding: 0%;
  justify-content: center;
  align-items: center;
}

.button_text {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 42px;
  line-height: 34px;
  align-items: center;
  text-align: center;
  color: #595959;
}

.nut-tab-pane .nut-popup {
  background: #FCE8C5;
  box-shadow: 0px -8px 20px rgba(0, 0, 0, 0.1);
}

.pop_title {
  font-family: 'PingFang SC';
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 56px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #000000;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: 40px;
}

.inside_button .nut-cell {
  width: 256px;
  height: 48px;
  margin-left: 40px;
  background: #FFF9EE;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  justify-content: center;
  align-items: center;
}

.inside_button .nut-cell::before {
  content: '';
  position: absolute;
  width: 0px;
  height: 0px;
  border: 10px solid transparent;
  border-top: 10px solid #595959;
  right: 15px;
  top: 20px;
}

.nut-input {
  width: 372px;
  height: 48px;
  background: #FFF9EE;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  margin-left: 40px;
  justify-content: center;
  align-items: center;
}

.nut-textarea {
  width: 642px;
  min-height: 240px;
  max-height: 480px;
  /* height: 240px; */
  background: #FFF9EE;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  margin-left: 40px;
  overflow: scroll;
}

 .picture {

  width: 200px;
  height: 200px;
  margin-left: 40px;
  background: #FFF9EE;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
}

.final_button {
  position: absolute;
  width: 176px;
  height: 72px;
  background: #FFC765;
  box-shadow: -4px 4px 4px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  right: 54px;
}
</style>

















