/* eslint-disable */
import { SelectProps } from 'antd/lib/select'

export type FilterType =
  | 'radioButton'
  | 'search'
  | 'input'
  | 'select'
  | 'datepicker'
  | 'rangepicker'
  | 'cascader'
  | 'inputNumber'

interface OptionProps {
  value: string | number
  key: string
}

interface CascaderDataProps {
  value?: string
  label?: string
  children?: Array<CascaderDataProps>
}

export type FilterOptionProps = OptionProps | CascaderDataProps

export interface FilterItemProps {
  /** 筛选项类型 */
  type?: FilterType
  /** 是否允许清除, 默认值为true */
  allowClear?: boolean
  /** 占位符 */
  placeholder?: string
  /** 筛选项字段：可以是字符、字符数组 */
  filter: string | Array<string>
  /** 筛选项字段最终要拼装的数据格式类型 */
  filterType?: 'string' | 'array'
  /** 日期格式化 */
  format?: Date
  /** 选择项数组 */
  options?: Array<FilterOptionProps>
  /** 宽度 */
  width?: number | string
  /** selector 单选还是多选 */
  mode?: 'multiple' | 'tags'
  /** 类名 */
  className?: string
  /** 额外配置条件 */
  extraProps?: SelectProps<any> | any
}
