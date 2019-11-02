import regeneratorRuntime from './runtime.js' //使用async-await异步的解决方法，但需要每个请求的时候的页面引入
const LOGIN_COOKIE_NAME = 'cf81sessionid'
const BASE_URL = "http://47.110.167.38/api" //线上地址，海外吉利

function handleStatusCode(code) {
  switch (code) {
    case 401:
      wx.removeStorageSync('token')
      wx.showToast({
        title: '登录异常',
        icon: 'none'
      })
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/index'
        })
      }, 1500)
      break;
    case 500:
      wx.showToast({
        title: '服务器异常',
        icon: 'none'
      })
      break;
    default:
      {}
  }
}

function _json(url, param, method) {
  url = BASE_URL + url
  const token = wx.getStorageSync('token')
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data: param,
      header: {
        'content-type': 'application/json',
        'Cookie': `${LOGIN_COOKIE_NAME}=${token}`
      },
      success(res) {
        handleStatusCode(res.statusCode)
        resolve(res.data)
      },
      fail(res) {
        reject(res)
      }
    })
  })
}

const json = {
  get: function(url, param) {
    return _json(url, param, 'GET')
  },
  post: function(url, param) {
    return _json(url, param, 'POST')
  }
}

module.exports = json