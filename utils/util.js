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

module.exports = {
  formatTime,
  AESEncrypt,
}