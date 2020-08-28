import { FilterItemProps } from '@/components/PageTable';

// 账号管理页面筛选项配置
export const UserFilterCfg: Array<FilterItemProps> = [
  {
    type: 'search',
    placeholder: '姓名或手机号',
    filter: 'searchKey',
    width: 300,
  },
];

// 账号状态列表
export const UserStatusList = [
  {
    value: 0,
    name: '禁用',
    color: '#F96056',
  },
  {
    value: 1,
    name: '启用',
    color: '#2FC37C',
  },
];
