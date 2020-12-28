// components/LoginBtn/LoginBtn.js
//Component Object
var appInst =  getApp();

Component({
  properties: {
    myProperty:{
      type:String,
      value:'',
      observer: function(){}
    },

  },
  data: {
    isLogin:true
  },
  methods: {
    getuserinfo(e){
      console.log(e);
      if(e.detail.errMsg==='getUserInfo:ok'){
        appInst.globalData.userInfo = e.detail.userInfo

        // 去登录
      }
      
    }
  },
  created: function(){

  },
  attached: function(){

  },
  ready: function(){

  },
  moved: function(){

  },
  detached: function(){

  },
});