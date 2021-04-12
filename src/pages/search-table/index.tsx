import React, { useEffect } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { connect } from 'dva'
// import PageTable from '@/components/PageTable';
// import IForm from '@/components/IForm/V4';
import { IForm, PageTable } from 'ii-admin-business'

import type { IPageTableProps } from 'ii-admin-business/dist/PageTable/interface'
// import DeclareExModal from './DeclareExModal';
import { Form, Modal, Spin, Drawer, Button } from 'antd'
// import moment from 'moment';
import { history } from 'umi'
// import searchOption from './config';
import styles from './index.less'
import './detail.less'
import './status.less'

const formItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
}
const getParams = (params: any, record: any) => {
  // 参数处理
  const data: any = {}
  Object.keys(params).forEach((key) => {
    const ele = params[key]
    if (typeof ele === 'object') {
      if (ele.type === 'array') {
        data[key] = [record[ele.key]]
      }
    } else {
      data[key] = record[ele] || ele
    }
  })
  return data
}
type ActionItem = {
  /** modal弹窗、detail详情页面、delete删除操作 */
  type: 'modal' | 'detail' | 'delete'
  /** 展示文案 */
  text?: string
  /** 删除提示文案 */
  warnText?: string
  /** 操作http请求名称 */
  service?: string
  /** 请求参数（还需处理） */
  params?: Record<string, unknown> | []
  /** type为detail时的值, self 当前页面，_blank 新页面 */
  target?: 'self' | '_blank'
  /** 跳转地址 */
  url?: string
  /** 获取详情的请求名称 */
  detailService?: string
  /** 获取详情的参数 */
  detailParams?: Record<string, unknown>
  /** 详情弹窗渲染方法 */
  // eslint-disable-next-line @typescript-eslint/ban-types
  renderDetail?: Function
  /** 详情弹窗宽度 */
  detailWidth?: number
}
type ModalInfo = {
  modalTitle: string
  layout?: any
  list: any[]
  tipText?: string
  okText?: string
  cancelText?: string
  service?: string
  width?: number
}
export interface TableProps extends IPageTableProps {
  modalInfo: ModalInfo
  createFormInfo: ModalInfo
  tableList: any[]
  filterOptions: Record<string, unknown>
  columns: any[]
  scroll: any
  modalVisible: boolean
  detailDom: React.ReactNode
  detailWidth: number
  detailModalVisible: boolean
  modalTheme: boolean
  drawerTheme: boolean
  deleteActionInfo: any
  pageTitle: string
  tableId: number
  createText: string
  createLink: string
  showCreate: boolean
  total: number
  spinLoading: boolean
  uploadLoading: boolean
  options: any[]
  pageSize: number
  defaultParams: Record<string, unknown>
  rangeDate: string
  getTableList: (params: any) => Promise<any>
  getItemInfo: (params: any) => Promise<any>
  updateState: (params: any) => Promise<any>
  handleTableAction: (params: any) => Promise<any>
  // 更新弹窗中字段
  location: any
  GLOBAL_OPTION: any
  typeText: string

  treeData: any[]
  /** PageTable 配置信息 */
  pageTableProps: any
}
export const SearchTable: React.FC<TableProps> = (props) => {
  const {
    tableList = [],
    // filterOptions,
    columns = [],
    scroll = true,
    detailWidth = 520,
    modalVisible,
    detailDom,
    detailModalVisible,
    modalInfo,
    createFormInfo,
    createLink,
    modalTheme = false,
    resetFresh = false,
    needRefresh = false,
    drawerTheme = true,
    pageTableProps,
    pageTitle,
    total,
    spinLoading,
    uploadLoading,
    getTableList,
    updateState,
    handleTableAction,
    deleteActionInfo,
    options = [],
    getItemInfo,
    GLOBAL_OPTION,
    location,
    treeData,
  } = props
  const [form] = Form.useForm()

  const handelDetail = (record: any, item: ActionItem) => {
    const { renderDetail, detailWidth: width = 880 } = item
    const detail = renderDetail && renderDetail(record)
    updateState({
      detailDom: detail,
      detailModalVisible: true,
      detailWidth: width,
    })
  }
  // 更新弹窗信息
  const openUpdateModal = (record: any, item: any, originRecord?: any) => {
    // 详情弹窗优先处理
    if (item.renderDetail) {
      handelDetail({ ...originRecord, ...record }, item)
      return
    }
    form.resetFields()
    const { params = {}, list } = item
    const formValue: any = getParams(params, record)
    const formList = list.map((itemList: any) => {
      const { optionGolbalName } = itemList
      if (optionGolbalName) {
        // eslint-disable-next-line no-param-reassign
        itemList.option = GLOBAL_OPTION[optionGolbalName] || []
      }
      return itemList
    })
    updateState({
      modalVisible: true,
      modalInfo: {
        ...item,
        list: formList,
      },
    })
    setTimeout(() => {
      form.setFieldsValue(formValue)
    }, 100)
  }

  /**
   *
   * @param item 参考ActionItem
   * @param record
   */
  const handelAction = (item: ActionItem, record: any) => {
    const { type, text, warnText, service, params, target, url, detailService, detailParams } = item
    if (type === 'delete') {
      Modal.confirm({
        title: text,
        content: warnText,
        onOk() {
          // 参数处理
          const data = getParams(params, record)
          handleTableAction({ service, data })
        },
        onCancel() {},
      })
      // 跳转新页面或者路由
    } else if (type === 'detail') {
      const data = getParams(params, record)
      const query = Object.keys(data)
        .map((key) => {
          return `${key}=${data[key]}`
        })
        .join('&')
      const path = `${url}?${query}`
      if (target === 'self') {
        history.push(path)
      } else {
        const { origin } = window.location
        window.open(`${origin}${path}`, target)
      }
    } else if (type === 'modal') {
      if (detailService) {
        const detailData = getParams(detailParams, record)
        getItemInfo({ service: detailService, data: detailData }).then((res) => {
          openUpdateModal(res, item, record)
        })
      } else {
        openUpdateModal(record, item)
      }
    }
  }
  // 新页面重新赋值 有handleConfig的 render
  useEffect(() => {
    columns.forEach((itemColumn: any) => {
      if (itemColumn.handleConfig) {
        // eslint-disable-next-line no-param-reassign
        itemColumn.render = (_: string, record: any) => {
          return (
            <div>
              {itemColumn.handleConfig.map((item: any) => {
                let auth = true
                if (item.authCheck) {
                  auth = item.authCheck(record)
                }
                return auth ? (
                  <span
                    className={styles['handle-item']}
                    style={item.style}
                    key={item.text || _}
                    onClick={() => {
                      handelAction(item, record)
                    }}
                  >
                    {item.text || _}
                  </span>
                ) : null
              })}
            </div>
          )
        }
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])
  // 轮询文档状态
  // useEffect(() => {
  //   setUnLoading(true);
  //   if (tableList.length > 0) {
  //     const status = getTableStatus(tableList);
  //     if (!status) {
  //       setUnLoading(false);
  //       const intervalId = setInterval(() => {
  //         getTableList({ type: true, ...filterOptions }).then((res: any) => {
  //           const state = getTableStatus(res);
  //           if (state) {
  //             updateState({ tableList: res });
  //             clearInterval(intervalId);
  //           }
  //         });
  //       }, 5000);
  //       return () => {
  //         clearInterval(intervalId);
  //       };
  //     } else {
  //       setUnLoading(true);
  //     }
  //   }
  // }, [location.pathname, tableList]);
  // const getTableStatus = (tableList: any[]) => {
  //   return tableList.every((item: any) => {
  //     if (
  //       (item.hasOwnProperty('status') && item.status !== 2) ||
  //       (item.hasOwnProperty('task_status') && item.task_status !== 2)
  //     ) {
  //       return true;
  //     }
  //   });
  // };

  /**
   * modalCancel 关闭弹窗
   */
  const modalCancel = () => {
    form.resetFields()
    updateState({
      modalVisible: false,
      detailModalVisible: false,
      detailDom: null,
    })
  }
  /**
   * 点击新建按钮回调
   */
  const createCallBack = () => {
    if (createLink) {
      history.push(createLink)
    } else {
      // updateState({ modalInfo: createFormInfo, modalVisible: true });
      openUpdateModal({}, createFormInfo)
    }
  }
  /**
   * 组织树点击事件回调
   * @param param0 key 当前组织名称
   */
  const onTreeSelect = (params: { key: string; value: string[] }) => {
    const { key } = params
    if (!key) {
      return
    }
    let pageTitleNew = key
    if (key === pageTableProps.treeExtra?.defaultExpandedKeys?.[0]) {
      pageTitleNew = ''
    }
    updateState({ pageTitle: pageTitleNew })
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const exportCallback = (values: any[]) => {
    // console.log(values, 'sdfsdfsfsfsdf')
  }
  /**
   * 批量删除按钮点击回调
   * @param values 要删除数据
   */
  const deleteCallback = (values: any[]) => {
    handelAction(deleteActionInfo, { id: values })
  }

  return (
    <Spin
      spinning={spinLoading || false}
      tip={spinLoading ? '加载中' : modalInfo && modalInfo.tipText}
    >
      <div>
        {((pageTableProps.showSearchTree && treeData.length > 0) ||
          !pageTableProps.showSearchTree) && (
          <PageTable
            total={total}
            tableList={tableList}
            columns={columns}
            scroll={scroll}
            filters={options}
            treeData={treeData}
            resetFresh={resetFresh}
            needRefresh={needRefresh}
            getTableList={getTableList}
            createCallback={createCallBack}
            exportCallback={exportCallback}
            deleteCallback={deleteCallback}
            onTreeSelect={onTreeSelect}
            {...pageTableProps}
            pageTitle={pageTitle || pageTableProps.pageTitle}
            // showCreate={showCreate}
            // createTitle={createFormInfo.modalTitle}
          />
        )}
        {drawerTheme && (
          <Drawer
            forceRender
            width={modalInfo.width || 530}
            visible={modalVisible}
            title={modalInfo.modalTitle}
            onClose={modalCancel}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={modalCancel} style={{ marginRight: 8 }}>
                  {modalInfo.cancelText || '取消'}
                </Button>
                <Button
                  loading={uploadLoading}
                  onClick={() => {
                    form
                      .validateFields()
                      .then((values) => {
                        // form.resetFields();
                        handleTableAction({
                          service: modalInfo.service,
                          data: values,
                        })
                      })
                      .catch(() => {})
                  }}
                  type="primary"
                >
                  {modalInfo.okText || '确定'}
                </Button>
              </div>
            }
          >
            <IForm
              form={form}
              formItemLayout={modalInfo.layout || formItemLayout}
              list={modalInfo.list || []}
            />
          </Drawer>
        )}
        {modalTheme && (
          <Modal
            forceRender
            visible={modalVisible}
            title={modalInfo.modalTitle}
            okText={modalInfo.okText || '确定'}
            cancelText={modalInfo.cancelText || '取消'}
            onCancel={modalCancel}
            onOk={() => {
              if (uploadLoading) {
                return
              }
              form
                .validateFields()
                .then((values) => {
                  // form.resetFields();
                  handleTableAction({
                    service: modalInfo.service,
                    data: values,
                  })
                })
                .catch(() => {})
            }}
          >
            <IForm
              form={form}
              formItemLayout={modalInfo.layout || formItemLayout}
              list={modalInfo.list || []}
            />
          </Modal>
        )}
        {/* 详情modal start */}
        <Modal
          destroyOnClose
          visible={detailModalVisible}
          footer={null}
          onCancel={modalCancel}
          width={detailWidth}
        >
          {detailDom}
        </Modal>
        {/* 详情modal end */}
      </div>
    </Spin>
  )
}

const mapStateToProps = ({
  mySearchTable,
  optionInfo,
  loading,
}: {
  mySearchTable: TableProps
  optionInfo: any
  loading: any
}) => {
  const spinLoading = loading.effects['mySearchTable/fetchList']
  const uploadLoading = loading.effects['mySearchTable/handleTableAction']
  return {
    ...mySearchTable,
    GLOBAL_OPTION: optionInfo,
    spinLoading,
    uploadLoading,
  }
}
const mapDispatchToProps = (dispatch: any) => {
  return {
    getTableList: (params: any) => dispatch({ type: 'mySearchTable/fetchList', payload: params }),
    getItemInfo: (params: any) =>
      dispatch({ type: 'mySearchTable/queryItemInfo', payload: params }),
    updateState: (params: any) => dispatch({ type: 'mySearchTable/updateState', payload: params }),
    handleTableAction: (params: any) =>
      dispatch({ type: 'mySearchTable/handleTableAction', payload: params }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTable)
