// import { PlusOutlined } from '@ant-design/icons';
// import { Link } from 'umi';

// import MyIcon from '@/components/MyIcon'

// // import { BADGE_STATUS, KNOWLEDGE_BADGE_STATUS } from '@/constants/badgeStatus';

// import { DOC_REVIEW_STATUS, RISK_LEVEL_OPTIONS } from './index.js';
// import { Badge } from 'antd';

// import { FILE_CHILD_TAG } from './IconTag.js';

export const FilterCfg = [
  {
    type: 'search',
    width: '25%',
    placeholder: '企业名称/标题',
    filter: 'searchKey',
  },
  {
    type: 'rangepicker',
    placeholder: '开始时间-结束时间',
    filter: ['startTime', 'endTime'],
    width: '30%',
  },
]

const renderDetail = () => {
  return <div className="detail-container">renderdetial</div>
}

export default {
  pageTableProps: {
    pageTitle: '共享信息',
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
    extraParams: { type: 2 },
    // iconTag: FILE_CHILD_TAG,
    // treeNoCancel: true,
    // treeExtra: {
    //   defaultExpandedKeys: ['全部'],
    // },
  },
  // fetchTree: '/api/correct/category/',
  fetchUrl: '/recruit/share/page/{size}/{page}',
  fetchMethod: 'post',
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
      title: '标题',
      dataIndex: 'title',
      width: '23%',
      ellipsis: true,
    },
    {
      title: '企业',
      dataIndex: 'enterpriseName',
      width: '25%',
      ellipsis: true,
    },
    {
      title: '已查看',
      dataIndex: 'viewCount',
      width: '10%',
    },
    {
      title: '联系人',
      dataIndex: 'contactsName',
      width: '11%',
    },
    {
      title: '共享时间',
      dataIndex: 'modifyTime',
      width: '14%',
    },
    {
      title: '操作',
      width: '10%',
      handleConfig: [
        {
          text: '详情',
          type: 'modal',
          renderDetail,
        },
        {
          text: '删除',
          title: '删除信息',
          warnText: '确认要删除吗？',
          type: 'delete',
          service: 'shareDelete',
          params: { idList: { type: 'array', key: 'id' } },
        },
      ],
    },
  ],
}
