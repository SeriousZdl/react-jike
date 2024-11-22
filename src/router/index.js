// 路由配置
import { createBrowserRouter } from "react-router-dom";

// 注意！！！ 不要加{} 组件不需要加{}
import  Layout  from "@/pages/Layout";
import  Login  from "@/pages/Login";
// 路由配置
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",


    
    element: <Login />,
  }
])

export default router