//index.js
//获取应用实例
import { request } from './../../request/index'

const app = getApp()

//Page Object
Page({
  data: {
    swiperList: [],
    catesList: [],
    FoolList: [],
  },
  //options(Object)
  onLoad: function (options) {
    const self = this
    this.getSwiperList(self)
    this.getCatesList(self)
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    const self = this
    this.getSwiperList(self)
    this.getCatesList(self)
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onPageScroll: function () {},
  //item(index,pagePath,text)
  onTabItemTap: function (item) {},
  getSwiperList() {
    request({
      url: 'https://api.it120.cc/adair007/banner/list',
      method: 'Get',
    }).then((res) => {
      const list = res.data.data.map((item) => {
        let obj = {}
        obj.icon = item.icon || ' '
        obj.picUrl = item.picUrl
        obj.id = item.id
        return obj
      })

      this.setData({
        swiperList: list,
      })
    })
  },
  getCatesList() {
    request({
      url: 'https://api.it120.cc/adair007/shop/goods/category/all',
      method: 'Get',
    }).then((res) => {
      console.log(res);
      let levelOneCates = [],
        levelTwoCates = []
      res.data.data.forEach((item) => {
        let obj = {}
        obj.icon = item.icon || ''
        obj.id = item.id
        obj.isUse = item.isUse
        obj.name = item.name
        obj.pid = item.pid
        if (item.level === 1 && item.type !== '列表') {
          levelOneCates.push(obj)
        } else {
          if (item.pid) {
            let index = levelTwoCates.findIndex(
              (element) => element.id === item.pid
            )
            levelTwoCates[index].data.push(obj)
          } else {
            obj.data = []
            levelTwoCates.push(obj)
          }
        }
      })
      this.setData({
        catesList: levelOneCates,
        FoolList: levelTwoCates,
      })
      
    })
  },
})
