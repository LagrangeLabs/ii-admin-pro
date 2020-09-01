/**
 * 部门管理页面接口
 */
import { stringify } from 'qs';
import request from '@/utils/request';

const CUR_PATH = '/department';

/**
 * 获取分页列表
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9484
 */
export async function fetchListAsync(params): Promise<any> {
  return request(`${CUR_PATH}?${stringify(params)}`);
}

/**
 * 获取部门下拉选项列表
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9492
 */
export async function fetchDepartmentListAsync(params): Promise<any> {
  return request(`${CUR_PATH}/all?${stringify(params)}`);
}

/**
 * 创建
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9481
 */
export async function createItemAsync(params): Promise<any> {
  return request(`${CUR_PATH}/users`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 更新
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9482
 */
export async function updateItemAsync({ id, ...restProps }): Promise<any> {
  return request(`${CUR_PATH}/${id}/users`, {
    method: 'PUT',
    data: restProps,
  });
}

/**
 * 删除
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9483
 */
export async function deleteItemAsync(id): Promise<any> {
  return request(`${CUR_PATH}/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 启用/禁用状态
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9480
 */
export async function updateItemStatusAsync(id): Promise<any> {
  return request(`/users/${id}`, {
    method: 'PATCH',
  });
}

/**
 * 重置密码
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9479
 */
export async function resetPasswordAsync(id): Promise<any> {
  return request(`/users/${id}/password`, {
    method: 'PUT',
  });
}
