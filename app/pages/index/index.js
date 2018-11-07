//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    loadingHidden: false , // loading
    userInfo: {},
    swiperCurrent: 0,  
    selectCurrent:0,
    categories: [],
    activeCategoryId: 0,
    goods:[],
    scrollTop:0,
   

    hasNoCoupons:true,
    coupons: [],
    searchInput: '',

    ArticlePage: [], // 文章列表
    index:1,
    rows:8,
    pagesize: null, // 一共有多少页
    loadingMoreHidden:true, // 是否到底
  },

  
  onLoad: function () {
    var that = this
    wx.setNavigationBarTitle({
      title: wx.getStorageSync('mallName')
    })
    // 获取文章
    that.getArticlePage();
  },
  onPageScroll(e) {
    let scrollTop = this.data.scrollTop
    this.setData({
      scrollTop: e.scrollTop
    })
   },
   toDetailsTap: function(event) {
        wx.navigateTo({
            url: '../detail/index?id=' + event.currentTarget.dataset.id
        })
   },
  getArticlePage: function () {
    wx.showLoading({
        title: '加载中...',
    })
    var that = this;
    // 获取文章分页
    wx.request({
      url: app.globalData.subDomainS + '/ArticlePage',
      data: {
        rows: this.data.rows,
        index: this.data.index,
      },
      success: function (res) {
        setTimeout( () => {
            wx.hideLoading();
        } ,500)
        if (res.data.code == 0) {
            if( res.data.pagesize >= that.data.index) {
                that.setData({
                    pagesize: res.data.pagesize
                })
                if( that.data.index != 1) {
                    var ArticlePage = that.data.ArticlePage.concat(res.data.result)
                    that.setData({
                        hasNoCoupons: false,
                        ArticlePage: ArticlePage
                    })
                } else {
                    that.setData({
                        hasNoCoupons: false,
                        ArticlePage:  res.data.result
                    })
                }
            } else {
                that.setData({
                    loadingMoreHidden: false
                })
            }
        }
      }
    })
  },
  // 上拉加载
  onReachBottom: function (e) {
      console.log(e);
      if(this.data.pagesize >= this.data.index) {
        this.setData({
            index: this.data.index+1
        });
        this.getArticlePage();
      }
  },
  // 下拉刷新
  onPullDownRefresh: function(e){
    console.log(e);
    this.setData({
        index:1,
    });
    this.getArticlePage()
  }
})
