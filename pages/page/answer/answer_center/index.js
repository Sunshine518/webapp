const utils = require('../../../../utils/util.js');
const json = require('../../../../utils/ajax.js')
const regeneratorRuntime = require('../../../../utils/runtime')
const WxParse = require('../wxParse/wxParse.js');

Page({

  data: {
    commentList: [], //评论列表
    commentTypeIndex: 0, //评论类型选择的index
    currentType: "like", //当前类型和状态
    wxLogin: true, // 判断用户是否授权
    commitShowLogin: false, //评论前 是否显示登录弹窗
    num: 1
  },

  /**
   * 刷新页面
   */
  _refresh() {
    if (this.data.refresh) {
      this._onLoad();
    }
  },

  /**
   * 启动时候加载数据,
   */
  async onShow(num) {
    this._setPageData(num);
  },

  //读取评论数据 
  async _setPageData() {
    const res = await json.get(`/onestep/base/epc/answerCenter/comment/getTree?subjectId=12871457-14b0-11e9-8f5a-ec0d9aca407c`)
    const replyList = []
    res && res.forEach(item => {
      const obj = { ...item,
        replyContents: []
      }
      utils.getReplyList(item.children, obj.replyContents, item.senderUserName)
      replyList.push(obj)
    })
    //成功获取列表
    if (replyList.length > 0) {
      //处理富文本
      let that = this
      for (let i = 0; i < replyList.length; i++) {
        WxParse.wxParse('content' + i, 'html', replyList[i].commentText, that);
        //delete replyList[i].commentText;
        if (i === replyList.length - 1) {
          WxParse.wxParseTemArray("WxParseListArr", 'content', replyList.length, that)
        }
      }
      //处理时间
      replyList.forEach((element, index) => {
        let startTime = new Date(element.senderTime);
        replyList[index].createTime = utils.timeFormat(startTime, "MM月dd日 hh:mm:ss");
        if (element.replyContents.length > 0) {
          element.replyContents.forEach((ele, indexReply) => {
            let startTimeReply = new Date(ele.senderTime);
            replyList[index].replyContents[indexReply].createTime = utils.timeFormat(startTimeReply, "MM月dd日 hh:mm:ss");
          })
        }
      });
      this.setData({
        commentList: replyList
      })
    }
  },

  /**
   * 点击评论
   * @param {string} e 获取当前数据
   */
  _goToReply(e) {
    console.log(e)
    let self = this;
    let {
      contentid,
      battleTag,
      replyid
    } = e.currentTarget.dataset;
    //判断是否微信授权
    if (!self.data.wxLogin) {
      self.setData({
        commitShowLogin: true
      })
      return false;
    }
    wx.showActionSheet({
      itemList: ['回复', '举报'],
      success: function(res) {
        if (!res.cancel) {
          //前往评论 
          if (res.tapIndex == 0) {
            //判断是否是 评论的评论
            self._goToComment(replyid, battleTag);
          }
          //举报按钮
          if (res.tapIndex == 1) {
            //弹出框
            self.setComplain(contentid);
          }
        } else { //取消选择

        }
      }
    });
  },
  /**
   * 设置举报功能
   * @param {string} contentid 
   */
  setComplain(contentid) {
    let complainJson = ["敏感信息", "语言辱骂", "其它"];
    wx.showActionSheet({
      itemList: complainJson,
      success: async res => {
        if (!res.cancel) {

        }
      }
    });
  },

  /**
   * 跳转去评论
   */
  _goToComment(replyId, reply) {
    console.log(replyId, reply)
    let urlData = {
      attachment: reply.attachment,
      attachmentName: reply.attachmentName,
      commentText: reply.commentText,
      commentedId: reply.commentedId,
      commentedUserName: reply.commentedUserName,
      id: reply.id,
      level: reply.level,
      pId: reply.pId,
      photo: reply.photo,
      senderLogName: reply.senderLogName,
      senderUserName: reply.senderUserName,
      senderUserPhoto: reply.senderUserPhoto,
      sort: reply.sort,
      subjectId: reply.subjectId
    };
    console.log(utils.objToQuerystring(urlData))
    wx.navigateTo({
      url: `/pages/page/answer/answer_center_submit/index?${utils.objToQuerystring(urlData)}`
    });
  },
})