// import { PlusOutlined } from '@ant-design/icons';
// import { Link } from 'umi';

// import MyIcon from '@/components/MyIcon';

// // import { BADGE_STATUS, KNOWLEDGE_BADGE_STATUS } from '@/constants/badgeStatus';

// import { DOC_REVIEW_STATUS, RISK_LEVEL_OPTIONS } from './index.js';
// import { Badge } from 'antd';

// import { FILE_CHILD_TAG } from './IconTag.js';

import { GENDER_OPTION, GENDER } from './index.js'

export const FilterCfg = [
  {
    type: 'search',
    width: '18%',
    placeholder: '姓名/手机号',
    filter: 'keyWord',
  },
  {
    type: 'select',
    placeholder: '性别',
    filter: 'gender',
    width: '18%',
    options: GENDER_OPTION,
  },
  {
    type: 'select',
    placeholder: '学历',
    filter: 'education',
    width: '18%',
    options: [],
    optionGolbalName: 'GLOBAL_OPTION_EDUCATION_TYPE',
    optionUrl: '/recruit/sys/dict/type/list',
    transKey: { value: 'key', key: 'value' },
    params: { dictType: 'EDUCATION_REQUIREMENTS' },
  },
  {
    type: 'cascader',
    placeholder: '求职意向',
    filter: ['exception', 'parent'],
    width: '18%',
    options: [],
    optionGolbalName: 'GLOBAL_OPTION_POSITION_TYPE',
    optionUrl: '/recruit/sys/dict/type/list',
    transKey: { value: 'key', key: 'value', children: 'subList' },
    params: { dictType: 'POSITION_TYPE' },
  },
  {
    type: 'rangepicker',
    placeholder: '开始时间-结束时间',
    filter: ['startTime', 'endTime'],
    width: '18%',
  },
]

const renderDetail = () => {
  return <div className="detail-container">renderDetail</div>
}

export default {
  pageTableProps: {
    pageTitle: '简历数据',
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
  fetchUrl: '/recruit/resume/list/parkresume/{size}/{page}',
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
      title: '姓名',
      dataIndex: 'name',
      width: '9%',
    },
    {
      title: '手机号',
      dataIndex: 'phoneNum',
      width: '11%',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: '8%',
      render: (text) => GENDER[text],
    },
    {
      title: '学历',
      dataIndex: 'educationName',
      width: '9%',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: '8%',
    },
    {
      title: '求职期望',
      dataIndex: 'exceptPositions',
      width: '19%',
      render: (positions) => {
        return positions && positions.map((item) => item.positionTypeDesc).join(',')
      },
    },
    {
      title: '更新时间',
      dataIndex: 'modifyDate',
      width: '19%',
    },
    {
      title: '操作',
      width: '10%',
      handleConfig: [
        {
          text: '查看详情',
          type: 'modal',
          renderDetail,
        },
      ],
    },
  ],
}
