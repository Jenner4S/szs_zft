const app = getApp();
var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];
const BASE = require('../../utils/basic');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    gridCol: 12,
    skin: false,
    base:BASE.base.facilities,
    facilities: [],
    house: []
  },
  HandleImgClick (e) {
    var dataset = e.target.dataset;
    var urls = dataset['urls'];
    var current = dataset['currenturl'];
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: urls // 需要预览的图片http链接列表
    })
  },
  onLoad: function (options) {
    const that = this;
    const house_id = options.house;
    wx.request({
      url: 'http://192.168.1.22:8000/api/house/detail/'+ '36', //仅为示例，并非真实的接口地址
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        const facilities_list = [];
        var resp = res.data;
        if (resp.code === 200 ){
          var house_data = resp.data;
          for(var item in that.data.base){
            facilities_list.push({facilities:that.data.base[item],is_active:
                  (house_data.facilities.indexOf(item) !== -1)})
          }
          that.setData({
            house: house_data.house,
            imglist:house_data.imgs,
            facilities:facilities_list
          });

        }else{
          console.log('error')
        }
      }
    })
  }
});
