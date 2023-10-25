// 导入axios实例
import request from "./request.js"

// 定义接口的传参


// 获取用户信息
export function upload(param) {
    return request({
        url: '/history/upload',
        method: 'post',
        params: param,
    })
}

