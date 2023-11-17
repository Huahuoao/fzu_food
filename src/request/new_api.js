import request from "./new_request.js"

// 定义接口的传参


// 获取用户信息

export function getCanteenList(page_size) {
  return request({
    url: '/canteen/',
    method: 'get',
    params: page_size
  })

}

export function getStoreList(page_size) {
  return request({
    url: '/store/',
    method: 'get',
    params: page_size
  })

}

export function getStoreListID(data) {
  return request({
    url: '/store/canteenId',
    method: 'get',
    params: data
  })

}

export function getStorebyID(data) {
  return request({
    url: '/store/storeId',
    method: 'get',
    params: data
  })

}

export function getFoodbyID(data) {
  return request({
    url: '/food/storeId',
    method: 'get',
    params: data
  })

}



export function getImagebyID(data) {
  return request({
    url: '/image/belong',
    method: 'get',
    params: data
  })

}
