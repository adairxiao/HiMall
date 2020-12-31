// pages/address/index.js
import { request } from '../../../request/index'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    addrlist: [],
  },
  addrlist:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tokenData = wx.getStorageSync('data_token')
    request({
      url: 'https://api.it120.cc/adair007/user/shipping-address/list',
      method: 'Get',
      data: {
        token: tokenData.token,
      },
    }).then((res) => {
      
      if (res.errMsg) {
        this.addrlist=res.data.data
        this.setData({
          addrlist: res.data.data,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

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
  toPage(e) {
    console.log(e);
    const self = this
    wx.navigateTo({
      url: '/pages/address/edit/index',
      success: (result) => {
        result.eventChannel.emit(
          'acceptUpdateId',
          {addrId:e.currentTarget.dataset.addritem.id,formPath:'pages/address/edit/index'}
        )
      },
      fail: () => {},
      complete: () => {},
    })
  },
})
