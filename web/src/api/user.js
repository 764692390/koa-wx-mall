import axios from '@/libs/api.request'

export const login = ({ userName, password }) => {
  const data = {
    userName,
    password
  }
  return axios.request({
    url: '/adminUser/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/adminUser/getUserInfo',
    method: 'get'
  })
}
