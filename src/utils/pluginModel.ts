import type { Reducer, Effect } from 'umi'

import { message } from 'antd'

export type PluginModelState<T = any> = {
  total?: number
  current?: number
  tableList?: T[]
  filterOpts?: object[][] | object
}

export type PluginModelEffects = {
  createItem?: Effect
  updateItem?: Effect
  deleteItem?: Effect
  queryItemInfo?: Effect
  queryTableList?: Effect
  queryFilterOpts?: Effect
}

export type PluginModelReducers<T> = {
  saveTableList?: Reducer<T>
  saveTotal?: Reducer<T>
  saveCurrent?: Reducer<T>
  saveFilterOpts?: Reducer<T>
}

export type PluginServices = {
  /** 创建单个条目接口 */
  createItemApi?: (params: any) => Promise<any>
  /** 更新单个条目接口 */
  updateItemApi?: (params: any) => Promise<any>
  /** 删除单个条目接口 */
  deleteItemApi?: (params: any) => Promise<any>
  fetchItemInfoApi?: (params: any) => Promise<any>
  /** 获取表单列表接口 */
  fetchListApi?: (params: any) => Promise<any>
  /** 获取表单过滤选项接口 */
  fetchFilterOptsApi?: (params: any) => Promise<any>
}

export type PluginModelConfig = {
  /** 是否展示序列号 */
  showSerial?: boolean
}

const generatePluginModel = <T>(
  name: string,
  services: PluginServices,
  config: PluginModelConfig = {},
) => {
  const effects: PluginModelEffects = {
    *createItem({ payload }, { call }) {
      const { _msg = '操作成功', ...params } = payload
      const res = yield call(services.createItemApi, params)
      message.success(_msg)
      return res
    },
    *updateItem({ payload }, { call }) {
      const { _msg = '操作成功', ...params } = payload
      const res = yield call(services.updateItemApi, params)
      message.success(_msg)
      return res
    },
    *deleteItem({ payload }, { call }) {
      let res

      // 针对删除操作，payload 数据格式通常是一串数字，即ID值
      if (Object.prototype.toString.call(payload) === '[object Object]') {
        const { _msg = '操作成功', ...params } = payload

        res = yield call(services.deleteItemApi, params)

        message.success(_msg)
      } else {
        res = yield call(services.deleteItemApi, payload)
      }

      return res
    },
    *queryItemInfo({ payload }, { call }) {
      return yield call(services.fetchItemInfoApi, payload)
    },
    *queryTableList({ payload }, { call, put }) {
      const res = yield call(services.fetchListApi, payload)
      const { showSerial } = config
      let records = res.data?.records || []
      const total = res.data?.total || 0

      if (showSerial) {
        const { current, size } = payload

        const newData = records.map((item: any, index: number) => ({
          serialNumber: (current - 1) * size + index + 1,
          ...item,
        }))

        records = newData
      }

      yield put({ type: 'saveTableList', payload: records })
      yield put({ type: 'saveTotal', payload: total })
      yield put({ type: 'saveCurrent', payload: payload.current })

      return res
    },
    *queryFilterOpts({ payload }, { call, put }) {
      const res = yield call(services.fetchFilterOptsApi, payload)

      if (res.code === 0) {
        yield put({
          type: 'saveFilterOpts',
          payload: res.data,
        })
      }
    },
  }

  const reducers: PluginModelReducers<PluginModelState<T>> = {
    saveTableList(state, { payload }) {
      return {
        ...state,
        tableList: payload,
      }
    },
    saveTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      }
    },
    saveCurrent(state, { payload }) {
      return {
        ...state,
        current: payload,
      }
    },
    saveFilterOpts(state, { payload }) {
      return {
        ...state,
        filterOpts: payload,
      }
    },
  }

  return {
    namespace: name,
    state: {
      total: 0,
      tableList: [],
      filterOpts: [],
    },
    effects,
    reducers,
  }
}

export default generatePluginModel
