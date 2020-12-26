// components/GoodsList/goodslist.js

//Component Object
Component({
  properties: {
    list: {
      type: Array,
      value: [],
    }
  },
  data: {

  },
  methods: {
    clickToPage(e){
      
      let goodsId = e.currentTarget.dataset.itemid || ' '
      wx.navigateTo({
        url: '/pages/goods_detail/index?id='+goodsId,
      });
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