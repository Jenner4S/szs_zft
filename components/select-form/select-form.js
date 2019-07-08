// components/select-form/select-form.js
const app = getApp();
Component({

  /**
   * 页面的初始数据
   */
  properties:{
    selectType:{
      type: String,
      value: 'regions',
    },
    formselects:{
      type:JSON,
      value:{},
    },
    lastConditions:{
      type:Object,
      value: {}
    }
  },
  data: {
    show_regions:true,
    ActiveColor:true,
    price:0,
    start: 0,
    end: 1000,
  },
  methods:{
    RigionsClick(e){
      this.setData({
        show_regions:true,
        ActiveColor:true
      })
    },
    SubwayClick(e){
      this.setData({
        show_regions:false,
        ActiveColor:false
      })
    },
    RigionsselectClick(e){
      var dataset = e.target.dataset;
      var value = dataset['value'];
      var key = dataset['key'];
      this.triggerEvent('SelectEvent',{'key':key,
      'value':value});
    },

    slider2change(e){
      var money = e.detail.value * 20;
      this.setData({
        price: (money > 4000) ? "> 4000" : money,
        start: (money - 1000>0)?money-1000:0,
        end: (money + 1000 > 5000) ? "不限" : money + 1000,
      })
      this.triggerEvent('SelectEvent', {'key':'price','value':[money,money]});
    },
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
    console.log("123")
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
});
