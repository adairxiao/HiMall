// pages/cart/index.js
const appInst = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Cartinfo: [],
    checkeds: [],
    ischecked: false,
  },
  checkeds: [],
  ischecked: false,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (appInst.globalData.Cartinfo.lenght !== 0) {
      for (let index = 0; index < appInst.globalData.Cartinfo.length; index++) {
        this.checkeds.push(false)
      }

      this.setData({
        Cartinfo: appInst.globalData.Cartinfo,
        checkeds: this.checkeds,
      })
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

  /**
   * 监听checkbox事件
   */
  change(e) {
    if (e.detail.value.length === this.checkeds.length) {
      this.selectAll()
    } else if (this.ischecked) {
      this.ischecked = false
      this.setData({
        ischecked: this.ischecked,
      })
    }
  },

  selectAll() {
    for (let index = 0; index < this.checkeds.length; index++) {
      this.checkeds[index] = !this.ischecked
    }
    this.ischecked = !this.ischecked
    this.setData({
      ischecked: this.ischecked,
      checkeds: this.checkeds,
    })
  },

  //左移删除e
  leftToouchMove(e){
    console.log(e);
  }
})
