<template>
  <nut-row>
    <button open-type="chooseAvatar" @chooseAvatar="bind"
            style="border-radius: 50vw;width: 8rem;height: 8rem;"></button>
  </nut-row>
  <nut-row>
    <input type="nickname"/>
  </nut-row>
  <nut-row type="flex" justify="center">
    <nut-button>注册</nut-button>
  </nut-row>
</template>

<script setup>
import {ref} from 'vue'
import './register.css'
import Taro from "@tarojs/taro";

const code = ref()
const fileManager = Taro.getFileSystemManager()

const login = () => {
  Taro.login().then(res => {
    code.value = res.code
    console.log(code.value)
  })
}

const bind = (event) => {
  console.log(event.detail.avatarUrl)
  const headImgBase64 = fileManager.readFileSync(event.detail.avatarUrl, "base64")
}
</script>
<style scoped>
</style>

