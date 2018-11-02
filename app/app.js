//app.js
App({
  onLaunch: function () {
    var that = this;    
  
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
    subDomainS: "https://blog.jczxw.cn/api", // 域名
    version: "/v1",
    shareProfile: '小李Blog' // 首页转发的时候话术
  }
})
