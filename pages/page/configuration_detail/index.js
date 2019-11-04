const json = require('../../../utils/ajax.js')
const regeneratorRuntime = require('../../../utils/runtime')
const {
  AESEncrypt,
  objToQuerystring,
  objToSearchObj
} = require('../../../utils/util.js')

Page({

  data: {
    showSide: false,
    vin: '',
    list: [], //一级目录列表 
    level1Title: '', //一级目录名称
    key2: 999,
    key: 999,
    key1: 999,
    classify: [], //二级目录列表 
    level2Title: '', //二级目录名称
    level3: [] //三级目录列表 
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
      vin: vin,
      list: list
    })
    this.onSpace()
  },

  // 获取二级目录。点击选择配置，通过动画属性展示二级目录
  async onSpace(e) {
    const id = e ? e.currentTarget.dataset.id : this.data.list[0].id
    const carseriesid = e ? e.currentTarget.dataset.carseriesid : this.data.list[0].carseriesId
    const itemname = e ? e.currentTarget.dataset.itemname : this.data.list[0].name
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryAllCatalogsForLV2?carseries=${carseriesid}&catalogLV1=${id}`)
    const classify = Array.isArray(res) ? res : []
    this.setData({
      classify: classify,
      level1Title: itemname
    })
    let animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    if (e && e.currentTarget.dataset.index != this.data.key2) {
      this.setData({
        key2: e.currentTarget.dataset.index,
      })
      let num = classify.length
      if (String(num).indexOf(".") > -1) {
        num = num + 0.5
      }
      animation.height(num * 30).step()
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
    this.onGetLevel3()
  },

  // 三级目录
  async onGetLevel3(e) {
    console.log(this.data.classify)
    const carseriesid = e ? e.currentTarget.dataset.carseriesid : this.data.classify[0].carseriesId
    const path = e ? e.currentTarget.dataset.path : this.data.classify[0].path
    const itemname = e ? e.currentTarget.dataset.itemname : this.data.classify[0].name
    let search = {}
    search.carseriesId = carseriesid
    search.vin = this.data.vin
    search.path = `/${path.split('/')[1]}`
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryAllLV3CatalogPhotoForIndexOne?${objToQuerystring(objToSearchObj(search))}`)
    const level3 = Array.isArray(res) ? res : []
    this.setData({
      level3: level3,
      level2Title: itemname
    })
  }

})