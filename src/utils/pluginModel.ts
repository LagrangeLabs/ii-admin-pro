import { Reducer, Effect } from 'umi'

import { message } from 'antd'

export interface PluginModelState<T extends any> {
  total?: number
  tableList?: T[]
  filterOpts?: Array<object>[] | object
}

export interface PluginModelEffects {
  createItem?: Effect
  updateItem?: Effect
  deleteItem?: Effect
  queryItemInfo?: Effect
  queryTableList?: Effect
  queryFilterOpts?: Effect
}

export interface PluginModelReducers<T> {
  saveTableList?: Reducer<T>
  saveTotal?: Reducer<T>
  saveFilterOpts?: Reducer<T>
}

export interface PluginServices {
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

export interface PluginModelConfig {
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
      try {
        const { _msg = '操作成功', ...params } = payload
        const res = yield call(services.createItemApi, params)

        message.success(_msg)

        return res
      } catch (err) {
        throw new Error(err)
      }
    },
    *updateItem({ payload }, { call }) {
      try {
        const { _msg = '操作成功', ...params } = payload
        const res = yield call(services.updateItemApi, params)

        message.success(_msg)

        return res
      } catch (err) {
        throw new Error(err)
      }
    },
    *deleteItem({ payload }, { call }) {
      try {
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
      } catch (err) {
        throw new Error(err)
      }
    },
    *queryItemInfo({ payload }, { call }) {
      try {
        const res = yield call(services.fetchItemInfoApi, payload)
        return res
      } catch (err) {
        throw new Error(err)
      }
    },
    *queryTableList({ payload }, { call, put }) {
      try {
        const res = yield call(services.fetchListApi, payload)

        const { showSerial } = config
        let { records = [] } = res.data
        const { total } = res.data

        if (showSerial) {
          const { pageNum, pageSize } = payload

          const newData = records.map((item: any, index: number) => ({
            serialNumber: (pageNum - 1) * pageSize + index + 1,
            ...item,
          }))
          records = newData
        }

        yield put({ type: 'saveTableList', payload: records })
        yield put({ type: 'saveTotal', payload: total })
        return res
      } catch (err) {
        yield put({ type: 'saveTableList', payload: [] })
        yield put({ type: 'saveTotal', payload: 0 })

        throw new Error(err)
      }
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
