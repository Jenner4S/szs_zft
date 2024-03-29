// components/tabs/index.js
const BASE = require('../../utils/basic');
Page({
  externalClasses: ['l-class-tabs', 'l-class-header', 'l-class-active', 'l-class-content', 'l-class-inactive', 'l-class-line', 'l-class-tabimage', 'l-class-header-line', 'l-class-icon'],
  relations: {
    '../tabpanel/index': {
      type: 'child',
      linked(target) {
        // 每次有子节点被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
        this.initTabs();
      },
      unlinked(target) {
        this.initTabs();
      }
    },
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    activeKey: {
      type: String,
      value: '',
      observer: 'changeCurrent'
    },
    placement: {
      type: String,
      value: 'top',
    },
    aminmated: Boolean,
    swipeable: Boolean,
    scrollable: Boolean,
    hasLine: {
      type: Boolean,
      value: true
    },
    aminmatedForLine: Boolean,
    activeColor: {
      type: String,
      value: '#333333'
    },
    inactiveColor: {
      type: String,
      value: '#bbbbbb'
    },
    equalWidth: {
      type: Boolean,
      value: true
    }

  },

  data: {
    tabList: [],
    base:BASE.base,
    houses:[],
    currentIndex: 0,
    transformX: 0,
    arr: ['我是通告栏一', '我是通告栏二', '我是通告栏三'],
    showIcon: true,
    transformY: 0,
  },

  onLoad: function () {
    var that = this
    wx.request({
      url: 'http://192.168.1.22:8000/api/house/index',
      method: 'GET',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      success:function(res) {
        that.setData({
          houses : res.data.house
        })
      }
    })

    //   var token = ""
    //   wx.getStorage({
    //   key: 'jwt_token',
    //   success (res) {
    //       token = res.data
    //       console.log( token)
    //   }
    // });
    // console.log(token)
    //   wx.request({
    //       url: 'http://127.0.0.1:8000/api/account/index',
    //       data: {
    //           "token":token
    //       },
    //       method: 'GET',
    //       success:function(res) {
    //           console.log(res)
    //       }
    //   })
  },

  /**
   * 组件的方法列表
   */
  searchbtnclick: function (e) {
    wx.navigateTo({
      url: '/pages/list/list'
    })
  },
  handleClick: function(e){
    var house_id = e.currentTarget.dataset['id'];
    wx.navigateTo({
      url: '/pages/detail/detail?house='+house_id
    })
  },
  methods: {
    initTabs(val = this.data.activeKey) {
      let items = this.getRelationNodes('../tabpanel/index');
      if (items.length > 0) {
        let activeKey = val,
          currentIndex = this.data.currentIndex;
        const tab = items.map((item, index) => {

          activeKey = !val && index == 0 ? item.data.key : activeKey;
          currentIndex = item.data.key === activeKey ? index : currentIndex;
          return {
            tab: item.data.tab,
            key: item.data.key,
            icon: item.data.icon,
            image: item.data.image,
            picPlacement: item.data.picPlacement,
          }
        });
        this.setData({
          tabList: tab,
          activeKey,
          currentIndex,
        }, () => {
          if (this.data.scrollable) {
            this.queryMultipleNodes();
          }
        });
      }
    },
    swiperChange(e) {
      const {
        source,
        current
      } = e.detail;
      if (source == 'touch') {
        const currentIndex = current;
        const activeKey = this.data.tabList[current].key;
        this._setChangeData({
          activeKey,
          currentIndex
        });
      }
    },
    handleChange(e) {
      const activeKey = e.currentTarget.dataset.key;
      const currentIndex = e.currentTarget.dataset.index;
      this._setChangeData({
        activeKey,
        currentIndex
      });
    },

    _setChangeData({
      activeKey,
      currentIndex
    }) {
      this.setData({
        activeKey,
        currentIndex
      }, () => {
        if (this.data.scrollable) {
          this.queryMultipleNodes();
        }
      });
      this.triggerEvent('linchange', {
        activeKey,
        currentIndex
      });
    },

    queryMultipleNodes() {
      const {
        placement,
        activeKey,
        tabList
      } = this.data;
      this._getRect('#key-' + activeKey)
        .then((res) => {
          if (['top', 'bottom'].indexOf(placement) !== -1) {
            this.setData({
              transformX: res.left > 0 ? res.left : 'auto',
              transformY: 0
            });
          } else {
            this._getRect('.l-tabs-header')
              .then((navRect) => {
                const transformY = res.top - navRect.top - navRect.height / 2;
                this.setData({
                  transformX: 0,
                  transformY: transformY
                });
              });
          }
        });
    },

    _getRect(selector) {
      return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery().in(this);
        query.select(selector).boundingClientRect((res) => {
          if (!res) return reject('找不到元素');
          resolve(res)
        }).exec();
      });
    }
  }
});
