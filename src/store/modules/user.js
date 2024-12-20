// 和用户相关的状态管理
import { createSlice } from '@reduxjs/toolkit'
import { setToken as _setToken, getToken, removeToken } from '@/utils'
import {loginAPI,getProfileAPI} from '@/apis/user'

const userStore = createSlice({
  name: 'user',
  // 数据状态
  initialState: {
    token: getToken() || '',
    userInfo: {}
    },
  // 同步修改方法
  reducers: {
    setToken (state, action) {
      // 既可以存到Redux 中 也可以存到localstorage中
      state.token = action.payload
      // localstorage 也存一份 _setToken不是我们定义的函数 是我们封装的存储localstroage函数
      _setToken(action.payload)
    },

    setUserInfo (state, action) {
      state.userInfo = action.payload
    },

    clearToken (state) {
      // 清除本地的保存token
      state.token = ''
      // 清除Redux中的token
      state.userInfo = {}
      removeToken()
    }
}
})

// 解构出actionCreater
const {setToken, setUserInfo, clearToken} = userStore.actions

// 获取reducer  函数
const userReducer = userStore.reducer

// 异步方法 完成登录获取token 

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    // 1. 发送异步模块
    // const res = await request.post('/authorizations',loginForm)

    // 由于封装了API 所以直接调用API
    const res = await loginAPI(loginForm)

    // 2. 提交同步action进行token的存入
    dispatch(setToken(res.data.token))
  }
}

// 获取个人用户信息异步方法
const fetchUserInfo = () => {
  return async (dispatch) => {
  //  const res = await request.get('/user/profile')
  const res = await getProfileAPI()
   dispatch(setUserInfo(res.data))
  }
}



export { fetchLogin, fetchUserInfo, setToken, clearToken }

export default userReducer
