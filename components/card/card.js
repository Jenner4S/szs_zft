const app = getApp();
// components/card/card.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar
  },

  /**
   * 组件的方法列表
   */
  methods: {
    isCard(e) {
      this.setData({
        isCard: e.detail.value
      })
    }
  }
})
