/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import modelExtend from 'dva-model-extend'
// import { model } from '@/utils/model';

// import { cloneDeep } from 'lodash';

import pathToRegexp from 'path-to-regexp'
import { getOptionFromArray } from './config/utils'

import services, { replaceParams } from '@/services/index.js'

import * as CONST from './config/index.js'
import searchTableConfig from './config/tableConfig.js'
import { fetchCommonAsync } from './service'

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export default modelExtend(model, {
  namespace: 'mySearchTable',
  state: {
    listKey: 'records',
    pageNumKey: 'page',
    pageSizeKey: 'size',
    total: 0,
    current: 1,
    pageSize: CONST.PAGE_SIZE_20,
    showCreate: false,
    deleteWarnModal: false,
    deleteTitle: '',
    deleteId: '',
    createText: '',
    defaultParams: {},
    options: [],
    columns: [],
    scroll: true,
    currentIds: [],
    tableList: [],
    modalInfo: {},
    createFormInfo: {},
    drawerTheme: true,
    modalTheme: false,
    pageTableProps: {},
    treeData: [],
    filterOptions: {},
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const match = pathToRegexp('/:start/searchTable/:type').exec(location.pathname)
        if (match) {
          const { id = '' } = location.query
          const type = match[2]
          const config = searchTableConfig[type] || {}
          const {
            selectOptions: options = [],
            columns,
            createFormInfo,
            fetchUrl,
            fetchTree,
            pageTableProps = {},
            listKey = 'records',
            pageNumKey = 'page',
            pageSizeKey = 'size',
            deleteActionInfo,
            drawerTheme = true,
            modalTheme = false,
            ...restParams
          } = config
          dispatch({
            type: 'updateState',
            payload: {
              pageTitle: '',
              options,
              columns,
              id,
              fetchUrl,
              createFormInfo,
              listKey,
              pageNumKey,
              pageSizeKey,
              pageTableProps,
              deleteActionInfo,
              drawerTheme,
              modalTheme,
              ...restParams,
            },
          })
          if (fetchTree) {
            dispatch({
              type: 'fetchTree',
              payload: {
                url: fetchTree,
              },
            })
          }
          dispatch({
            type: 'queryOption',
            payload: {
              options: config.selectOptions,
            },
          })
        }
      })
    },
  },
  reducers: {
    clear(state, { payload }) {
      return {
        ...payload,
      }
    },
  },
  effects: {
    // 列表中获取数据
    *fetchList({ payload }, { call, put, select }) {
      const {
        fetchUrl,
        pageTableProps,
        idKey = '',
        id,
        fetchMethod = 'get',
        pageNumKey = 'page',
        pageSizeKey = 'size',
        listKey = 'records',
      } = yield select((state) => state.mySearchTable)
      const { pageNum, pageSize } = payload
      payload[pageNumKey] = pageNum
      payload[pageSizeKey] = pageSize
      if (idKey && id) {
        payload[idKey] = id
      }
      const url = replaceParams(fetchUrl, payload)
      if (pageTableProps.searchTreeKey) {
        if (
          payload[pageTableProps.searchTreeKey] ===
          pageTableProps.treeExtra?.defaultExpandedKeys?.[0]
        ) {
          payload[pageTableProps.searchTreeKey] = ''
        }
      }
      delete payload.type
      const params = { ...payload, ...pageTableProps.extraParams }
      const result = yield call(fetchCommonAsync, {
        url,
        ...params,
        method: fetchMethod,
      })
      const data = result.data || []
      // if (!type) {
      yield put({
        type: 'updateState',
        payload: { filterOptions: { ...payload } },
      })
      if (data instanceof Array) {
        yield put({
          type: 'updateState',
          payload: {
            tableList: data,
            total: result.count,
            resetFresh: false,
          },
        })
      } else {
        const { total = 0, [listKey]: tableList = [] } = data
        yield put({
          type: 'updateState',
          payload: { total, tableList, resetFresh: false },
        })
      }
      // } else {
      //   return data instanceof Array ?data: data[listKey];
      // }
    },
    // 获取组织结构
    *fetchTree({ payload }, { call, put }) {
      const { url } = payload
      const { data = [] } = yield call(fetchCommonAsync, {
        url,
      })
      const treeData = [{ id: -1, name: '全部', subs: data }]
      yield put({
        type: 'updateState',
        payload: { treeData },
      })
    },
    // 列表中获取数据
    *queryOption({ payload: { options = [] } }, { call, put, select }) {
      for (let index = 0; index < options.length; index++) {
        const item = options[index]
        if (item.optionUrl) {
          const optionAll = yield select((state) => state[CONST.OPTION_INFO])
          let data = optionAll[item.optionGolbalName]
          if (data) {
            // const resultOptions = getOptionFromArray(data, item.transKey);
            item.options = data
          } else {
            const dataFetch = yield call(fetchCommonAsync, {
              url: item.optionUrl,
              method: item.methods || 'get',
              ...item.params,
            })
            data = dataFetch.data
            if (!data) {
              // eslint-disable-next-line no-continue
              continue
            }
            const resultOptions = getOptionFromArray(data, item.transKey)
            item.options = resultOptions
            yield put({
              type: `${CONST.OPTION_INFO}/updateState`,
              payload: {
                [item.optionGolbalName]: resultOptions,
              },
            })
          }
        }
      }
      yield put({ type: 'updateState', payload: { options } })
    },
    *handleTableAction({ payload }, { call, put }) {
      const { service, data } = payload
      if (!services[service]) {
        return
      }
      yield call(services[service], data)
      yield put({
        type: 'updateState',
        payload: { modalVisible: false, resetFresh: true },
      })
    },
    *queryItemInfo({ payload }, { call }) {
      const { service, data } = payload
      const { data: result = {} } = yield call(services[service], data)
      return result
    },
  },
})
