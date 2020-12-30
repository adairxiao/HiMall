// components/LoginBtn/LoginBtn.js
//Component Object
var appInst = getApp()
import { request } from './../../request/index'

Component({
  properties: {
    // 目前为空，跳转页面携带参数需要时使用
    payload: {
      type: null,
      value: null,
      observer: function () {},
    },
  },
  data: {
    isLogin: false,
  },
  methods: {
    getuserinfo(e) {
      if (e.detail.errMsg === 'getUserInfo:ok') {
        wx.setStorageSync('user_info', e.detail.userInfo)
        // 去登录
        let user = {
          avatarUrl: e.detail.userInfo.avatarUrl,
          nick: e.detail.userInfo.nickName,
          province: e.detail.userInfo.province,
          city: e.detail.userInfo.city,
          gender: e.detail.userInfo.gender,
        }
        console.log(user);
        wx.login({
          timeout: 10000,
          success: (result) => {
            request({
              url: 'https://api.it120.cc/adair007/user/wxapp/login',
              method: 'Post',
              data: {
                code: result.code,
                autoReg: true,
                postJsonString:JSON.stringify(user)
              },
            }).then((res) => {
              if (!res.code) {
                wx.setStorageSync('data_token', res.data.data)
                appInst.globalData.isLogin = true
                this.setData({
                  isLogin: appInst.globalData.isLogin,
                })
              }
              appInst.globalData.isLogin = false
              // 登录成功发送事件给父组件
              this.triggerEvent('onLoginSuccess', {
                payload: this.data.payload,
              })
            })
          },
        })
      }
    },
    //已登录状态
    handleTap: function () {
      this.triggerEvent('onLoginSuccess', {
        payload: this.data.payload,
      })
    },
  },
  created: function () {},
  attached: function () {
    console.log('globalData.isLogin', appInst.globalData.isLogin)
  },
  ready: function () {
    this.setData({
      isLogin: appInst.globalData.isLogin,
    })
  },
  moved: function () {},
  detached: function () {},
})
