const regeneratorRuntime = require('../../../utils/runtime')
const json = require('../../../utils/ajax.js')

Page({

  data: {
    indicatorDots: true, //是否显示面板指示点
    vertical: false,  //滑动方向是否为纵向	
    autoplay: true,
    interval: 2000,
    duration: 500,
    circular: true, //是否采用衔接滑动
    carList:[]
  },

// 读取车系
  async onLoad() {
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/selectCarsIsReleaseStatus`)
    this.setData({
      carList: Array.isArray(res) ? res : []
    })
  },

// 跳转显示页面
  onDetail(e){
    const carseriesid =e.currentTarget.dataset.carseriesid
    const carseriesname = e.currentTarget.dataset.carseriesname
    wx.navigateTo({
      url: `/pages/page/configuration_detail/index?carseriesid=${carseriesid}&carseriesname=${carseriesname}`
    })
  }



})