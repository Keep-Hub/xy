function telReg (tel) {
  let phoneNumber = /^1[3-9]\d{9}$/
  return phoneNumber.test(tel)
}
function qqReg (QQ) {
  let qq = /^[1-9][0-9]{4,11}$/
  return qq.test(QQ)
}
function pwdReg (pwd) {
  let p = /^[0-9a-zA-Z]{6,16}$/
  return p.test(pwd)
}
function realNameReg (name) {
  let realName = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  return realName.test(name)
}
function emailReg (email) {
  let em = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return em.test(email)
}
export default {
  telReg,
  qqReg,
  pwdReg,
  realNameReg,
  emailReg
}
