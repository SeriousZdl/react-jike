import  { useState, useEffect } from "react"
import { getchannelAPI } from "@/apis/article"
function useChannel() {
    // 获取频道列表
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
      // 1. 封装函数 
      const getChannelList = async () => {
        const res = await getchannelAPI()
        setChannelList(res.data.channels)
      }
      // 2. 调用函数
      getChannelList()
    }, [])
  
  
  return {
    channelList
  }
}
export {useChannel}