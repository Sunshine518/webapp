const json = require('../../../../utils/ajax.js')
const regeneratorRuntime = require('../../../../utils/runtime')
const {
  AESEncrypt,
  objToQuerystring,
  objToSearchObj
} = require('../../../../utils/util.js')

Page({

  data: {
    showSide: false,
    vin: '',
    list: [], //一级目录列表 
    level1Title: '', //一级目录名称
    classify: [], //二级目录列表 
    level2Title: '', //二级目录名称
    level3: [], //三级目录列表 
    catalogId: '',
    activeName: '1',
    searchObj:{} //保存当前接收到的参数 
  },

  onChange(event) {
    this.setData({
      activeName: event.detail
    });
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
    // console.log(objToQuerystring(objToSearchObj(query)),555)
    // const vin = query.vin ? query.vin : 'L6T7844S9KN000239'
    const search = objToQuerystring(objToSearchObj(query))
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryAllCatalogsForLV1?${search}`, )
    this.setData({
      list: Array.isArray(res) ? res : [],
      searchObj : query
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
    if (!e) {
      this.onGetLevel3()
    }
  },

  // 三级目录
  async onGetLevel3(e) {
    this.setData({
      catalogId: e ? e.currentTarget.dataset.catalogid : '3befc935-61e1-4a2e-b63f-944e9bec54f9'
    })
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
  },

  // 点击图片跳转到图片显示详情
  onGetLevel4() {
    wx.navigateTo({
      url: `/pages/configuration/page/configuration_image/index?catalogId=${this.data.catalogId}&vin=${this.data.vin}`
    })
  }
})