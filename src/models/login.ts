import { Reducer } from 'redux';
import { Effect } from 'dva';
import { history } from 'umi';
import {
  fetchAccountLoginAsync,
  updatePasswordAsync,
  IUserInfo,
} from '@/services/login';
import { setAuthToken } from '@/utils/request';
import { getPageQuery } from '@/utils/utils';
import { stringify } from 'querystring';
import { message } from 'antd';

export interface LoginModelState {
  currentAuthority?: 'user' | 'guest' | 'admin';
  userInfo?: IUserInfo;
}

export interface LoginModelType {
  namespace: string;
  state: LoginModelState;
  effects: {
    login: Effect;
    logout: Effect;
    getPermissions: Effect;
    getVerifyCode: Effect;
    updatePassword: Effect;
  };
  reducers: {
    setUserInfo: Reducer<LoginModelState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    userInfo: {},
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const res = yield call(fetchAccountLoginAsync, payload);
        yield put({
          type: 'setUserInfo',
          payload: res.data,
        });
        return res;
      } catch (err) {
        yield put({ type: 'setUserInfo', payload: {} });
        throw new Error(err);
      }
    },

    *logout({ payload }, { call, put }) {
      const { redirect } = getPageQuery();

      if (window.location.pathname !== '/user/login' && !redirect) {
        history.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
    *getVerifyCode({ payload }, { call, put }) {
      const res = yield call(fetchVerfiyCodeAsync, payload);

      if (0 === res.code) {
        return res;
      }
    },
    *updatePassword({ payload }, { call, put }) {
      const res = yield call(updatePasswordAsync, payload);

      if (0 === res.code) {
        message.success('密码更新成功');
        return res;
      }
    },
  },
  reducers: {
    setUserInfo(state, { payload = {} }) {
      const { authorization = '' } = payload;

      setAuthToken(authorization); // 设置请求体
      localStorage.setItem('userInfo', JSON.stringify(payload)); // 设置缓存

      return {
        ...state,
        userInfo: payload,
      };
    },
  },
};

export default LoginModel;
