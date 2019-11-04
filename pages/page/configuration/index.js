const json = require('../../../utils/ajax.js')
const regeneratorRuntime = require('../../../utils/runtime')
const { AESEncrypt } = require('../../../utils/util.js')

Page({

  data: {
list:[]
  },

 async onLoad (query) {
   const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryAllCatalogsForLV1?search.vin=${query.vin}`)
   const list = Array.isArray(res) ? res :[]
console.log(res,888)
this.setData({
  list:list
})
  },

async  onCategory(e){
console.log(e)
  const id = e.currentTarget.dataset.id
  const carseriesid = e.currentTarget.dataset.carseriesid
  // const res = await json.get(`/onestep/base/epc/epc/SparePartsFrontDesk/queryAllCatalogsForLV2?carseries=${}&catalogLV1=${id}`)
  }
  
})