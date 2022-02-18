Component({
	data: {
		active: 0,
		list: [
			{
				text: '首页',
				url: '/pages/index/index',
				normal: '../icons/tabbar/home.png',
      	active: '../icons/tabbar/home-active.png',
			},
			{
				text: '我的',
				url: '/pages/mine/mine',
				normal: '../icons/tabbar/mine.png',
      	active: '../icons/tabbar/mine-active.png',
			}
		]
  },

  
	methods: {
		onChange(e) {
      this.setData({ active: e.detail })
      wx.switchTab({
        url: this.properties.list[e.detail].url
      })
    },

    init() {
      const page = getCurrentPages().pop()
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      })
    }
	}
})
