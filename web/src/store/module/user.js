import {
  login
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
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      commit('setToken', '')
    }
  }
}
