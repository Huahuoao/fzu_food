import request from "./new_request.js"

// 定义接口的传参


// 获取用户信息

export function postRandom(data) {
  return request({
    url: '/random/food/filter-by-tagId',
    method: 'post',
    data: data
  })

}