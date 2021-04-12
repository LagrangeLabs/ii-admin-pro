import type { Reducer } from 'umi'

export interface GlobalModelState {
  collapsed: boolean
}

export interface GlobalModelType {
  namespace: 'global'
  state: GlobalModelState
  // eslint-disable-next-line @typescript-eslint/ban-types
  effects: {}
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>
    updateState: Reducer<GlobalModelState>
  }
}

const GlobalModel: GlobalModelType = {
  namespace: 'global',

  state: {
    collapsed: false,
  },

  effects: {},

  reducers: {
    changeLayoutCollapsed(state = { collapsed: true }, { payload }): GlobalModelState {
      return {
        ...state,
        collapsed: payload,
      }
    },
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export default GlobalModel
