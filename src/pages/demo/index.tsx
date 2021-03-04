import React, { Fragment, useEffect } from 'react'
import { connect, Dispatch, Link } from 'umi'
import type { ConnectState } from '@/models/connect'
import { Table } from 'antd'
import type { PluginModelState } from '@/utils/pluginModel'
import type { IDemoRow } from './interface'
import PageHeader from '@/components/page-header'

interface IProps extends PluginModelState<IDemoRow> {
  getDemoList: () => void
}

const Demo = (props: IProps) => {
  const { tableList, getDemoList } = props

  useEffect(() => {
    getDemoList()
  }, [])

  const columns = [
    { title: '名称', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: '性别', dataIndex: 'gender' },
    { title: '操作', render: () => <Link to="">查看详情</Link> },
  ]

  return (
    <Fragment>
      <PageHeader title="demo页面" />
      <Table columns={columns} dataSource={tableList} rowKey={(row: IDemoRow) => row.id} />
    </Fragment>
  )
}

const mapStateToProps = (state: ConnectState) => {
  return state.demo
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getDemoList: () => {
      return dispatch({ type: `demo/queryTableList`, payload: {} })
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Demo)
