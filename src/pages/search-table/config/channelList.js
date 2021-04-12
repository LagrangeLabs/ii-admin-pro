export const FilterCfg = [
  {
    type: 'search',
    width: '25%',
    placeholder: '渠道名称',
    filter: 'title',
  },
  {
    type: 'rangepicker',
    placeholder: '开始时间-结束时间',
    filter: ['startTime', 'endTime'],
    width: '30%',
  },
]

const renderShare = (item) => {
  return <div {...item}>redershare</div>
}

const renderDetail = () => {
  return <div className="detail-container">rederdetail</div>
}

export default {
  pageTableProps: {
    pageTitle: '渠道管理',
    showSearchTree: false,
    // showSearch: false,
    // titleField: 'name',
    // keyField: 'name',
    // childrenField: 'subs',
    showCreate: true,
    createTitle: '新增渠道',
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
  fetchUrl: '/recruit/channel/page/{size}/{page}',
  fetchMethod: 'post',
  // createUrl: '/clue/list/page',
  // updateUrl: '/clue/:id/copy',
  createLink: '/recruit-manage/searchTable/channelList/edit',
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
      title: '标题',
      dataIndex: 'title',
      width: '38%',
      ellipsis: true,
      handleConfig: [
        {
          type: 'modal',
          renderDetail,
          detailWidth: 880,
        },
      ],
    },
    {
      title: '简历数量',
      dataIndex: 'count',
      width: '8%',
    },
    {
      title: '联系人',
      dataIndex: 'contactUser',
      width: '8%',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: '9%',
    },
    {
      title: '新增时间',
      dataIndex: 'createTime',
      width: '18%',
    },
    {
      title: '操作',
      width: '12%',
      handleConfig: [
        {
          text: '修改',
          type: 'detail',
          target: 'self',
          url: '/recruit-manage/searchTable/channelList/edit',
          params: { id: 'channelId' },
        },
        {
          text: '删除',
          title: '删除信息',
          warnText: '确认要删除吗？',
          type: 'delete',
          service: 'channelDelete',
          params: { channelIds: { type: 'array', key: 'channelId' } },
        },
        {
          text: '分享',
          type: 'modal',
          renderDetail: renderShare,
          detailWidth: 403,
          detailService: 'getQRcode',
          detailParams: { shareId: 'channelId', shareType: 5 },
        },
      ],
    },
  ],
}
