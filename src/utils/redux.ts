import { Reducer } from 'redux';
import { Effect } from 'dva';
import { message } from 'antd';

export interface CommonModelState {
  total?: number;
  tableList?: Array<object>[];
  filterOpts?: Array<object>[] | object;
}

export interface CommonModelEffects {
  createItem?: Effect;
  updateItem?: Effect;
  deleteItem?: Effect;
  queryItemInfo?: Effect;
  queryTableList?: Effect;
  queryFilterOpts?: Effect;
}

export interface CommonModelReducers<T> {
  saveTableList?: Reducer<T>;
  saveTotal?: Reducer<T>;
  saveFilterOpts?: Reducer<T>;
}

export interface CommonServices {
  /** 创建单个条目接口 */
  createItemApi?: (params: any) => Promise<any>;
  /** 更新单个条目接口 */
  updateItemApi?: (params: any) => Promise<any>;
  /** 删除单个条目接口 */
  deleteItemApi?: (params: any) => Promise<any>;
  fetchItemInfoApi?: (params: any) => Promise<any>;
  /** 获取表单列表接口 */
  fetchListApi?: (params: any) => Promise<any>;
  /** 获取表单过滤选项接口 */
  fetchFilterOptsApi?: (params: any) => Promise<any>;
}

export interface CommonModelConfig {
  /** 是否展示序列号 */
  showSerial?: boolean;
}

const generateCommonModel = (
  name: string,
  services: CommonServices,
  config: CommonModelConfig = {},
) => {
  const effects: CommonModelEffects = {
    *createItem({ payload }, { call, put }) {
      try {
        const { _msg = '操作成功', ...params } = payload;
        const res = yield call(services.createItemApi, params);

        _msg && message.success(_msg);

        return res;
      } catch (err) {
        throw new Error(err);
      }
    },
    *updateItem({ payload }, { call, put }) {
      try {
        const { _msg = '操作成功', ...params } = payload;
        const res = yield call(services.updateItemApi, params);

        _msg && message.success(_msg);

        return res;
      } catch (err) {
        throw new Error(err);
      }
    },
    *deleteItem({ payload }, { call, put }) {
      try {
        let res;

        // 针对删除操作，payload 数据格式通常是一串数字，即ID值
        if (Object.prototype.toString.call(payload) === '[object Object]') {
          const { _msg = '操作成功', ...params } = payload;

          res = yield call(services.deleteItemApi, params);

          _msg && message.success(_msg);
        } else {
          res = yield call(services.deleteItemApi, payload);
        }

        return res;
      } catch (err) {
        throw new Error(err);
      }
    },
    *queryItemInfo({ payload }, { call, put }) {
      try {
        const res = yield call(services.fetchItemInfoApi, payload);
        return res;
      } catch (err) {
        throw new Error(err);
      }
    },
    *queryTableList({ payload }, { call, put }) {
      try {
        const res = yield call(services.fetchListApi, payload);

        const { showSerial } = config;
        let { records = [], total = 0 } = res.data;

        if (showSerial) {
          const { pageNum, pageSize } = payload;

          const newData = records.map((item: any, index: number) => ({
            serialNumber: (pageNum - 1) * pageSize + index + 1,
            ...item,
          }));
          records = newData;
        }

        yield put({ type: 'saveTableList', payload: records });
        yield put({ type: 'saveTotal', payload: total });
        return res;
      } catch (err) {
        yield put({ type: 'saveTableList', payload: [] });
        yield put({ type: 'saveTotal', payload: 0 });

        throw new Error(err);
      }
    },
    *queryFilterOpts({ payload }, { call, put }) {
      const res = yield call(services.fetchFilterOptsApi, payload);

      if (0 === res.code) {
        yield put({
          type: 'saveFilterOpts',
          payload: res.data,
        });
      }
    },
  };

  const reducers: CommonModelReducers<CommonModelState> = {
    saveTableList(state, { payload }) {
      return {
        ...state,
        tableList: payload,
      };
    },
    saveTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
    saveFilterOpts(state, { payload }) {
      return {
        ...state,
        filterOpts: payload,
      };
    },
  };

  return {
    namespace: name,
    state: {
      total: 0,
      tableList: [],
      filterOpts: [],
    },
    effects,
    reducers,
  };
};

export default generateCommonModel;
