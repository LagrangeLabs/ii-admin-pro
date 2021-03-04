import request from '@/utils/request'

export interface LoginParamsType {
  username: string
  password: string
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request.post('/login/account', params)
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/login/captcha?mobile=${mobile}`)
}
