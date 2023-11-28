<template>
  <div class="eatdiary">
    <nut-tabs v-model="value.buttom">
      <template #titles>
        <div class="tab_left">
          <div class="tabs" style="display: flex;flex-direction: column;">
            <div class="top_tab" style="display: flex;">
              <div class="nut-tabs__titles-item" v-for="item in tabMonth" :class="{ active: value.top == item.paneKey }">
                <span :class="{ 'activeMonth': value.top == item.paneKey, 'defaultMonth': value.top != item.paneKey }"
                  style="font-family:'PingFang SC';font-size: 16px;font-weight: 500;">{{ item.title }}</span>
              </div>
            </div>
            <div class="buttom_tab" style="display: flex;">
              <div class="nut-tabs__titles-item" v-for="item in tabDay" @click=changeTabs(item)
                :class="{ active: value.buttom == item.paneKey }" :key="item.paneKey">
                <div class="top_circle" :class="{ 'activeCss': value.buttom == item.paneKey }">
                  <div :class="{ 'activeDay': value.buttom == item.paneKey, 'defaultDay': value.buttom != item.paneKey }"
                    style="font-size: 16px;font-family: 'DM Sans';font-weight: 500;">{{
                      item.title }}</div>
                </div>
                <span class="nut-tabs__titles-item__line"></span>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class="tab_right" style="display: flex;align-items: center;">
          <IconFont name="date" @click="openSwitch('isVisible')" size="20"></IconFont>
          <nut-calendar v-model:visible="state.isVisible" :start-date="startDate" :end-date="null"
            @close="closeSwitch('isVisible')" @choose="setChooseValue">
          </nut-calendar>
        </div> -->
      </template>
      <nut-tab-pane v-for="item in tabDay" :pane-key="item.paneKey">
        <view class="con">
          <view v-for="item in diary" :key="item.time">
            <view class="con-item" style="display: flex;">
              <view class="left">
                <view
                  style="font-size: 14px; font-family: 'DM Sans'; font-weight: 500; margin-bottom: 5px;text-align: right;">
                  {{ item.year }}</view>
                <view style="font-size: 16px; font-family: 'DM Sans'; font-weight: 700;line-height: 21px;">{{ item.day }}</view>
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
      </nut-tab-pane>
    </nut-tabs>
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
            @cancel="date_show = false" :is-show-chinese="true">
          </nut-date-picker>
        </nut-popup>
      </view>
      <text class="pop_title">时间</text>
      <view class="inside_button">
        <nut-cell :title="time_popupDesc" @click="time_show = true"></nut-cell>
      </view>
      <nut-popup position="bottom" v-model:visible="time_show">
        <nut-date-picker v-model="currentTime" title="时间选择" type="hour-minute" :min-date="minDate" :max-date="maxDate"
          @cancel="time_show = false" @confirm="confirm"></nut-date-picker>
      </nut-popup>
      <text class="pop_title">标题</text>
      <nut-input v-model="val" placeholder="请输入文本" />
      <text class="pop_title">文字</text>
      <nut-textarea v-model="record" />
      <text class="pop_title">图片</text>
      <view class="my-shop-img" @click="myUploadImg">
              <image class="my-shop-img" :src="uploadUrl"></image>
            </view>
      <!-- <view style="display: flex;align-items: flex-end;"><nut-uploader url="" :before-upload="myUploadImg"
          :source-type="['album', 'camera']"></nut-uploader>
        <view class="final_button" @click="dialogIt"><span
            style="font-size: 20px;font-family: 'PingFang SC';font-weight: 400;text-align: center;color: #595959;line-height: 35px;">记录</span>
        </view>
      </view> -->
      <view class="final_button" @click="dialogIt"><span
            style="font-size: 20px;font-family: 'PingFang SC';font-weight: 400;text-align: center;color: #595959;line-height: 35px;">记录</span>
        </view>
    </nut-popup>
  </div>
</template>
<script  setup>
import { onMounted, reactive, ref } from 'vue'
import { IconFont } from '@nutui/icons-vue-taro';
import Taro, { getStorageSync } from "@tarojs/taro";
import { getTimeLine } from "../../request/new_api.js";

const uploadUrl = ref("");
const record = ref('');//标题
const date_show = ref(false);
const time_show = ref(false);
const date_popupDesc = ref("选择日期");
const time_popupDesc = ref("选择时间");
const minDate = new Date(2022, 1, 1);
const maxDate = new Date(2030, 10, 1);
const currentDate = new Date();
const currentTime = new Date();
const val = ref('');
const conTempUrl = ref('')
const myUploadImg = () => {
  Taro.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success: (res) => {
      console.log(res.tempFiles[0].tempFilePath)
      console.log(res.type)
      uploadUrl.value = res.tempFiles[0].tempFilePath
    }
  })
}
const dialogIt = async () => {
  console.log(uploadUrl.value)
  //var form = new FormData();
  const date1 = new Date();
  const isoString1= date1.toISOString();
  Taro.uploadFile({
    url:'https://luke.host:9001/dialog/upload?title='+val.value+'&context='+record.value+'&createTime='+isoString1+'&userId='+getStorageSync('userId'),
    //  headers: {
    //    'Content-Type':"multipart/form-data",
    //  },
    name:'file',
    filePath:uploadUrl.value,
    //  formData: {
    //    "userId": 4,
    //    "content": 'sssssssssssss',
    //    "reviewTime": '2023-11-28T14:35:12.837Z',
    //    "title": 'ssssssss'
    //  },
    success: function (res) {
      console.log(res)
    },
  })
  // var form = new FormData();
  // const dialog_res = await postDialog(form)
  // console.log(dialog_res)
  // if (dialog_res.data.code == 200) {
  //   Taro.showToast({
  //     title: '记录成功',
  //     icon: 'success',
  //     duration: 2000
  //   })
  //   button_show.value = false
  //   getDateLine()
  // }
}
const beforeXhrUpload = (taroUploadFile, options) => {
  Taro.chooseMedia({
    count: 1,
    mediaType: ['image'],
    sourceType: ['album', 'camera'],
    maxDuration: 30,
    camera: 'back',
    success: (res) => {
      console.log(res.tempFiles)
      console.log(res.type)
      conTempUrl.value = res.tempFiles[0].tempFilePath
    }
  })

  // console.log(options);
  // //taroUploadFile  是 Taro.uploadFile ， 你也可以自定义设置其它函数
  // const uploadTask = taroUploadFile({
  //   url: options.url,
  //   filePath: options.taroFilePath,
  //   fileType: options.fileType,
  //   header: {
  //     'Content-Type': 'multipart/form-data',
  //     ...options.headers
  //   }, //
  //   formData: options.formData,
  //   name: options.name,
  //   success(response) {
  //     if (options.xhrState == response.statusCode) {
  //       options.onSuccess?.(response, options);
  //     } else {
  //       options.onFailure?.(response, options);
  //     }
  //   },
  //   fail(e) {
  //     options.onFailure?.(e, options);
  //   }
  // });
  // options.onStart?.(options);
  // uploadTask.progress((res) => {
  //   options.onProgress?.(res, options);
  //   // console.log('上传进度', res.progress);
  //   // console.log('已经上传的数据长度', res.totalBytesSent);
  //   // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend);
  // });
  // // uploadTask.abort(); // 取消上传任务
};
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

const button_show = ref(false);
const value = ref({ top: 'c3', buttom: 3 });
const tabMonth = ref([
]);
const tabDay = ref([
]);
const timelineList = reactive({
  data: []
})
const diary = ref([
  {
    year: "2023年",
    day: "7月23日",
    time: "7:30",
    image: "",
    content: "今天吃了玫瑰园麻辣烫，感觉淀粉肠太好吃了"
  },
  {
    year: "2023年",
    day: "7月23日",
    time: "12:00",
    image: "https://images.fzuhuahuo.cn/%E5%90%83%E9%A5%AD%E5%B0%8F%E7%A8%8B%E5%BA%8F/Rectangle%2067.png",
    content: "今天吃了这个哦"
  },
  {
    year: "2023年",
    day: "7月23日",
    time: "18:30",
    image: "",
    content: "今晚胃不舒服，喝了一碗皮蛋瘦肉粥，意想不到的暖胃。好喝！"
  },
  // {
  //   year: "2023年",
  //   day: "7月23日",
  //   time: "7:30",
  //   image: "",
  //   content: "吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭"
  // },
  // {
  //   year: "2023年",
  //   day: "7月23日",
  //   time: "12:00",
  //   image: "",
  //   content: "吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭吃了一碗饭"
  // },

])
const state = reactive({
  dateWeek: '',
  date: '',
  isVisible: false
});
let map = new Map();
map.set('01', 'Jan');
map.set('02', 'Feb');
map.set('03', 'Mar');
map.set('04', 'Apr');
map.set('05', 'May');
map.set('06', 'Jun');
map.set('07', 'Jul');
map.set('08', 'Aug');
map.set('09', 'Sep');
map.set('10', 'Oct');
map.set('11', 'Nov');
map.set('12', 'Dec');

const getDay = (day, today) => {
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds);

  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  return tYear + "-" + tMonth + "-" + tDate;
}
const doHandleMonth = (month) => {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
}
const getMonth = (month, gap) => {
  month = Number(month) + gap;
  if (month > 12) {
    month = month - 12;
  }
  if (month <= 0) {
    month = 12 + month;
  }
  month = month.toString();
  if (month.length == 1) {
    month = '0' + month;
  }
  return month;
}
var today = new Date();
const startDate = ref(getDay(-14, today));

const init = () => {
  var today = new Date();
  var title1 = getDay(-2, today);
  today = new Date();
  var title2 = getDay(-1, today);
  today = new Date();
  var title3 = getDay(0, today);
  today = new Date();
  var title4 = getDay(1, today);
  today = new Date();
  var title5 = getDay(2, today);
  tabDay.value = [{
    title: title1.split('-')[2],
    paneKey: 1
  },
  {
    title: title2.split('-')[2],
    paneKey: 2
  },
  {
    title: title3.split('-')[2],
    paneKey: 3
  },
  {
    title: title4.split('-')[2],
    paneKey: 4
  },
  {
    title: title5.split('-')[2],
    paneKey: 5
  }];
  tabMonth.value = [{
    title: map.get(getMonth(title1.split('-')[1], -2)),
    paneKey: 'c1'
  },
  {
    title: map.get(getMonth(title2.split('-')[1], -1)),
    paneKey: 'c2'
  },
  {
    title: map.get(title3.split('-')[1]),
    paneKey: 'c3'
  },
  {
    title: map.get(getMonth(title4.split('-')[1], 1)),
    paneKey: 'c4'
  },
  {
    title: map.get(getMonth(title5.split('-')[1], 2)),
    paneKey: 'c5'
  }];
}

const openSwitch = (param) => {
  state[`${param}`] = true;
};

const closeSwitch = (param) => {
  state[`${param}`] = false;
};

const setChooseValue = (param) => {
  var tDate = new Date(param[3].toString() + ' 12:00:00');
  var title1 = getDay(-2, tDate);
  tDate = new Date(param[3].toString() + ' 12:00:00');
  var title2 = getDay(-1, tDate);
  tDate = new Date(param[3].toString() + ' 12:00:00');
  var title3 = getDay(0, tDate);
  tDate = new Date(param[3].toString() + ' 12:00:00');
  var title4 = getDay(1, tDate);
  tDate = new Date(param[3].toString() + ' 12:00:00');
  var title5 = getDay(2, tDate);
  tabDay.value = [{
    title: title1.split('-')[2],
    paneKey: 'c1'
  },
  {
    title: title2.split('-')[2],
    paneKey: 'c2'
  },
  {
    title: title3.split('-')[2],
    paneKey: 'c3'
  },
  {
    title: title4.split('-')[2],
    paneKey: 'c4'
  },
  {
    title: title5.split('-')[2],
    paneKey: 'c5'
  }];
  tabMonth.value = [{
    title: map.get(getMonth(title1.split('-')[1], -2)),
    paneKey: 'c1'
  },
  {
    title: map.get(getMonth(title2.split('-')[1], -1)),
    paneKey: 'c2'
  },
  {
    title: map.get(title3.split('-')[1]),
    paneKey: 'c3'
  },
  {
    title: map.get(getMonth(title4.split('-')[1], 1)),
    paneKey: 'c4'
  },
  {
    title: map.get(getMonth(title5.split('-')[1], 2)),
    paneKey: 'c5'
  }];
  console.log(getMonth(title2.split('-')[1], -1));
};
const getDateLine = async () => {
  const timeline_res = await getTimeLine({ "userId": 4 })
  timelineList.data = timeline_res.data.data
  for (var i = 0; i <5 ; i++) {
    timelineList.data[i].daylist = []
  }
  for (var i = 0; i <5; i++) {
    var list = timeline_res.data.data[i].timeline[i]
    if (list == undefined) {
      continue
    }
    const map = new Map(Object.entries(list));
    var content = map.get('content')
    var img = map.get('imgUrlList')
    if (img == undefined) {
      img = ''
    }
    var unixtime = map.get('reviewTime')
    var now = new Date(unixtime);
    var year = now.getFullYear()+ '年';
    var m = now.getMonth() + 1;
    var d = now.getDate();
    var h = now.getHours();
    var min = now.getMinutes();
    var day = m + '月' + d + '日'
    var time = h + ':' + min

    timelineList.data[2-i].daylist.push({
      year: year,
      day: day,
      time: time,
      image: img,
      content: content
    })
  }
  diary.value = timelineList.data[2].daylist
  console.log(timelineList.data)
}
const changeTabs = async(item) =>{
  diary.value = timelineList.data[item.paneKey-1].daylist
  value.value.buttom = item.paneKey
}
onMounted(async () => {
  init()
  getDateLine()
}
)
</script>
<style>
.my-shop-img {
  width: 140px;
  height: 140px;
  border-radius: 10Px;
  background-color: white;
  box-shadow: 6px 6px 10px rgba(0, 0, 0, 0.11);

}
.eatdiary {
  background: #FFF9EE;
  height: 100%;
}

:root,
page {
  --nut-tabs-titles-background-color: #FCE8C5;
  --nut-tabs-horizontal-titles-height: 172px;
  --nut-primary-color: #FFC765;
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
  height: 90vh;
  top: 170px;
  padding: 0%;
  background-color: #FFF9EE;
  overflow: scroll;
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

.tab_right {
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
  width: 145px;
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

.nut-popup {
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

















