const CryptoJS = require('crypto-js')

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 加密密码
 */
const AESEncrypt = (data, key) => {
  let AES_KEY = CryptoJS.enc.Utf8.parse(key);
  let sendData = CryptoJS.enc.Utf8.parse(data);
  let encrypted = CryptoJS.AES.encrypt(sendData, AES_KEY, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]"
}


/**
 * 将对象转换为请求字符串  {a:1,b:2} => a=1&b=2
 */
const objToQuerystring = (obj) => {
  if (!isObject(obj)) {
    return
  }
  let querystring = ''
  for (let [key, value] of Object.entries(obj)) {
    querystring += `&${key}=${value}`
  }
  return querystring.substring(1)
}

/**
 * 将对象的属性添加search，后台需要  {a:1}=>{['search.a']:1}
 */
const objToSearchObj = (obj) => {
  if (!isObject(obj)) {
    return
  }
  let searchObj = {}
  for (let [key, value] of Object.entries(obj)) {
    searchObj[`search.${key}`] = value
  }
  return searchObj
}

/**
 * 部署格式化日期工具
 * @param date
 * @param fmt
 * @returns {*}
 */
function timeFormat(date, fmt) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = {
  formatTime,
  AESEncrypt,
  objToSearchObj,
  objToQuerystring,
  timeFormat
}