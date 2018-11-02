//index.js
//获取应用实例
var app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
    data: {
        Article: false,
        html: null,
    },

    onLoad: function (option) {
        var id = option.id
        var that = this
        wx.setNavigationBarTitle({
            title: '详情'
        })
        // 获取文章
        that.getDetail(id);
    },
    getDetail: function (id) {
        wx.showLoading({
            title: '加载中...',
        })
        var that = this;
        // 获取文章分页
        wx.request({
            url: app.globalData.subDomainS + '/getArticle',
            data: {
                id: id
            },
            success: function (res) {
                setTimeout(() => {
                    wx.hideLoading();
                }, 500)
                if (res.data.code == 0) {
                    WxParse.wxParse('html', 'html',  res.data.result.content, that,5);
                    that.setData({
                        Article: res.data.result
                    })
                }
            }
        })
    },
    bark:function() {
        // 回到原来的地方放
        wx.navigateBack();
    }
})
