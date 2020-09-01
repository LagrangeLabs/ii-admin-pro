import { stringify } from 'qs';
import request from '@/utils/request';

const CUR_PATH = '/user';

/**
 * 获取列表
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9489
 */
export async function fetchListAsync(params): Promise<any> {
  return request(`${CUR_PATH}?${stringify(params)}`);
}

/**
 * 创建
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9485
 */
export async function createItemAsync(params): Promise<any> {
  return request(`${CUR_PATH}`, {
    method: 'POST',
    data: params,
  });
}

/**
 * 更新
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9486
 */
export async function updateItemAsync({ id, ...restProps }): Promise<any> {
  return request(`${CUR_PATH}/${id}`, {
    method: 'PUT',
    data: restProps,
  });
}

/**
 * 删除
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9487
 */
export async function deleteItemAsync(id): Promise<any> {
  return request(`${CUR_PATH}/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 启用/禁用短信状态
 *
 * 接口地址：http://yapi.ii-ai.tech/project/355/interface/api/9488
 */
export async function updateItemSmsStatusAsync(id): Promise<any> {
  return request(`${CUR_PATH}/${id}`, {
    method: 'PATCH',
  });
}
