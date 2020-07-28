import { AnyAction, Dispatch } from 'redux';
import { MenuDataItem } from '@ant-design/pro-layout';
import { RouterTypes } from 'umi';
import { GlobalModelState } from './global';
import { DefaultSettings as SettingModelState } from '../../config/defaultSettings';
import { LoginModelState } from './login';
import { ManagePolicyModelState } from '@/pages/ManagePolicy/models/managePolicy';
import { PermissionModelState } from '@/pages/ManagePermission/models/permission';
import { AccountModelState } from '@/pages/ManagePermission/models/account';
import { RoleModelState } from '@/pages/ManagePermission/models/role';
import { ManagePersonalModelState } from '@/pages/ManageClient/models/managePersonal';
import { ManageEnterpriseModelState } from '@/pages/ManageClient/models/manageEnterprise';
import { ContactModelState } from '@/pages/EnterpriseDetail/models/cantacts';
import { ManageNoticeModelState } from '@/pages/ManageNotice/models/manageNotice';
import { RecruitDataModelState } from '@/pages/IntelligentRecruit/models/recruit';
import { ResumeDataModelState } from '@/pages/IntelligentRecruit/models/resume';
import { DataOverviewModelState } from '@/pages/IntelligentRecruit/models/dataOverview';
import { WorkCoordinateModelState } from '@/pages/ManageInvestment/models/coordinate';
import { ManageProjectModelState } from '@/pages/ManageInvestment/models/project';
import { ManageDepartmentModelState } from '@/pages/Communication/models/manageDepartment';
import { ManageAccountModelState } from '@/pages/Communication/models/manageAccount';
import { HomeOverviewModelState } from '@/pages/home/models/home';

export {
  GlobalModelState,
  LoginModelState,
  SettingModelState,
  ManagePolicyModelState,
  PermissionModelState,
  AccountModelState,
  RoleModelState,
  ManagePersonalModelState,
  ManageEnterpriseModelState,
  ContactModelState,
  ManageNoticeModelState,
  RecruitDataModelState,
  ResumeDataModelState,
  DataOverviewModelState,
  WorkCoordinateModelState,
  ManageDepartmentModelState,
  ManageAccountModelState,
  ManageProjectModelState,
  HomeOverviewModelState,
};

export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    golobal?: boolean;
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
  managePolicy: ManagePolicyModelState;
  permission: PermissionModelState;
  account: AccountModelState;
  role: RoleModelState;
  managePersonal: ManagePersonalModelState;
  manageEnterprise: ManageEnterpriseModelState;
  contact: ContactModelState;
  manageNotice: ManageNoticeModelState;
  resumeData: ResumeDataModelState;
  recruitData: RecruitDataModelState;
  dataOverview: DataOverviewModelState;
  workCoordinate: WorkCoordinateModelState;
  manageDepartment: ManageDepartmentModelState;
  manageAccount: ManageAccountModelState;
  manageProject: ManageProjectModelState;
}

export interface Route extends MenuDataItem {
  routes?: Route[];
}

export interface ConnectProps<T = {}> extends Partial<RouterTypes<Route, T>> {
  dispatch?: Dispatch<AnyAction>;
}

export default ConnectState;
