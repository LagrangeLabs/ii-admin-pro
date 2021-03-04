import React, { useState, useEffect, useRef } from 'react'
import { Table, Row, Col } from 'antd'
import type { TableProps, TablePaginationConfig } from 'antd/lib/table'
import type { TableCurrentDataSource, SorterResult } from 'antd/lib/table/interface'
import FilterOptions from '@/components/filter-options'
import type { IBarCol, IRequestParams, ISearchParams, ISorter, IPageParams } from './interface'
import ToolBar from './ToolBar'
import './index.less'

export interface IProTableProps<T> extends Omit<TableProps<T>, 'loading'> {
  /** 表格总条数 */
  total?: number
  /** 不触发didMount生命周期 */
  mounted?: boolean
  /** 发出请求回调 */
  onRequest?: (params: IRequestParams<T>) => void
  /** 工具条参数 多用于table右上角新增导出等按钮 */
  toolBar?: IBarCol
  /** search表单参数 */
  search?: ISearchParams
  /** 默认配置参数 */
  pageOptions?: IPage
  /** table是否加载状态 */
  loading?: boolean
}

const prefixCls = 'ii-table'

function ProTable<T extends Object = any>(props: IProTableProps<T>) {
  const {
    dataSource,
    columns,
    total = 0,
    onRequest,
    search,
    toolBar,
    rowKey,
    pageOptions,
    loading = false,
    ...reset
  } = props
  const { formItems = [], initialValues = {}, visible = true, renderPosition = 'right' } =
    search || {}

  const [requestParamsSnapshot, setRequestParamsSnapshot] = useState<IRequestParams<T>>({
    params: { ...pageOptions, ...initialValues },
    filters: {},
    extra: { action: 'normal', currentDataSource: [] },
    sorter: { field: '', order: '' },
  })

  const isMounted = useRef(props?.mounted)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      onRequest?.(requestParamsSnapshot)
    }
  }, [requestParamsSnapshot])

  /**
   * table变化需要触发请求
   * @param pagination
   * @param filters
   * @param sorter
   * @param extra
   */
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: SorterResult<T> | SorterResult<T>[],
    extra: TableCurrentDataSource<T>,
  ) => {
    const { current = 1, pageSize = 10 } = pagination
    const { field = '', order = '' } = sorter as ISorter

    const params: IPageParams = {
      current,
      size: pageSize,
    }

    const sorterParams: ISorter = {
      field,
      order,
    }

    const requestParams = { params, sorter: sorterParams, filters, extra }

    setRequestParamsSnapshot(requestParams)
  }

  const handleSearch = (values: object) => {
    setRequestParamsSnapshot({
      ...requestParamsSnapshot,
      params: {
        ...initialValues,
        ...requestParamsSnapshot.params,
        ...values,
        current: 1,
      },
    })
  }
  return (
    <div className={prefixCls}>
      <Row className={`${prefixCls}-oper__bar`}>
        <Col order={search?.order || 1} className="search-form">
          {renderPosition === 'left' && search?.render}
          {visible && (
            // TODO:目前使用这种方式生成表单并不好，待优化
            <FilterOptions
              filters={formItems}
              setFilterOpts={handleSearch}
              defaultCondtions={initialValues}
            />
          )}
          {renderPosition === 'right' && search?.render}
        </Col>
        <Col order={toolBar?.order || 2}>
          <ToolBar prefixCls={prefixCls}>{toolBar?.render}</ToolBar>
        </Col>
      </Row>
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 1200 }}
        rowKey={rowKey || 'id'}
        onChange={handleTableChange}
        size="middle"
        pagination={{
          total,
          showQuickJumper: true,
          showSizeChanger: true,
          current: pageOptions?.current || requestParamsSnapshot.params.current,
          showTotal: (totalNum: number) => `总共 ${totalNum} 条数据满足条件`,
        }}
        {...reset}
        loading={{ spinning: loading, delay: 300 }}
      />
    </div>
  )
}

export default ProTable
