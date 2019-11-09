const regeneratorRuntime = require('../../../utils/runtime')
const json = require('../../../utils/ajax.js');
const WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 组件的初始数据
   */
  data: {
    sourceType: "", //样式
    content: "",
    globalData: "", //全局数据
    title: "", //默认标题
    image: "", //默认头像
    replyName: '',
    replayObj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    this.setData({
      replayObj: options
    })
    console.log('options', options)
    let that = this
    const text = WxParse.wxParse("WxParseListArr", 'html', options.commentText, that)
    this.setData({
      replyName: options.senderUserName ? ("@" + options.senderUserName + "： ") : "",
      title: options.commentText ? text : ''
    });
  },

  // 输入框赋值
  textareaCtrl(e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 提交数据
   */
  async commentSubmit() {
    if (!this.data.content){
      wx.showToast({
        title:'请输入回复内容',
        icon:'none'
      })
      return
    }
    const obj = {
      ...this.data.replayObj,
      commentText: this.data.content
    }
    const res = await json.post(`/onestep/base/epc/answerCenter/comment/add`, obj)
    if (res.status === 1){
      wx.showToast({
        title:'提交成功',
        icon: 'success',
        complete: function () {
              setTimeout(function () {
                wx.navigateBack();
              }, 2000)
            }
      })
    }
  }
});