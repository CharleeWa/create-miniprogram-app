// logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onShow() {
    this.getTabBar().init()
  }
})
