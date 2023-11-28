import request from "./dialog.js"



export function postDialog(data) {
    return request({
      url: '/dialog/upload',
      method: 'post',
      data: data
    })
  
  }