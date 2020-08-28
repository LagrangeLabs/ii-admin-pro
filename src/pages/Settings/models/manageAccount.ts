import { Reducer } from 'redux';
import { Effect } from 'dva';
import { message } from 'antd';
import _ from 'lodash';
import {
  fetchListAsync,
  createItemAsync,
  updateItemAsync,
  deleteItemAsync,
  updateItemSmsStatusAsync,
} from '@/services/manageAccount';
import { fetchDepartmentListAsync } from '@/services/manageDepartment';
import generateCommonModel, {
  CommonModelState,
  CommonModelEffects,
  CommonModelReducers,
} from '@/utils/redux';

export interface ManageAccountModelState extends CommonModelState {
  departmentList: [];
}

export interface ManageAccountEffects extends CommonModelEffects {
  enableItem?: Effect;
  queryDepartmentList?: Effect;
}

export interface ManageAccountReducers
  extends CommonModelReducers<ManageAccountModelState> {
  setDepartmentList: Reducer<ManageAccountModelState>;
}

export interface ManageAccountModelType {
  namespace: string;
  state: ManageAccountModelState;
  effects: ManageAccountEffects;
  reducers: ManageAccountReducers;
}

const CommonModel: Partial<ManageAccountModelType> = generateCommonModel(
  'manageAccount',
  {
    fetchListApi: fetchListAsync,
    createItemApi: createItemAsync,
    updateItemApi: updateItemAsync,
    deleteItemApi: deleteItemAsync,
  },
);

const ExtendModel: Partial<ManageAccountModelType> = {
  state: {
    departmentList: [],
  },
  effects: {
    *queryDepartmentList({ payload }, { call, put }) {
      const res = yield call(fetchDepartmentListAsync, payload);

      if (0 === res.code) {
        yield put({
          type: 'setDepartmentList',
          payload: res.data,
        });
      }
    },
    *enableItem({ payload }, { call, put }) {
      const res = yield call(updateItemSmsStatusAsync, payload);

      if (0 === res.code) {
        message.success('操作成功');
        return res;
      }
    },
  },
  reducers: {
    setDepartmentList(state, { payload }) {
      return {
        ...state,
        departmentList: payload,
      };
    },
  },
};

const ManageAccountDataModel = _.merge(CommonModel, ExtendModel);

export default ManageAccountDataModel;
