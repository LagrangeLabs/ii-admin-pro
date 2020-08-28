import { stringify } from 'qs';
import request from '@/utils/request';

export interface IUserListItem {
  id: number;
  /** 姓名 */
  name: string;
  /** 县城名 */
  county: string;
  /** 手机号 */
  phone: number;
  /** 是否开启短信通知 */
  smsFlag: number;
}

/**
 * 获取账号列表
 *
 * 接口地址：http://yapi.ii-ai.tech/project/341/interface/api/8607
 */
export async function fetchAccountListAsync(params): Promise<any> {
  return request(`/user/admin/user/admin/vo/page?${stringify(params)}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 创建账号
 *
 * 接口地址：http://yapi.ii-ai.tech/project/341/interface/api/8603
 */
export async function createAccountAsync(params): Promise<any> {
  return request('/user/admin/user/admin/create', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

/**
 * 获取账号相关信息
 *
 * 接口地址：http://yapi.ii-ai.tech/project/256/interface/api/5612
 */
export async function fetchAccountInfoAsync(id: number): Promise<any> {
  return request(`/user/admin/user/admin/vo/code/${id}`);
}

/**
 * 更新账号
 *
 * 接口地址：http://yapi.ii-ai.tech/project/341/interface/api/8606
 */
export async function updateAccountAsync(data): Promise<any> {
  return request(`/user/admin/user/admin/update`, {
    method: 'POST',
    data,
  });
}
