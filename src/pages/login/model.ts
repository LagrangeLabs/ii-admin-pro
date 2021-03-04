import { stringify } from 'querystring'
import { history } from 'umi'
import type { Effect } from 'umi'
import { fakeAccountLogin } from './service'
import { getPageQuery } from '@/utils/utils'
import { message } from 'antd'

export interface IState {
  status?: boolean
  currentAuthority?: 'user' | 'guest' | 'admin'
}

export interface IEffect {
  login: Effect
  logout: Effect
}

export interface IReducer {}

const Model: DvaModel<IState, IEffect, IReducer> = {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call }) {
      const response = yield call(fakeAccountLogin, payload)
      // 登录成功
      if (response.code === 0) {
        const urlParams = new URL(window.location.href)
        const params = getPageQuery()
        message.success('🎉 🎉 🎉  登录成功！')
        let { redirect } = params as { redirect: string }
        if (redirect) {
          const redirectUrlParams = new URL(redirect)
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length)
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1)
            }
          } else {
            window.location.href = '/'
            return
          }
        }
        history.replace(redirect || '/')
      }
    },

    logout() {
      const { redirect } = getPageQuery()
      // Note: There may be security issues, please note
      if (window.location.pathname !== '/login' && !redirect) {
        history.replace({
          pathname: '/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      }
    },
  },

  reducers: {},
}

export default Model
