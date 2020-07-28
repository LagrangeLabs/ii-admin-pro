import React, { MouseEvent } from 'react';
import { ColumnProps } from 'antd/lib/table';
import { SelectProps } from 'antd/lib/select';

export type FilterType = 'search' | 'input' | 'select' | 'datepicker' | 'rangepicker' | 'cascader';

interface OptionProps {
  value: string | number;
  key: string;
}

interface CascaderDataProps {
  value?: string;
  label?: string;
  children?: Array<CascaderDataProps>;
}

export type FilterOptionProps = OptionProps | CascaderDataProps;

export interface FilterItemProps {
  /** 筛选项类型 */
  type?: FilterType;
  /** 占位符 */
  placeholder?: string;
  /** 筛选项字段：可以是字符、字符数组 */
  filter?: string | Array<string>;
  /** 筛选项字段最终要拼装的数据格式类型 */
  filterType?: 'string' | 'array';
  /** 日期格式化 */
  format?: Date;
  /** 选择项数组 */
  options?: Array<FilterOptionProps>;
  /** 宽度 */
  width?: number;
  /** selector 单选还是多选 */
  mode?: string;
  /** 类名 */
  className?: string;
  extraProps?: SelectProps;
}

/**
 * 筛选参数
 */
interface FilterParams {
  pageNum: number;
  pageSize: number;
}

export interface IPageTableProps<T> {
  /** 表单数据总数 */
  total?: number;
  /** 表单数据 */
  tableList?: Array<object>;
  /** 区分Key值 */
  uniqueKey?: string;
  /** 获取表单数据接口 */
  getTableList: (params: FilterParams) => void;
  /** 表单columns配置项 */
  columns: Array<ColumnProps<T>>;
  /** 表单页面标题 */
  pageTitle?: string;
  /** 表单筛选项 */
  filters?: Array<FilterItemProps>;
  /** 是否显示新增操作 */
  showCreate?: boolean;
  /** 新增按钮文字标题 */
  createTitle?: string;
  /** 默认搜索条件 */
  defaultCondtions?: T;
  /** 新增操作回调 */
  createCallback?: (event: MouseEvent<HTMLElement>) => void;
}
