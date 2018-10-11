//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    userInfo: {}
  },
  goToIndex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    });
  },
  onLoad:function(){
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
  },
  onShow:function(){
    let that = this
    let userInfo = wx.getStorageSync('userInfo')
    wx.login({
        success: function (res) {
          wx.request({
            url: 'https://lz.jczxw.cn/api/v1/user/codeToOpenId',
            data: {
                code: res.code,
            },
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
              if( res.data.data.openid){
                wx.request({
                    method: "POST",
                    url: 'https://lz.jczxw.cn/api/v1/user/register',
                    data: {
                        openId: res.data.data.openid,
                        ...userInfo
                    },
                    header: {
                        'content-type': 'application/json'
                    },
                    success: function(res) {
                        console.log(res);
                    }
                })    
              }
            }
          })
        }
    })
    console.log(userInfo);
    if (!userInfo) {
    //   wx.navigateTo({
    //     url: "/pages/authorize/index"
    //   })
    } else {
      that.setData({
        userInfo: userInfo
      })
    }
  },
  onReady: function(){
    var that = this;
    setTimeout(function(){
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function(res) {
      var angle = -(res.x*30).toFixed(1);
      if(angle>14){ angle=14; }
      else if(angle<-14){ angle=-14; }
      if(that.data.angle !== angle){
        that.setData({
          angle: angle
        });
      }
    });
  }
});