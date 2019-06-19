// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  is_false:false,
  isLogin:false,
  hasUserInfo:false,
    grids2: [{
      image: 'start',
      text: '我的收藏'
    }, {
      image: 'comment',
      text: '我的评论'
    }, {
      image: 'order',
      text: '我的发布'
    }]
  },
  login:function(e){
      var that = this;
      if( !e.detail.userInfo ){
          console.log( { 'content':'登录失败，请再次点击~~' } );
          return;
      }
      var data_s = e.detail.userInfo;
        wx.login({
            success (res) {
                if (res.code) {
                    // 发起网络请求
                    data_s['code'] = res.code;
                    wx.request({
                        url: 'http://127.0.0.1:8000/api/account/login',
                        data: data_s,
                        header:{
                            "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
                        },
                        method:"POST",
                        success:function(res) {
                            try {
                                console.log(res)
                                wx.setStorage({
                                    key:"jwt_token",
                                    data:res.data.token
                                })
                            } catch (e) {
                                console.log('信息存储失败')
                            }
                            that.setData({
                                isLogin: true,
                                hasUserInfo: true
                            })
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
      var that = this
      wx.getStorage({
          key: 'jwt_token',
          success (res) {
              that.setData({
                  isLogin: true,
                  hasUserInfo: true
              })
          }
      })
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

  }
})
