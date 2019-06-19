// pages/list/list.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'regions',
    last_type:'regions',
    // "SelectFormHeight":'100rpx',
    SelectForm:false,
    animation:'',
    sectionHeaderLocationTop: 0,
    //页面滚动距离
    scrollTop: 0,
    conditions:{},
    //是否悬停
    fixed: false,
    region:{'text':'区域','active':false},
    choose_type:{'text':'整租 / 合租','active':false},
    money:{'text':'价格','active':false},
    house_type:{'text':'户型','active':false},
  },
  touchStart:function(){
  this.setData({
    SelectForm:false
  })
  },
  HandleSelectEvent: function(e) {
    var data = e.detail;
    var conditions = this.data.conditions;
    conditions[data.key] = data.value;
    var value = {'text':data.value,'active':true};
    if (data.key === 'region'){
      this.setData({region : value , conditions:conditions})
    } else if(data.key === 'money'){
      this.setData({money :value,conditions:conditions })
    }else if(data.key === 'house-type'){
      this.setData({choose_type : value,conditions:conditions })
    }else{
      this.setData({house_type :value,conditions:conditions })
    }
    var res = app.HttpRquestGet('http://localhost:8000/api/house/search',conditions)
    console.log(res)
  },
  SelectBtnClick: function (e){
    var that = this;
    var type = e.currentTarget.dataset['type'];
    var is_show = true;
    if(type === that.data.last_type){
      is_show = !that.data.SelectForm
    }
    that.setData({
      SelectForm: is_show, type: type, last_type:type,
    })
  },
  ChildInputValueHanle:function(e) {
    var data = e.detail;
    console.log('父组件中',data)
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
    let that = this
    let query = wx.createSelectorQuery()
    query.select(".header-select").boundingClientRect(function (res) {
      that.setData({
        //section header 距离 ‘当前顶部’ 距离
        sectionHeaderLocationTop: res.top
      })
    }).exec()
  },
  onPageScroll: function (e) {
    //console.log(e)
    this.data.scrollTop = e.scrollTop;
    if (e.scrollTop > this.data.sectionHeaderLocationTop) {
      this.setData({
        fixed: true
      })
    } else {
      this.setData({
        fixed: false
      })
    }
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
