<template>
<nut-button @click="handleRegister">跳转到注册</nut-button>
</template>

<script setup>
import Taro from "@tarojs/taro";

const handleRegister = ()=>{
  Taro.navigateTo({
    url: '/pages/register/register',
  })
}
</script>
<style scoped>


</style>
