// components/searchbar.js
Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    paramAtoB: {
      type: String,//类型
      value: 'default value'//默认值
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toSearch:function(e){
      var value = this.data.inputVal;
      this.triggerEvent('ChildInputValue',value);
    },
    listenerSearchInput:function(e){
      var value = e.detail.value
      this.setData({
        inputVal:value
      })
    }
  }
})
