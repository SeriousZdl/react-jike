// 用于封装 统一中转工具函数 避免污染


import { request } from "./request";

import { getToken, setToken,removeToken } from "@/utils/token";

export {
  request,
  getToken,
  setToken,
  removeToken
}