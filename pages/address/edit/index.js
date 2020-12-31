// pages/address/edit/index.js
var appInst = getApp()

import { request } from '../../../request/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    linkMan: '',
    mobile: '',
    region: [],
    address: '',
  },
  updateId: '',
  updateType: true,
  citycode: 0,
  eventChannel: null,
  formPath: '',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const self = this
    this.eventChannel = this.getOpenerEventChannel()
    try {
      // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
      this.eventChannel.on('acceptUpdateId', function (data) {
        console.log(data)
        self.formPath = data.formPath
        request({
          url: 'https://api.it120.cc/adair007/user/shipping-address/list',
          method: 'Get',
          data: {
            token: wx.getStorageSync('data_token').token,
          },
        }).then((res) => {
          if (res.errMsg) {
            let addrObj =
              res.data.data[
                res.data.data.findIndex((item) => item.id === data.addrId)
              ]
            self.citycode = [
              addrObj.provinceId,
              addrObj.cityId,
              addrObj.districtId,
            ]
            self.updateId = addrObj.id
            self.setData({
              linkMan: addrObj.linkMan,
              mobile: addrObj.mobile,
              region: [addrObj.provinceStr, addrObj.cityStr, addrObj.areaStr],
              address: addrObj.address,
            })
          }
        })
      })
    } catch (error) {
      if (error.name === 'TypeError') {
        this.updateType = false
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

  cityChange(e) {
    this.citycode = e.detail.code
    this.setData({
      region: e.detail.value || [],
    })
  },
  formSubmit(e) {
    if (!appInst.globalData.isLogin) {
      return
    }

    let data = {
      address: e.detail.value.address,
      cityId: this.citycode[1],
      linkMan: e.detail.value.linkMan,
      provinceId: this.citycode[0],
      districtId: this.citycode[2],
      mobile: e.detail.value.mobile,
      token: wx.getStorageSync('data_token').token,
      isDefault: true,
      extJsonStr: JSON.stringify({ citycode: this.citycode }),
    }

    this.updateType ? (data.id = this.updateId) : ''
    let path = !this.updateType ? 'add' : 'update'

    request({
      url: 'https://api.it120.cc/adair007/user/shipping-address/' + path,
      method: 'Post',
      data: data,
    }).then((res) => {
      console.log(res)
      if (res.errMsg === 'request:ok' && res.data.msg === 'success') {
        let path = this.formPath.includes('pages/address/edit/index')
          ? 'order'
          : ''
        wx.navigateTo({
          url: `/pages/${path}/index`,
          success: (result) => {
            result.eventChannel.emit('acceptUpdateData', {})
          },
        })
      }
    })
  },
})
