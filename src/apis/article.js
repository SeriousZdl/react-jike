// 用户相关的所有的请求
import {request} from "@/utils/request";

// 获取频道列表
export const getchannelAPI = () => {
  return request({
    url: "/channels",
    method: "get",
  })
}

// 提交文章表单
export const createArticleAPI = (data) => {
  return request({
    url: "/mp/articles?draft=false",
    method: "post",
    data,
  })
}