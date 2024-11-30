// axios 封装处理
import axios from 'axios'
import { removeToken } from '@/utils/token'
import router from '@/router'
// 1.根域名配置
// 2. 超时时间
// 3. 请求拦截器 // 响应拦截器

// 获取token
import { getToken } from '@/utils/token'
// 创建一个 axios 实例
const request = axios.create({
  // 根域名
  baseURL: 'http://geek.itheima.net/v1_0',
  // 超时时间
  timeout: 5000
})

// 添加请求拦截器
// 再请求发送之前 做拦截 插入一些自定义的配置 [参数处理]
request.interceptors.request.use((config) => {
  // 操作这个config 注入token数据
  //1. 获取到token
  const token = getToken()
  //2. 按照后端的格式要求做token拼接
  if (token) {
    // config.headers.Authorization 为 axios的固定写法    Bearer 是由后端决定的拼接方式
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
}
)

// 添加响应拦截器
// 在响应返回到客户端之前 做拦截 重点处理返回的数据
request.interceptors.response.use((response) => {
  // 2XX 范围内的状态码都会触发该函数
  // 对响应的数据做点什么
  return response.data
}, (error) => {
  // 2XX 范围内的状态码都会触发该函数
  // 对响应错误做点什么
  if(error.response.status === 401) {
    removeToken()
    router.navigate('/login')
    // 强制刷新 页面  使其不显示401报错信息
    window.location.reload()
  }
  return Promise.reject(error)
}
)

export {request} 