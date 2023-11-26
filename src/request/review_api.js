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

export function getReviewOfFood(data) {
  return request({
    url: '/review/foodId',
    method: 'get',
    params: data
  })
}

export function postReview(data) {
  return request({
    url: '/review/',
    method: 'post',
    data: data
  })
}

export function getReviewIsUserDisliked(data) {
  return request({
    url: '/review/isUserDisliked',
    method: 'get',
    params: data
  })
}

export function getReviewIsUserLiked(data) {
  return request({
    url: '/review/isUserLiked',
    method: 'get',
    params: data
  })
}

export function postReviewLike(data) {
  return request({
    url: '/review/like',
    method: 'post',
    params: data
  })
}

export function postReviewDislike(data) {
  return request({
    url: '/review/dislike',
    method: 'post',
    params: data
  })
}
