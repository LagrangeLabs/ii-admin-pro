/**
 * 标签
 */
import { stringify } from 'qs';
import request from '@/utils/request';

const CUR_PATH = '/targets';

/**
 * 获取筛选项
 */
export async function fetchFilterOptsAsync(params) {
  return request(`${CUR_PATH}?${stringify(params)}`);
}
