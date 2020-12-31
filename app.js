//app.js
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function (options) {
    console.log('onLaunch')
    this.getCartInfo()
    this.checkToken()
    //获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: (res) => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              wx.setStorageSync('user_info', res.userInfo)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
      },
    })
  },
  onShow: function (options) {},
  onHide: function () {},
  onError: function (msg) {},
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {},
  globalData: {
    Cartinfo: [],
    isLogin: false,
  },
  // 从本地缓存获取购物车数据
  getCartInfo() {
    try {
      var value = wx.getStorageSync('cart_info')
      if (value) {
        this.globalData.Cartinfo = [...value]
      }
    } catch (e) {
      // Do something when catch error
    }
  },
  checkToken() {
    try {
      var value = wx.getStorageSync('data_token') || ''
      // Do something with return value
      console.log(value.token);
      var reqTask = wx.request({
        url: 'https://api.it120.cc/adair007/user/check-token',
        data: {
          token: value.token,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          
          if (!result.data.code) {
            this.globalData.isLogin = true
          }
         
        },
        fail: () => {},
        complete: () => {},
      })
    } catch (e) {
      // Do something when catch error
    }
  },
})
