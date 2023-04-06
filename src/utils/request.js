import router from '@/router'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000 // 超时时间
})

// 请求拦截器
service.interceptors.request.use((config) => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
}) // 请求拦截器

// 响应拦截器
service.interceptors.response.use((response) => {
  const { message, success, data } = response.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
  }
}, (error) => {
  if (error.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  Message.error(error.message)
  return Promise.reject(error)// 直接返回promise的错误 改变当前状态为失败
}) // 响应拦截器

export default service
