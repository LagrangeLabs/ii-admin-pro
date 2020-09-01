import request from '@/utils/request';

export interface ISysUserAdmin {
  id: number;
  /** 用户姓名 */
  name: string;
  /** 用户手机 */
  phone: string;
  /** 用户userCode */
  userCode: string;
  /** 用户状态 */
  status: number;
}

export interface ISysRoles {
  id: number;
  /** 角色名称 */
  roleName: string;
  tenantId: string;
}

export interface ISysOrganization {
  /** 组织名称 */
  name: string;
}

export interface IUserInfo {
  sysUserAdmin?: ISysUserAdmin;
  sysRoles?: ISysRoles;
  sysOrganization?: ISysOrganization;
  token?: string;
}

export interface LoginParamsType {
  userName: string;
  password: string;
}

export interface IModifyPasswordParams {
  /** 用户code */
  adminUserCode: string;
  /** 新密码 */
  password: string;
  /** 验证码 */
  smsCode: string;
}

/**
 * 登录
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9477
 *
 */
export async function fetchAccountLoginAsync(params: LoginParamsType) {
  return request('/oauth/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 查询菜单权限
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9490
 *
 */
export async function fetchPermissionsAsync(params: LoginParamsType) {
  return request('/oauth/permission');
}

/**
 * 更新密码
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9478
 */
export async function updatePasswordAsync({ id, ...restProps }) {
  return request(`/users/${id}`, {
    method: 'PUT',
    data: restProps,
  });
}
