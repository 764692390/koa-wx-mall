import axios from '@/libs/api.request'

export const workUserAdd = (data) => {
  return axios.request({
    url: '/workUser/add',
    method: 'post',
    data
  })
}

export const workUserGetList = (data) => {
  return axios.request({
    url: '/workUser/getList',
    method: 'get',
    params: data
  })
}
