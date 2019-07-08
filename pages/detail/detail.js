const app = getApp();
var bmap = require('../../utils/bmap-wx.min.js');
var wxMarkerData = [];
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      'icon': 'icon-wifi',
      'name': 'wifi'
    },{
      'icon': 'icon-weibolu-',
      'name': '微波炉'
    },{
      'icon': 'icon-xiyiji',
      'name': '洗衣机'
    },{
      'icon': 'icon-bingxiang',
      'name': '冰箱'
    },{
      'icon': 'icon-matong',
      'name': '马桶'
    },{
      'icon': 'icon-dianti',
      'name': '电梯'
    },{
      'icon': 'icon-kongtiao-',
      'name': '空调'
    },{
      'icon': 'icon-nuanqi-',
      'name': '暖气'
    },{
      'icon': 'icon-yigui',
      'name': '衣柜'
    },{
      'icon': 'icon-yangtai',
      'name': '阳台'
    },{
      'icon': 'icon-reshuiqi',
      'name': '热水器'
    },{
        'icon': 'icon-Concise',
      'name': '煮饭'
    }],
    gridCol: 12,
    skin: false
  },
  onLoad: function (options) {
    const house_id = options.house
    wx.request({
      url: 'http://127.0.0.1:8000/api/house/detail/'+house_id, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        var resp = res.data
        if (resp.code === 200 ){
          console.log(resp.data)
        }else{
          console.log('error')
        }
      }
    })
  }
});
