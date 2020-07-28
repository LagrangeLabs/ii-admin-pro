import { FilterItemProps } from '@/components/PageTable';

// 部门管理页面筛选项配置
export const DepartmentFilterCfg: Array<FilterItemProps> = [
  {
    type: 'search',
    placeholder: '部门名称',
    filter: 'searchKey',
    width: 300,
  },
  {
    type: 'select',
    placeholder: '部门类型',
    filter: 'departmentType',
    width: 200,
    options: [
      {
        key: '科室',
        value: 0,
      },
      {
        key: '村社',
        value: 1,
      },
    ],
  },
  {
    type: 'select',
    placeholder: '状态',
    filter: 'status',
    width: 200,
    options: [
      {
        key: '禁用',
        value: 0,
      },
      {
        key: '启用',
        value: 1,
      },
    ],
  },
];

// 部门状态列表
export const DepartmentStatusList = [
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
