//app.js
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function (options) {
    console.log('onLaunch')
    this.getCartInfo()

    // 获取用户信息
    // wx.getSetting({
    //   success: (res) => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: (res) => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           console.log(res);
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         },
    //       })
    //     }
    //   },
    // })
  },
  onShow: function (options) {},
  onHide: function () {},
  onError: function (msg) {},
  //options(path,query,isEntryPage)
  onPageNotFound: function (options) {},
  globalData: {
    Cartinfo: [],
    userInfo: null,
  },
  // 从本地缓存获取购物车数据
  getCartInfo() {
    try {
      var value = wx.getStorageSync('cart_info')
      if (value) {
        this.globalData.Cartinfo = [...value]
        console.log(this.globalData.Cartinfo)
      }
    } catch (e) {
      // Do something when catch error
    }
  },
})
