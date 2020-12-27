// pages/goods_detail/index.js
import { request } from '../../request/index'

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: {
      pics: [],
      basicInfo: {},
      content: '',
    },
    cartNum: 0,
    iscollect: false,
  },
  goods: {
    basicInfo: {},
    pics: [],
  },
  cartNum: 0,
  iscollect: false,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // 初始化购物车数量

    this.cartNum = app.globalData.Cartinfo.length
    this.setData({
      cartNum: this.cartNum,
    })
    request({
      url: 'https://api.it120.cc/adair007/shop/goods/detail',
      data: {
        id: '718001',
      },
      method: 'Get',
    }).then((res) => {
      const goodsInfo = res.data.data || {}

      this.setData({
        goods: {
          pics: goodsInfo.pics,
          basicInfo: goodsInfo.basicInfo,
          content: goodsInfo.content,
        },
      })
      this.goods.pics = goodsInfo.pics
      this.goods.basicInfo = goodsInfo.basicInfo
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
  /**
   * 点击放大图片
   */
  previewImg(e) {
    const index = e.currentTarget.dataset.index
    const urls = this.goods.pics.map((item) => item.pic)
    console.log(urls)
    wx.previewImage({
      current: urls[index],
      urls: urls,
      success: (result) => {
        console.log(result)
      },
      fail: () => {},
      complete: () => {},
    })
  },

  /**
   * 添加购物车数据
   */
  addCart() {
    console.log(this.goods.basicInfo);
    app.globalData.Cartinfo.push(this.goods.basicInfo)
    this.cartNum++
    this.setData({
      cartNum: this.cartNum,
    })
    try {
      wx.setStorageSync('cart_info', app.globalData.Cartinfo)
    } catch (e) {}
  },

  /**
   * 收藏或取消收藏
   */
  switchCollect() {
    this.iscollect = !this.iscollect
    this.setData({
      iscollect: this.iscollect,
    })
  },
  /**
   * 去购买
   */
  buyNow() {
    const self =this
    wx.navigateTo({
      url: '/pages/order/index' ,
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        
        res.eventChannel.emit('getGoodsInfo', self.goods.basicInfo)
      },
    })
  },
})
