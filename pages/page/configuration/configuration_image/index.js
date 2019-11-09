const json = require('../../../../utils/ajax.js')
const regeneratorRuntime = require('../../../../utils/runtime')
const {
  objToQuerystring,
  objToSearchObj
} = require('../../../../utils/util.js')

Page({


  data: {
    catalogId: "3befc935-61e1-4a2e-b63f-944e9bec54f9",
    vin: "L6T7844S9KN000239",
    imageObj:{}, //图片显示
    partList:{} //备件列表
  },

  async onLoad(query) {
    const catalogId = query.catalogId ? query.catalogId : this.data.catalogId
    const vin = query.vin ? query.vin : this.data.vin
    const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryCatalogLV3ByCatalogLV2OrConfig?search.vin=${this.data.vin}&search.catalogId=${this.data.catalogId}`)
    this.setData({
      imageObj:res[0]
    })

  
  },

 async onChange(e){
   if (e.detail.title ==="图片详情"){
      const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/querySparepartsByCatalogLv3?catalogId=${this.data.imageObj.id}&vin=${this.data.vin}`)
      this.setData({
        partList: res[0]
      })
    }
  }
})