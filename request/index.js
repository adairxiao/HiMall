let ajaxTimes = 0

export const request = (params) => {
  ajaxTimes++
  wx.showLoading({
    title: '加载中',
    mask: true,
  })

  // 处理header
  let contentType = ['Get', 'get'].includes(params.method)
    ? 'application/json'
    : 'application/x-www-form-urlencoded'

  return new Promise((resolve, reject) => {
    var reqTask = wx.request({
      ...params,
      header: {
        'content-type': contentType,
      },
      success: (result) => {
        resolve(result)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--
        if (ajaxTimes === 0) {
          wx.hideLoading()
          wx.stopPullDownRefresh()
        }
      },
    })
  })
}


// https://api.it120.cc/adair007/user/email/login?deviceId=1231&deviceName=ios&email=976769089@qq.com&pwd=123456

export const Querylogin = (...params)=>{
  request({
    url:"https://api.it120.cc/adair007/user/email/login",
    method:'Post',
    data:{
      ...params
    }
  })
}