const json = require('../../../utils/ajax.js')
const regeneratorRuntime = require('../../../utils/runtime')
const {
  AESEncrypt
} = require('../../../utils/util.js')

Page({

  data: {
    showSide: false,
    list: [],//一级目录列表 
    key2: 999,
    key: 999,
    key1: 999,
    classify: [] //二级目录列表 
  },


  // 显示侧边弹出
  onCategory() {
    this.setData({
      showSide: true,
    })
  },
  // 关闭侧边弹出
  showSide() {
    this.setData({
      showSide: false,
    })
  },

  // 获取9大类
  async onLoad(query) {
    const vin = query.vin ? query.vin : 'L6T7844S9KN000239'
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryAllCatalogsForLV1?search.vin=${vin}`)
    const list = Array.isArray(res) ? res : []
    this.setData({
      list: list
    })
    console.log(this.data.list)
  },

  // 获取二级目录
  async getCategory(e) {
    const id = e.currentTarget.dataset.id
    const carseriesid = e.currentTarget.dataset.carseriesid

  },

  async onSpace(e) {
    const id = e.currentTarget.dataset.id
    const carseriesid = e.currentTarget.dataset.carseriesid
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryAllCatalogsForLV2?carseries=${carseriesid}&catalogLV1=${id}`)
    const classify = res
    this.setData({
      classify: classify
    })
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    console.log(e.currentTarget.dataset.index)
    console.log('this.data.key2',this.data.key2)
    if (e.currentTarget.dataset.index != this.data.key2) {
      this.setData({
        key2: e.currentTarget.dataset.index,
      })
      let num = classify.length
      if (String(num).indexOf(".") > -1) {
        num = num + 0.5
      }
      animation.height(num*28).step()
      this.setData({
        animationData: animation.export()
      })
      animation.height(20).step()
      this.setData({
        animationData1: animation.export(),
      })
    } else {
      this.setData({
        key2: 999
      })
      animation.height(20).step()
      this.setData({
        animationData1: animation.export(),
      })
    }
  },

})