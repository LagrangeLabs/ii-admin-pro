import request from '@/utils/request'

export async function fetchCommonAsync({ url, method = 'get', ...restParams }: any): Promise<any> {
  const data: any = {}
  // 过滤空字符串
  Object.keys(restParams).forEach((key: string) => {
    const element = restParams[key]
    if (element !== '') {
      data[key] = element
    }
  })
  const params: any = {
    method,
  }
  if (method.toLowerCase() === 'get') {
    params.params = data
  } else {
    params.data = data
  }
  return request(url, { method, ...params })
}
