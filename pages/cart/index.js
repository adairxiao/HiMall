// pages/cart/index.js
const appInst = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    Cartinfo: [],
    ischecked: false,
    cartItem: null,
    direction: 'right', //方向
    startX: 0, //开始坐标
    startY: 0,
  },
  Cartinfo: [],
  keepCheckeds: [],
  ischecked: false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    for (let index = 0; index < appInst.globalData.Cartinfo.length; index++) {
      appInst.globalData.Cartinfo[index].checkeds = false
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (appInst.globalData.Cartinfo.lenght !== 0) {
      this.Cartinfo = appInst.globalData.Cartinfo
      this.setData({
        Cartinfo: appInst.globalData.Cartinfo,
        checkeds: this.checkeds,
      })
    }
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
  /**
   *
   */
  jumpToPage() {
    const GoodsList = []
    console.log(this.Cartinfo)
    this.Cartinfo.forEach((item) => {
      if (item['checkeds']) {
        GoodsList.push(item)
      }
    })
    console.log(GoodsList.length)
    if (!GoodsList.length) return
    wx.navigateTo({
      url: '/pages/order/index',
      events: {},
      success: (result) => {
        result.eventChannel.emit('acceptGoodsList', GoodsList)
      },
      fail: () => {},
      complete: () => {},
    })
  },

  /**
   * 监听checkbox事件
   */
  change(e) {
    if (e.detail.value.length === 0) {
      this.Cartinfo.forEach((item, index) => {
        this.Cartinfo[index]['checkeds'] = false
        this.setData({
          ischecked: false,
          Cartinfo: this.Cartinfo,
        })
      })
      this.keepCheckeds = e.detail.value
      return
    }

    if (
      this.keepCheckeds.length < e.detail.value.length ||
      this.keepCheckeds.length === e.detail.value.length
    ) {
      e.detail.value.forEach((index) => {
        this.Cartinfo[index]['checkeds'] = true
      })
    } else {
      this.keepCheckeds.forEach((index) => {
        if (!e.detail.value.includes(index))
          this.Cartinfo[index]['checkeds'] = false
      })
    }

    this.ischecked = e.detail.value.length === this.Cartinfo.length
    this.setData({
      ischecked: this.ischecked,
      Cartinfo: this.Cartinfo,
    })

    this.keepCheckeds = e.detail.value
  },

  selectAll() {
    let e = {}
    e.detail = { value: [] }

    this.ischecked = !this.ischecked

    if (this.ischecked) {
      e.detail = { value: this.Cartinfo.map((e, i) => i) }
    }

    this.change(e)
  },
  /**
   *获取xy轴坐标
   */
  start(e) {
    const self = this
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartItem: e.currentTarget.dataset.cartitem,
    })
  },
  /**
   *左移显示删除
   */
  leftToouchMove(e) {
    // console.log(e);
    const self = this,
      startX = self.data.startX,
      startY = self.data.startY,
      index = self.data.cartItem, //当前索引
      touchMoveX = e.changedTouches[0].clientX, //滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY, //滑动变化坐标
      angle = self.angle(
        { x: startX, y: startY },
        { x: touchMoveX, y: touchMoveY }
      ),
      direction = touchMoveX - startX > 0 ? 'right' : 'left'
    if (Math.abs(angle) < 30) {
      wx.stopPullDownRefresh()
      this.setData({
        direction,
      })
    }
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function (start, end) {
    var dX = end.x - start.x,
      dY = end.y - start.y
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(dY / dX)) / (2 * Math.PI)
  },
})
