import { fetchDemoList } from '@/pages/demo/services/demo'
import generateTableModel from '@/utils/pluginModel'
import { merge } from 'lodash'
import { IDemoRow } from '../data'

export interface StateType {}

export interface DemoModelType {
  namespace: string
  state: StateType
  effects: {}
  reducers: {}
}

const namespace = 'demo'
const tableCommonModel = generateTableModel<IDemoRow>(namespace, {
  fetchListApi: fetchDemoList,
})

const DemoModel: DemoModelType = {
  namespace,
  state: {},
  effects: {},
  reducers: {},
}

export default merge(tableCommonModel, DemoModel)
