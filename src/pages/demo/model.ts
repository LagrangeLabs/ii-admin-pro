import { fetchDemoList } from '@/pages/demo/service'
import generateTableModel from '@/utils/pluginModel'
import { merge } from 'lodash'
import { IDemoRow } from './interface'

export interface IState {}

export interface IEffect {}

export interface IReducer {}

const namespace = 'demo'
const tableCommonModel = generateTableModel<IDemoRow>(namespace, {
  fetchListApi: fetchDemoList,
})

const DemoModel: DvaModel<IState, IEffect, IReducer> = {
  namespace,
  state: {},
  effects: {},
  reducers: {},
}

export default merge(tableCommonModel, DemoModel)
