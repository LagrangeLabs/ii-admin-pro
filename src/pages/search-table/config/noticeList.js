const options = [
  {
    key: '未发布',
    value: 0,
  },
  {
    key: '已发布',
    value: 1,
  },
  {
    key: '全部',
    value: '',
  },
]
const PUBLIST_OBJ = {
  0: '未发布',
  1: '已发布',
}

export const FilterCfg = [
  {
    type: 'search',
    width: '25%',
    placeholder: '请输入公告标题',
    filter: 'title',
  },
  {
    type: 'select',
    placeholder: '发布状态',
    filter: 'status',
    width: '25%',
    options,
  },
  {
    type: 'rangepicker',
    placeholder: '开始时间-结束时间',
    filter: ['startTime', 'endTime'],
    width: '30%',
  },
]

const renderDetail = (item) => {
  return (
    <div className="detail-container">
      <div className="detail-title text-center">{item.title}</div>
      <div className="detail-detail mt10 text-center">
        <span className="pr20">发布人：{item.modifyUserName}</span>
        <span className="pr20">发布时间：{item.modifyTime}</span>阅读数：
        {item.viewCount}
      </div>
      <div className="detail-content mt20" dangerouslySetInnerHTML={{ __html: item.detail }}></div>
    </div>
  )
}

export default {
  pageTableProps: {
    pageTitle: '通知公告管理',
    showSearchTree: false,
    // showSearch: false,
    // titleField: 'name',
    // keyField: 'name',
    // childrenField: 'subs',
    showCreate: true,
    createTitle: '新建通知公告',
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
  fetchUrl: '/recruit/notice/page/{size}/{page}',
  fetchMethod: 'post',
  detailWidth: 880,
  // createUrl: '/clue/list/page',
  // updateUrl: '/clue/:id/copy',
  createLink: '/recruit-manage/searchTable/noticeList/edit',
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
      title: '通知公告标题',
      dataIndex: 'title',
      width: '35%',
      ellipsis: true,
      handleConfig: [
        {
          type: 'modal',
          renderDetail,
        },
      ],
    },
    {
      title: '已查看',
      dataIndex: 'viewCount',
      width: '10%',
    },
    {
      title: '发布状态',
      dataIndex: 'status',
      width: '10%',
      render: (item) => PUBLIST_OBJ[item],
    },
    {
      title: '最后编辑人',
      dataIndex: 'modifyUserName',
      width: '10%',
    },
    {
      title: '最后编辑时间',
      dataIndex: 'modifyTime',
      width: '14%',
    },
    {
      title: '操作',
      width: '14%',
      handleConfig: [
        {
          text: '修改',
          type: 'detail',
          target: 'self',
          url: '/recruit-manage/searchTable/noticeList/edit',
          params: { id: 'id' },
        },
        {
          text: '删除',
          title: '删除信息',
          warnText: '确认要删除吗？',
          type: 'delete',
          service: 'noticeDelete',
          params: { idList: { type: 'array', key: 'id' } },
        },
        {
          text: '反馈意见',
          type: 'detail',
          target: 'self',
          url: '/recruit-manage/searchTable/noticeFeedbackList',
          params: { id: 'id' },
          authCheck: (item) => !!item.isFeedback,
        },
      ],
    },
  ],
}
