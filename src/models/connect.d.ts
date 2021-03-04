import { MenuDataItem, Settings as ProSettings } from '@ant-design/pro-layout'
import { StateType as DemoStateType } from '@/pages/demo/models/demo'
import { GlobalModelState } from './global'
import { UserModelState } from './user'
import { StateType } from '@/pages/login/model'

export { GlobalModelState, UserModelState }

export interface Loading {
  global: boolean
  effects: { [key: string]: boolean | undefined }
  models: {
    global?: boolean
    menu?: boolean
    setting?: boolean
    user?: boolean
    login?: boolean
  }
}

export interface ConnectState {
  global: GlobalModelState
  loading: Loading
  settings: ProSettings
  user: UserModelState
  login: StateType
  demo: DemoStateType
}

export interface Route extends MenuDataItem {
  routes?: Route[]
}
