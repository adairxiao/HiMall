//app.js
//app.js
App({
  //onLaunch,onShow: options(path,query,scene,shareTicket,referrerInfo(appId,extraData))
  onLaunch: function(options){
    console.log("onLaunch");
    this.getCartInfo()
  },
  onShow: function(options){

  },
  onHide: function(){

  },
  onError: function(msg){

  },
  //options(path,query,isEntryPage)
  onPageNotFound: function(options){

  },
  globalData: {
    Cartinfo:[]
  },
  // 从本地缓存获取购物车数据
  getCartInfo(){
    try {
      var value = wx.getStorageSync('cart_info')
      if (value) {
        
        this.globalData.Cartinfo=[...value]
        console.log(this.globalData.Cartinfo);
      }
    } catch (e) {
      // Do something when catch error
    }
  }
});