import { Tooltip } from 'antd'

export const FilterCfg = [
  {
    type: 'search',
    width: '25%',
    placeholder: '反馈意见',
    filter: 'content',
  },
  {
    type: 'rangepicker',
    placeholder: '开始时间-结束时间',
    filter: ['startTime', 'endTime'],
    width: '30%',
  },
]

export default {
  pageTableProps: {
    pageTitle: '通知公告反馈',
    showSearchTree: false,
    // showSearch: false,
    // titleField: 'name',
    // keyField: 'name',
    // childrenField: 'subs',
    showCreate: false,
    // createTitle: '新建',
    // createIcon: <PlusOutlined />,
    // leftCreate: true,
    // searchTreeKey: 'template_type',
    needSelect: false,
    needPatchDelete: false,
    uniqueKey: 'id',
    // iconTag: FILE_CHILD_TAG,
    // treeNoCancel: true,
    // treeExtra: {
    //   defaultExpandedKeys: ['全部'],
    // },
  },
  // fetchTree: '/api/correct/category/',
  fetchUrl: '/recruit/noticefeedback/page/{size}/{page}',
  fetchMethod: 'post',
  idKey: 'noticeId',
  // createUrl: '/clue/list/page',
  // updateUrl: '/clue/:id/copy',
  // createLink: '/searchTable/publicBOList/new',
  // createFormInfo: createForm,
  /** 批量删除配置信息 */
  // deleteActionInfo,

  selectOptions: FilterCfg,

  drawerTheme: false,
  modalTheme: true,

  columns: [
    {
      title: '序号',
      dataIndex: 'serialNumber',
      width: '7%',
    },
    {
      title: '反馈意见',
      dataIndex: 'detail',
      width: '23%',
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <div>{text}</div>
        </Tooltip>
      ),
    },
    {
      title: '反馈企业',
      dataIndex: 'feedbackEnterpriseName',
      width: '10%',
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <div>{text}</div>
        </Tooltip>
      ),
    },
    {
      title: '通知公告标题',
      dataIndex: 'title',
      width: '20%',
      ellipsis: true,
      render: (text) => (
        <Tooltip title={text}>
          <div>{text}</div>
        </Tooltip>
      ),
    },
    {
      title: '反馈人',
      dataIndex: 'feedbackUserName',
      width: '10%',
    },
    {
      title: '反馈人手机号',
      dataIndex: 'feedbackUserPhone',
      width: '12%',
    },
    {
      title: '反馈时间',
      dataIndex: 'modifyTime',
      width: '18%',
    },
  ],
}
