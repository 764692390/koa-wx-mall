//app.js
App({
  onLaunch: function () {
    var that = this;    
    // 获取砍价设置
    // wx.request({
    //   url: 'https://api.it120.cc/' + that.globalData.subDomain + '/shop/goods/kanjia/list',
    //   data: {},
    //   success: function (res) {
    //     if (res.data.code == 0) {
    //       that.globalData.kanjiaList = res.data.data.result;
    //     }
    //   }
    // })
    // 判断是否登录
    let token = wx.getStorageSync('token');
    let session_key = wx.getStorageSync('session_key');
    if (!token) {
      that.goLoginPageTimeOut()
      return
    }
    wx.request({
      url: that.globalData.subDomain + '/user/check-token',
      data: {
        token,
        session_key
      },
      success: function (res) {
        if (res.data.errno != 0) {
          wx.removeStorageSync('token')
          wx.removeStorageSync('session_key')
          that.goLoginPageTimeOut()
        }
      }
    })
  },
  sendTempleMsg: function (orderId, trigger, template_id, form_id, page, postJsonString){
    var that = this;
    wx.request({
      url: that.globalData.subDomain + '/template-msg/put',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        type:0,
        module:'order',
        business_id: orderId,
        trigger: trigger,
        template_id: template_id,
        form_id: form_id,
        url:page,
        postJsonString: postJsonString
      },
      success: (res) => {
        
      }
    })
  },
  sendTempleMsgImmediately: function (template_id, form_id, page, postJsonString) {
    var that = this;
    wx.request({
      url: that.globalData.subDomain + '/template-msg/put',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        token: wx.getStorageSync('token'),
        type: 0,
        module: 'immediately',
        template_id: template_id,
        form_id: form_id,
        url: page,
        postJsonString: postJsonString
      },
      success: (res) => {
        console.log(res.data);
      }
    })
  },  
  goLoginPageTimeOut: function () {
    setTimeout(function(){
      wx.navigateTo({
        url: "/pages/authorize/index"
      })
    }, 1000)    
  },
  globalData:{
    userInfo:null,
    subDomain: "https://lz.jczxw.cn/api/v1", // 域名
    version: "/v1",
    shareProfile: '小李Blog' // 首页转发的时候话术
  }
})
