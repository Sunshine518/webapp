const regeneratorRuntime = require('../../../utils/runtime')
const json = require('../../../utils/ajax.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    SDKVersion: '',
  },


  // 拨打电话
  calling () {
    wx.makePhoneCall({
      phoneNumber: '15802758882',
    })
  },

  // 使用微信内置地图查看位置
  getLocation () {
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
    wx.removeStorageSync("token")
    wx.navigateTo({
      url: '/pages/login/index',
    })
  }

})