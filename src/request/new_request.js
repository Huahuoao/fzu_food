import axios from 'axios'
// 创建一个 axios 实例

const request = axios.create({
    baseURL: 'https://luke.host:9001', // 所有的请求地址前缀部分
    timeout: 5000, // 请求超时时间毫秒

})

export default request
