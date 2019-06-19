// components/swiper/swiper.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  externalClasses: ['col-class'],
  properties: {
    "swiper_style":{
      type:String,
      value: 'card-swiper',
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0,
    DotStyle: 0,
    duration: 0,
    interval: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559136456087&di=c970f995285cfe537047d62c471c5a08&imgtype=0&src=http%3A%2F%2Fnews.sweden.cn%2Fwp-content%2Fuploads%2F2015%2F12%2FYinsong-Student-house-in-Sweden4-1024x768.jpg'
    }, {
      id: 1,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1559126418&di=c648a211421e2e63fee2678df998ed70&src=http://img1.doubanio.com/view/group_topic/l/public/p89990169.jpg',
    }, {
      id: 2,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1559126439&di=2b36a916786b8aac224ab4818ba6c14f&src=http://img.fuwo.com/attachment/1609/29/bc3ca96a862f11e6833b00163e00254c.jpg'
    }, {
      id: 3,
      type: 'image',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1559126439&di=507e8e64d97d081834bceb9a99d3ca8a&src=http://tgi1.jia.com/120/047/20047812.jpg'
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    intervalChange(e) {
      this.setData({
        interval: e.detail.value
      })
    },
    durationChange(e) {
      this.setData({
        duration: e.detail.value
      })
    },
      DotStyle(e) {
      this.setData({
        DotStyle: e.detail.value
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
  }
})
