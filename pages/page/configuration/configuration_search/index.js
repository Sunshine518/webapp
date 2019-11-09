const regeneratorRuntime = require('../../../../utils/runtime')
const json = require('../../../../utils/ajax.js')
const { objToSearchObj, objToQuerystring } = require('../../../../utils/util.js')

Page({

  data: {
    searchValue: 'L6T7844S9KN000239'
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
    } else{
      wx.navigateTo({
        url: `/pages/page/configuration/configuration_detail/index?vin=${this.data.searchValue}`
      })
    }
  }





})