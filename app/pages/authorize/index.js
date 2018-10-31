// pages/authorize/index.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    bindGetUserInfo: function (e) {

        if (!e.detail.userInfo) {
            return;
        }
        wx.setStorageSync('userInfo', e.detail.userInfo)
        this.login();
    },
    login: function () {

        let that = this;
        let token = wx.getStorageSync('token');
        let session_key = wx.getStorageSync('session_key');

        if (token && session_key) {
            wx.request({
                url: app.globalData.subDomain + '/user/check-token',
                data: {
                    token,
                    session_key
                },
                success: function (res) {
                    if (res.data.code != 0) {
                        // token 和 session_key过期删掉
                        wx.removeStorageSync('token');
                        wx.removeStorageSync('session_key')
                        that.login();
                    } else {
                        // 回到原来的地方放
                        wx.navigateBack();
                    }
                }
            })
            return;
        }
        wx.login({
            success: function (res) {
                // 通过code获取openid  session_key
                wx.request({
                    url: app.globalData.subDomain + '/user/codeToOpenId',
                    data: {
                        code: res.code
                    },
                    success: function (res) {
                        if (res.data.errno == 0) {
                            // 去注册
                            that.registerUser(res.data.data);
                            wx.setStorageSync('token', res.data.data.openid)
                            wx.setStorageSync('session_key', res.data.data.session_key)
                            return;
                        }
                        if (res.data.code != 0) {
                            // 登录错误
                            wx.hideLoading();
                            wx.showModal({
                                title: '提示',
                                content: res.data.message,
                                showCancel: false
                            })
                            return;
                        }
                    }
                })
            }
        })
    },
    registerUser: function (data) {
        var that = this;
        // 下面开始调用注册接口
        var userInfo = wx.getStorageSync('userInfo');
        wx.request({
            method: "POST",
            url: app.globalData.subDomain + '/user/register',
            data: {
                ...data,
                ...userInfo
            }, // 设置请求的 参数
            success: (res) => {
                wx.hideLoading();
                // 回到原来的地方放
                wx.navigateBack();
            }
        })
    }
})