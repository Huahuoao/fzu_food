import request from "./new_request.js"

// 定义接口的传参


// 获取用户信息

export function getSearchStorebyName(data) { //全局搜索店铺
  return request({
    url: '/search/store/name/global',
    method: 'get',
    params: data
  })

}

export function getSearchFoodbyName(data) { //全局搜索店铺
  return request({
    url: '/search/food/name/global',
    method: 'get',
    params: data
  })

}
