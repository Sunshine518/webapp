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
    notice_obj:{} ,//通知
    notice_list:[],
    announcement:{},//公告
    announcement_list:[]
  },

  onLoad() {
    this.initPage()
  },

  async initPage() {
    const pageId="246e2580-b4d0-11e8-83c3-6fba56808002"
    const res = await json.get(`/onestep/base/epc/cms/category/page_rt/${pageId}`)
    const notice = res && res.find(item=>item.name === '通知')
    const notice_list = notice.cmsNewsList
    const announcement = res && res.find(item => item.name === '公告')
    const announcement_list = announcement.cmsNewsList
    this.setData({
      notice_obj: notice,
      notice_list: notice_list,
      announcement_obj: announcement,
      announcement_list: announcement_list
    })
  },



})