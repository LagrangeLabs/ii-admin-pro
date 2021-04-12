// import MyIcon from '@/components/MyIcon';

// import { BADGE_STATUS, KNOWLEDGE_BADGE_STATUS } from '@/constants/badgeStatus';

// import { DOC_REVIEW_STATUS, RISK_LEVEL_OPTIONS } from './index.js';
// import { Badge } from 'antd';

// import { FILE_CHILD_TAG } from './IconTag.js';

// import offPng from '@/assets/img/off.png';
// import onPng from '@/assets/img/on.png';

// import { GENDER } from './index.js'

const options = [
  {
    key: '在线',
    value: 1,
  },
  {
    key: '已下线',
    value: 2,
  },
  {
    key: '全部',
    value: '',
  },
]
const STATUS_P_OBJ = {
  1: '在线',
  2: '已下线',
  class1: 'tag-sucess',
  class2: 'tag-fail',
}

export const FilterCfg = [
  {
    type: 'search',
    width: '20%',
    placeholder: '职位名称/招聘企业名称',
    filter: 'keyWord',
  },
  {
    type: 'cascader',
    placeholder: '职位类型',
    filter: ['positionType', 'parent'],
    width: '20%',
    options: [],
    optionGolbalName: 'GLOBAL_OPTION_POSITION_TYPE',
    optionUrl: '/recruit/sys/dict/type/list',
    transKey: { value: 'key', key: 'value', children: 'subList' },
    params: { dictType: 'POSITION_TYPE' },
  },
  {
    type: 'select',
    placeholder: '职位状态',
    filter: 'status',
    width: '20%',
    options,
  },
  {
    type: 'rangepicker',
    placeholder: '开始时间-结束时间',
    filter: ['startTime', 'endTime'],
    width: '30%',
  },
]

const renderDetail = () => {
  return <div className="detail-container">renderDetail</div>
}

export default {
  pageTableProps: {
    pageTitle: '职位数据',
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
  fetchUrl: '/recruit/position/search/park/page/{size}/{page}',
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
      title: '职位名称',
      dataIndex: 'positionName',
      width: '10%',
      ellipsis: true,
    },
    {
      title: '招聘企业',
      dataIndex: 'enterpriseName',
      width: '23%',
    },
    {
      title: '职位类型',
      dataIndex: 'positionTypeDesc',
      width: '15%',
    },
    {
      title: '招聘人数',
      dataIndex: 'hireCount',
      width: '8%',
    },
    {
      title: '更新时间',
      dataIndex: 'modifyTime',
      width: '15%',
    },
    {
      title: '状态',
      dataIndex: 'publishStatus',
      width: '12%',
      render: (status) => (
        <div className={STATUS_P_OBJ[`class${status}`]}>{STATUS_P_OBJ[status]}</div>
      ),
    },
    {
      title: '操作',
      width: '10%',
      handleConfig: [
        {
          text: '查看详情',
          type: 'modal',
          renderDetail,
          detailService: 'getPositionDetail',
          detailParams: { id: 'id' },
        },
      ],
    },
  ],
}
