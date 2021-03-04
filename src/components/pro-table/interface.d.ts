import { ReactNode, ReactText } from 'react'
import { FilterItemProps } from '@/components/filter-options/interface'

export interface ISearchParams {
  /** 表单配置项 */
  formItems: FilterItemProps[]
  /** 默认参数 */
  initialValues?: {
    [key: string]: any
  }
  /** 是否隐藏表单 */
  visible?: boolean
  /** 表单在顶部的排序 参照 antd Col组件 */
  order?: number
  /** 表单所占栅格 参照 antd Col组件 */
  span?: number
  /** 表单旁是否渲染额外元素 */
  render?: ReactNode
  /** 额外元素位置 */
  renderPosition?: 'left' | 'right'
}

export interface IPageParams {
  current?: number
  size?: number
  [propName: string]: any
}

export interface ISorter {
  field?: string
  order?: string
}

export interface IBarCol {
  order?: number
  span?: number
  render: ReactNode
}

export interface IRequestParams<T> {
  params: Partial<IPageParams>
  sorter: ISorter
  filters: {
    [string: string]: ReactText[] | null
  }
  extra: TableCurrentDataSource<T>
}
