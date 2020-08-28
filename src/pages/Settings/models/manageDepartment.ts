import {
  fetchListAsync,
  createItemAsync,
  updateItemAsync,
  deleteItemAsync,
  updateItemStatusAsync,
  resetPasswordAsync,
} from '@/services/manageDepartment';
import generateCommonModel, {
  CommonModelState,
  CommonModelEffects,
  CommonModelReducers,
} from '@/utils/redux';
import { message } from 'antd';
import _ from 'lodash';

export type ManageDepartmentModelState = CommonModelState;

export interface ManageDepartmentModelType {
  namespace: string;
  state: ManageDepartmentModelState;
  effects: CommonModelEffects;
  reducers: CommonModelReducers<ManageDepartmentModelState>;
}

const CommonModel: ManageDepartmentModelType = generateCommonModel(
  'manageDepartment',
  {
    fetchListApi: fetchListAsync,
    createItemApi: createItemAsync,
    updateItemApi: updateItemAsync,
    deleteItemApi: deleteItemAsync,
  },
);

const ExtendModel: Partial<ManageDepartmentModelType> = {
  effects: {
    *queryTableList({ payload }, { call, put }) {
      const res = yield call(fetchListAsync, payload);
      console.log('-------:', res);

      if (0 === res.code) {
        let { records = [], total = 0 } = res.data;

        yield put({
          type: 'saveTableList',
          payload: records,
        });
        yield put({
          type: 'saveTotal',
          payload: total,
        });
      }
    },
    *enableItem({ payload }, { call, put }) {
      const res = yield call(updateItemStatusAsync, payload);

      if (0 === res.code) {
        message.success('操作成功');
        return res;
      }
    },
    *resetItem({ payload }, { call, put }) {
      const res = yield call(resetPasswordAsync, payload);

      if (0 === res.code) {
        message.success('操作成功');
        return res;
      }
    },
  },
};

const ManageDepartmentModel = _.merge(CommonModel, ExtendModel);

export default ManageDepartmentModel;
