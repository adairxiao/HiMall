// pages/user/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    const appid = 'wxc7fe46aa7fbe1ff9', secret ='c71daa7d2000e39aecfb337a16350407'
    wx.login({
      timeout: 10000,
      success: (result) => {
        console.log("login-code:",result);
        // wx.request({
        //   url:
        //     'https:/api.it120.cc/adair007//user/wxsns/authorization',
        //   method:'Post',
        //   data: {
        //     code: res.code,
        //     appid:appid,
        //     grant_type:'authorization_code'
        //   },
        //   success (res) {
        //     console.log(res)
        //   }
        // })
      },
      fail: () => {},
      complete: () => {},
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
})
