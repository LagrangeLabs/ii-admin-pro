import { Reducer } from 'umi'

export interface GlobalModelState {
  collapsed: boolean
}

export interface GlobalModelType {
  namespace: 'global'
  state: GlobalModelState
  effects: {}
  reducers: {
    changeLayoutCollapsed: Reducer<GlobalModelState>
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
  },
}

export default GlobalModel
