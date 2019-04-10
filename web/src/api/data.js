import axios from '@/libs/api.request'

export const workUserAdd = (data) => {
  return axios.request({
    url: '/workUser/add',
    method: 'post',
    data
  })
}

export const workUserUpdata = (data) => {
  return axios.request({
    url: '/workUser/updata',
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

export const getAllJobType = () => {
  return axios.request({
    url: '/jobType/getAll',
    method: 'get'
  })
}
