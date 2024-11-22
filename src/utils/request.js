// axios 封装处理
import axios from 'axios'
// 1.根域名配置
// 2. 超时时间
// 3. 请求拦截器 // 响应拦截器



// 创建一个 axios 实例
const request = axios.create({
  // 根域名
  baseURL: 'http://geek.itheima.net/v1_0',
  // 超时时间
  timeout: 5000
})

// 添加请求拦截器
// 再请求发送之前 做拦截 插入一些自定义的配置 [参数处理]
request.interceptors.response.use((config) => {
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
  return Promise.reject(error)
}
)

export {request} 