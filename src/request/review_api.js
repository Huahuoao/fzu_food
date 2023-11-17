import request from "./new_request.js"

// 定义接口的传参


// 获取用户信息

export function getReviewStore(data) {
  return request({
    url: '/review/score/store/store',
    method: 'get',
    params: data
  })

}
