// 封装和token相关的方法 存 取 删
const TOKRENKEY =  'token_key'
function setToken(token) {
  return localStorage.setItem(TOKRENKEY,token)
}
function getToken() {
  return localStorage.getItem(TOKRENKEY)
}
function removeToken() {
  return localStorage.removeItem(TOKRENKEY)
}
export {
    setToken,
    getToken,
    removeToken
}