// 封装高阶组件
// 核心逻辑 : 由token 正常跳转 无token 跳转登录页面

import { getToken } from "@/utils/token";
import { Navigate } from "react-router-dom";

export function AuthRoute ({ children }) {
  const token = getToken();
  if (token) {
    return <>{children}</>
  } else {
    return <Navigate to="/login" replace/>;
  }
}