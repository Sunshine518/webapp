const regeneratorRuntime = require('../../../utils/runtime')
const json = require('../../../utils/ajax.js')

Page({

  data: {
    searchValue: ''
  },

  onInputChange(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  onClear() {
    this.setData({
      searchValue: ""
    })
  },

  async onSearch() {
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/selectIsExistByVin/${this.data.searchValue}`)
    if (!res) {
      wx.showToast({
        title: "VIN码不存在",
        icon: 'none'
      })
      return
    }else{
      wx.redirectTo({
        url: '/pages/page/configuration_detail/index'
      })
    }
  }





})