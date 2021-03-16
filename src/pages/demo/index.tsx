import React, { Fragment, useEffect } from 'react'
import { connect, Dispatch, Link } from 'umi'
import type { ConnectState } from '@/models/connect'
import { Table, Tabs } from 'antd'
import type { PluginModelState } from '@/utils/pluginModel'
import type { IDemoRow } from './interface'
import PageHeader from '@/components/page-header'

interface IProps extends PluginModelState<IDemoRow> {
  getDemoList: () => void
}

const { TabPane } = Tabs

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
  const size = 'default'

  return (
    <Fragment>
      <PageHeader title="demo页面" />
      <Table columns={columns} dataSource={tableList} rowKey={(row: IDemoRow) => row.id} />

      <h3>Tabs组件</h3>
      <Tabs defaultActiveKey="1" size={size} style={{ marginBottom: 32 }}>
        <TabPane tab="Tab 1" key="1">
          Content of tab 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
      <Tabs defaultActiveKey="1" type="card" size={size}>
        <TabPane tab="Card Tab 1" key="1">
          Content of card tab 1
        </TabPane>
        <TabPane tab="Card Tab 2" key="2">
          Content of card tab 2
        </TabPane>
        <TabPane tab="Card Tab 3" key="3">
          Content of card tab 3
        </TabPane>
      </Tabs>
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
