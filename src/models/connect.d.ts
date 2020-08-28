import { AnyAction, Dispatch } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { LoginModelState } from './login';
import { ManageUserModelState } from '@/pages/Settings/models/manageUser';

export {
  GlobalModelState,
  LoginModelState,
  SettingModelState,
  ManageUserModelState,
};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    menu?: boolean;
    user?: boolean;
    login?: boolean;
  };
}

export interface ConnectState {
  global: GlobalModelState;
  loading: Loading;
  login: LoginModelState;
  settings: SettingModelState;
  manageUser: ManageUserModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}

export default ConnectState;
