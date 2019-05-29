// components/tabs/index.js
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
    currentIndex: 0,
    transformX: 0,
    transformY: 0,
    text: "深圳租房就上【深圳市租房团】！发布出租、转租、合租、求租等深圳租房信息！ 希望给每一个在深圳奋斗的朋友，找到一个满意的房子和室友！",
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marquee_margin: 30,
    size: 14,
    interval: 20 // 时间间隔
  },

  ready() {
    this.initTabs();
  },
  onLoad: function () {
    console.log("123")
    var that = this;
    var length = that.data.text.length * that.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    //console.log(length,windowWidth);
    that.setData({
      length: length,
      windowWidth: windowWidth
    });
    that.scrolltxt();// 第一个字消失后立即从右边出现
  },

  scrolltxt: function () {
    var that = this;
    var length = that.data.length;//滚动文字的宽度
    var windowWidth = that.data.windowWidth;//屏幕宽度
    if (length > windowWidth) {
      var interval = setInterval(function () {
        var maxscrollwidth = length + that.data.marquee_margin;//滚动的最大宽度，文字宽度+间距，如果需要一行文字滚完后再显示第二行可以修改marquee_margin值等于windowWidth即可
        var crentleft = that.data.marqueeDistance;
        if (crentleft < maxscrollwidth) {//判断是否滚动到最大宽度
          that.setData({
            marqueeDistance: crentleft + that.data.marqueePace
          })
        }
        else {
          //console.log("替换");
          that.setData({
            marqueeDistance: 0 // 直接重新滚动
          });
          clearInterval(interval);
          that.scrolltxt();
        }
      }, that.data.interval);
    }
    else {
      that.setData({ marquee_margin: "1000" });//只显示一条不滚动右边间距加大，防止重复显示
    }
  },


  /**
   * 组件的方法列表
   */
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