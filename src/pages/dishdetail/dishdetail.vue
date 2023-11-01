<template>
  <div class="dishdetail">
    <nut-rate :custom-icon="Fabulous" v-model="value" />
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import './dishdetail.css'
import Taro,{getCurrentInstance} from '@tarojs/taro';
import { Fabulous } from '@nutui/icons-vue-taro';
var dish = reactive()
onMounted(()=>{
  dish = JSON.parse(getCurrentInstance().router.params.id)
  console.log(dish)
    console.log('no')
})
</script>
