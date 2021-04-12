/* eslint-disable no-undef */
import request from '@/utils/request'
// import { apiPrefix } from '@/utils/config';

import api from './api.ts'

const REG_PARAMS = /{([a-zA-Z]+)}/g

export function replaceParams(url, data) {
  let resultUrl = url
  // 替换url 中 的参数
  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = REG_PARAMS.exec(url))) {
    if (data[match[1]]) {
      resultUrl = resultUrl.replace(match[0], data[match[1]])
    }
  }
  return resultUrl
}

const gen = (params) => {
  // let url = apiPrefix[__API_PREFIX_FLAG__] + params;
  let url = params
  let method = 'GET'

  const paramsArray = params.split(' ')
  if (paramsArray.length === 2) {
    ;[method, url] = paramsArray
    // url = apiPrefix[__API_PREFIX_FLAG__] + paramsArray[1];
  }

  return function send(data) {
    let resultUrl = url
    // 替换url 中 的参数
    let match
    // eslint-disable-next-line no-cond-assign
    while ((match = REG_PARAMS.exec(url))) {
      if (data[match[1]]) {
        resultUrl = resultUrl.replace(match[0], data[match[1]])
      }
    }
    // if (data.pageSize) {
    //   let originUrl = url;
    //   resultUrl = originUrl.replace('{pageSize}', data.pageSize).replace('{pageNum}', data.pageNum);
    // } else if() {

    // }
    const requestParams = {
      // url: resultUrl,
      data,
      method,
    }
    if (method.toLowerCase() === 'get') {
      requestParams.params = data
    }
    return request(resultUrl, requestParams)
  }
}

const APIFunction = {}
Object.keys(api).forEach((key) => {
  APIFunction[key] = gen(api[key])
})

export default APIFunction
