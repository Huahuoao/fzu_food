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


export function getFoodbyFoodId(data) {
  return request({
    url: '/food/foodId',
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

  export function getFoodLike(data) {
    return request({
      url: '/food/like/',
      method: 'get',
      params: data
    })
  
  }


  export function postFoodLike(data) {
    return request({
      url: '/food/like/click',
      method: 'post',
      params: data
    })
  
  }
  

  export function getLikeNumByFoodId(data) {
    return request({
      url: '/food/like/foodId',
      method: 'get',
      params: data
    })
  
  }

  export function getFoodCollect(data) {
    return request({
      url: '/food/collect',
      method: 'get',
      params: data
    })
  
  }

  export function getFoodCollectList(data) {
    return request({
      url: '/food/collect/list',
      method: 'get',
      params: data
    })
  
  }

  export function getFoodIsCollect(data) {
    return request({
      url: '/food/is-collect',
      method: 'get',
      params: data
    })
  
  }
  

  export function postFoodScore(data) {
    return request({
      url: '/food/score/',
      method: 'post',
      data: data
    })
  
  }


  export function getFoodLikeByFoodId(data) {
    return request({
      url: '/food/like/foodId',
      method: 'get',
      params: data
    })
  
  }
  


