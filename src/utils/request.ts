import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { message } from 'antd'

const services = axios.create({
  baseURL: '/api',
})
// 请求拦截器
services.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /* eslint-disable */
    if (localStorage.getItem('accessToken')) {
      config.headers['Authorization'] = localStorage.getItem('accessToken') || ''
    }
    // 根据项目是否接UIC 来确认是否使用下边代码
    config.headers['SERVICE-UID'] =
      process.env.APP_ENV === 'prod' ? 'II-CALL-PLATFORM-SAAS' : 'CLOUDDO-SAAS-BETA' // uic 应用平台标志
    return config
    /* eslint-enable */
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
services.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data
    // 导出blob
    if (response?.config?.responseType === 'blob') {
      return response
    }
    // 未登录
    if (res?.code === 401 || res?.code === 24011 || res?.code === 2009) {
      localStorage.clear()
      // 以下针对UIC不同环境跳转不同登录页面
      // 测试环境
      if (process.env.APP_ENV === 'test') {
        window.location.replace(
          'http://qianyin-zarab-fe-out.dev.ii-ai.tech:8000/#/account?serviceUid=CLOUDDO-SAAS-BETA',
        )
        // 正式环境
      } else if (process.env.APP_ENV === 'prod') {
        window.location.replace(
          'http://qianyin-zarab-fe.ai-indeed.com/#/account?serviceUid=II-CALL-PLATFORM-SAAS',
        )
      }
    }
    // 未成功
    if (res?.code !== 0) {
      message.error(res.msg)
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    message.error(error.message || error.msg || '发生错误')
    return Promise.reject(error)
  },
)

export default services
