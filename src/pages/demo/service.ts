import request from '@/utils/request'

/**
 * 获取demo列表
 */
export const fetchDemoList = () => {
  return request.get(`/demo-list`)
}
