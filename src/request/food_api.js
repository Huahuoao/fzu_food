import request from "./new_request.js"

// 定义接口的传参


// 获取用户信息

export function getFoodbyId(data) {
  return request({
    url: '/food/storeId',
    method: 'get',
    params: data
  })

}

export function getFoodbyTag(data) {
    return request({
      url: '/food/tagId',
      method: 'get',
      params: data
    })
  
  }

  export function getFood(data) {
    return request({
      url: '/food/',
      method: 'get',
      params: data
    })
  
  }
  
