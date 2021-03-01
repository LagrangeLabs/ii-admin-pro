import request from '@/utils/request'

export interface LoginParamsType {
  username: string
  password: string
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request.post('/api/login/account', {
    data: params,
  })
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`)
}
