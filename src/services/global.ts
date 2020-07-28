import request from '@/utils/request';
import { stringify } from 'qs';

export interface INoticeListQueryParams {
  /** 已读标识：0未读，1已读 */
  isRead?: number;
  currentPage?: number;
  pageSize?: number;
}

export interface INoticeListItem {
  /** 消息id */
  id: number;
  tenantId: string;
  /** 项目ID */
  projectId: number;
  /** 消息内容 */
  message: string;
  /** 场景值: 1 场景1 2 场景2 3 场景3 4场景4 5 场景5 */
  type: number;
  gmtPoint: number;
  /** 已读标识: 0未读，1已读	*/
  hasRead: number;
  sendSms: number;
  status: number;
  gmtCreate: number;
  /** 项目名 */
  projectTitle: string;
}

export interface IUpdateNoticeParams {
  /** 项目ID */
  projectId: number;
  /** 消息ID */
  messageId: number;
}

/**
 * 上传图片
 */
export async function uploadImage(data): Promise<any> {
  return request(`/shield/admin/oss/upload`, {
    method: 'POST',
    data,
  });
}

/**
 * 获取全局消息
 *
 * 接口地址：http://yapi.ii-ai.tech/project/341/interface/api/8929
 */
export async function fetchNoticesAsync(params) {
  return request('/shield/admin/business/project/getIntegrateMessage', {
    method: 'POST',
    data: params,
  });
}

/**
 * 消息已读
 *
 * 接口地址：http://yapi.ii-ai.tech/project/341/interface/api/8930
 */
export async function updateNoticeAsync(params: IUpdateNoticeParams) {
  return request(`/shield/admin/business/project/readMessage?${stringify(params)}`);
}
