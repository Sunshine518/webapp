
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SDKVersion: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res.SDKVersion)
        this.setData({
          SDKVersion: res.SDKVersion
        })
      }
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '15802758882',
    })
  },
  getLocation: function () {
    wx.openLocation({
      latitude: 30.492685,
      longitude: 114.160942,
      name: "武汉市蔡甸区立业路16号(东北方向20米)",
      address: "武汉市蔡甸区立业路16号(东北方向20米)",
      scale: 28
    })
  },
  onShareAppMessage(res) {
    return {
      title: '电子备件目录',
      path: 'pages/others/start/start'
    }
  },
  async onLogout() {
    const res = await json.get('/logout')
    wx.removeStorageSync('token')
    wx.navigateTo({
      url: '/pages/others/login/login',
    })
  }

})