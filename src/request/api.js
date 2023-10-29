import request from "./request.js"

// 定义接口的传参


// 获取用户信息
export function register(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data,
  })
}

export function getUserByUnionId(id) {
  return request({
    url: '/user',
    method: 'get',
    params: {
      unionId: id,
    }
  })
}

export function getUnionId(jsCode) {
  return request({
    url: '/user/unionId',
    method: 'get',
    params: {
      jsCode: jsCode
    }
  })

}

