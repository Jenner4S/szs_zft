// pages/publish/publish.js
const BASE = require('../../utils/basic');
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      title: "",
      price: "",
      story: "",
      area: "",
      desc: "",
    },
    cur_house_type: "",
    cur_rent_type: "",
    value1:"",
    clear: false,
    time: '12:01',
    date: '2018-12-25',
    region: ['广东省', '深圳市', '南山区'],
    apartment: [{
      id: 1,
      name: '单间'
    },  {
      id: 2,
      name: '一室一厅'
    }, {
      id: 3,
      name: '两室一厅'
    }, {
      id: 4,
      name: '其它'
    }],
    facilities:BASE.base.facilities,
    house_type: [{id:1,name:'整租'},{id:2,name:'合租'}],
    urls: []
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  TagChoose (e){
    var key = e.target.dataset.key;
    var facilities = this.data.facilities;
    facilities[key].is_active = (!facilities[key].is_active);
    this.setData({
      facilities: facilities
    })
  },
  houseType(e) {
    var key = e.target.dataset.key;
    this.setData({
      cur_house_type: key
    })
  },
  rentType(e){
        var key = e.target.dataset.key;
        this.setData({
            cur_rent_type: key
        })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  submitBtn: function(e){
    const cur_house = this.data.cur_house_type;
    // const cur_type = this.data.cur_rent_type;
    // const date = this.data.date;
    // const facilites = this.data.facilities;
    // const region = this.data.region;
      // var that = this;
      // const imgs = that.data.urls;
      // console.log(imgs);
    const params = e.detail.value;
    params['cur_house_type'] = cur_house
    console.log(params)
    console.log(e.detail)
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false
    }
    this.showModal({
      msg: '提交成功'
    })

  },
    linchangeListen: function(e){
      this.setData({
          urls:e.detail.all
      })
    },
    linremoveListem: function(e){
    this.setData({
        urls:e.detail.all
    })
    },
  showModal(error) {
    wx.showModal({
      title: error.param,
      content: error.msg,
      showCancel: false,
    })
  },
  initValidate() {
    const rules = {
      title: {
        required: true,
        maxlength: 30
      },
      price:{
        required:true,
        number: true,
        max: 100000,
        min:0
      },
      story:{
        number: true,
        min:1,
        max: 70
      },
      area: {
        number: true,
        min:0,
        max: 500
      },
      desc: {
        required:true,
        minlength: 15
      },
      cur_house_type: {
        required:true
      }
    }
    const messages = {
      title: {
        required: '标题必须要填写',
        maxlength: '标题太长啦'
      },
      price:{
        required:'请输入房源价格',
        number: '价格格式错误~'
      },
      story:{
        number: '房源楼层格式错误~'
      },
      area:{
        number: '房源面积格式错误~'
      },
      desc:{
        required:'请简要描述下你的房源~'
      },
      cur_house_type:{
        required:'请cur_house_type~'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
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
