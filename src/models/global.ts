import { Reducer } from 'redux';
import { fetchNoticesAsync, updateNoticeAsync } from '@/services/global';
import { Effect } from 'dva';
import { message } from 'antd';

export interface GlobalModelState {
  collapsed?: boolean;
  notices?: [];
  unRead?: 0;
}

export interface GlobalModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {
    queryNoticeList?: Effect;
    updateNotice?: Effect;
    changeNoticeReadState?: Effect;
  };
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>;
    saveNotices: Reducer<GlobalModelState>;
    saveUnread: Reducer<GlobalModelState>;
  };
  subscriptions: any;
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {
    collapsed: false,
    notices: [],
    unRead: 0,
  },
  effects: {
    *queryNoticeList({ payload }, { call, put }) {
      const res = yield call(fetchNoticesAsync, payload);

      if (0 === res.code) {
        const { message = {}, unReadCount = 0 } = res.data;
        const { records = [] } = message;
        const { isRead = 0 } = payload;

        if (isRead === 0) {
          yield put({
            type: 'saveNotices',
            payload: records,
          });
          yield put({
            type: 'saveUnread',
            payload: unReadCount,
          });
        }

        return res.data;
      }
    },
    *updateNotice({ payload }, { call, put, select }) {
      const res = yield call(updateNoticeAsync, payload);

      if (0 === res.code) {
        return res.data;
      }
    },
    *changeNoticeReadState({ payload }, { put, select }) {
      const notices = yield select(state =>
        state.global.notices.map(item => {
          const notice = { ...item };
          if (notice.id === payload) {
            notice.read = true;
          }
          return notice;
        }),
      );

      yield put({
        type: 'saveNotices',
        payload: notices,
      });
    },
  },
  reducers: {
    changeLayoutCollapsed(
      state = { collapsed: true },
      { payload },
    ): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }): GlobalModelState {
      return {
        ...state,
        notices: payload,
      };
    },
    saveUnread(state, { payload }): GlobalModelState {
      return {
        ...state,
        unRead: payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const { pathname } = location;

        if (pathname !== '/user/login' && pathname !== '/') {
          // To do something
        }
      });
    },
  },
};

export default GlobalModel;
