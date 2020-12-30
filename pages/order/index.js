// pages/order/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAddr: false,
    goodList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    const self =this
    //  监听getGoodsInfo事件，获取上一页面通过eventChannel传送到当前页面的数据
    try {
      const eventChannel = this.getOpenerEventChannel()
      // console.log(eventChannel)
      eventChannel.on('acceptGoodsList', function (data) {
        console.log(data)
        self.setData({
          goodList: data,
        })
      })
    } catch (error) {
      if (error.name === 'TypeError') {
        console.log(error.name, error.message)
      } else {
        throw error
      }
    }
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
  toAddress() {
    wx.navigateTo({
      url: '/pages/address/select/index',
      success: (result) => {},
      fail: () => {},
      complete: () => {},
    })
  },
})
