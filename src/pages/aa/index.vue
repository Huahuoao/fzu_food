<template>
  <view class="aa">
    <text>{{ msg }}</text>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.css'

export default {
  setup () {
    const msg = ref('Hello world')
    return {
      msg
    }
  }
}
</script>
