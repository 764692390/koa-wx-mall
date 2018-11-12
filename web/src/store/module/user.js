import {
  login,
  getUserInfo
} from '@/api/user'

import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    token: getToken(),
    userInfo: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    }
  },
  getters: {
    getUserInfo: state => state.userInfo,
    messageUnreadCount: state => 3
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {userName, password}) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          commit('setToken', data.token || '')
          commit('setUserInfo', data || null )
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      commit('setToken', '')
    },
    // 获取用户基本信息
    getUserinfoFn({ state, commit }) {
      getUserInfo().then(res => {
        commit('setUserInfo', res.data.data)
      })
    }
  }
}
