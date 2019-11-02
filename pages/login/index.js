const json = require('../../utils/ajax.js')
const regeneratorRuntime = require('../../utils/runtime')
const { AESEncrypt } = require('../../utils/util.js')

Page({
  data: {
    username: '',
    password: ''
  },

  onInputChange(e) {
    const type = e.currentTarget.dataset.type;
    const value = e.detail.value
    this.setData({
      [type]: value
    })
  },
  async onLogin() {
    let {
      username,
      password
    } = this.data
    if (!username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return
    }
    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    password = AESEncrypt(password, '1111222233334444')
    const res = await json.post('/login:pc', {
      loginName: username,
      password
    })
    if (res.status && res.status >= 400) {
      wx.showToast({
        title: "账号或密码错误!",
        icon: 'none'
      })
      return
    }
    if (res.data && res.data.token) {
      wx.setStorageSync('token', res.data.token)
      wx.setStorageSync('user', res.data)
      wx.switchTab({
        url: '/pages/tabs/home/index',
      })
    }
  }
})