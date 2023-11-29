import request from "./new_request.js"

// 定义接口的传参


// 获取用户信息

export function getFoodTagbyID(data) {
  return request({
    url: '/tag/foodId',
    method: 'get',
    params: data
  })

}


export function getFoodTagbyType(data) {
    return request({
      url: '/tag/tagType',
      method: 'get',
      params: data
    })
  
  }