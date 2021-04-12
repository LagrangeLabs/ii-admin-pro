/* eslint-disable react/react-in-jsx-scope */
// 公有线索池搜索页面配置
import { validatePhoneForm } from '@/utils/vailadate'

export const FilterCfg = [
  {
    type: 'select',
    placeholder: '信访件状态',
    filter: 'status',
    options: [
      {
        key: '全部',
        value: '',
      },
      {
        key: '待分派',
        value: '0',
      },
      {
        key: '办理中',
        value: '1',
      },
      {
        key: '待审核',
        value: '2',
      },
      {
        key: '已办结',
        value: '3',
      },
    ],
    width: '20%',
  },
  {
    type: 'select',
    placeholder: '剩余天数',
    filter: 'remainDays',
    width: '20%',
    options: [
      {
        key: '1天',
        value: 1,
      },
      {
        key: '2天',
        value: 2,
      },
      {
        key: '3天',
        value: 3,
      },
      {
        key: '4天',
        value: 4,
      },
      {
        key: '全部',
        value: '',
      },
    ],
  },
  {
    type: 'rangepicker',
    placeholder: '接收日期',
    filter: ['startTime', 'endTime'],
    width: '20%',
  },
  {
    type: 'search',
    width: '20%',
    placeholder: '受理编号/省网编号/信访内容关键字...',
    filter: 'searchKey',
  },
  {
    type: 'select',
    placeholder: '提出方式，可多选',
    mode: 'multiple',
    filter: 'proposeMode',
    options: [],
    optionGolbalName: 'GLOBAL_OPTION_CLUE_NAME',
    optionUrl: 'http://yapi.ii-ai.tech/mock/359/option/list',
    transKey: { value: 'value', label: 'key' },
    width: 'calc(40% + 16px)',
  },
]

const TABLEID = 'clueId'

const formList = [
  {
    type: 'input',
    label: '姓名',
    placeholder: '联系人姓名',
    name: 'test',
    hidden: true,
  },
  {
    type: 'input',
    label: '姓名',
    placeholder: '联系人姓名',
    name: 'clueName',
    rules: [{ required: true, message: '姓名不能为空' }],
  },
  {
    type: 'input',
    label: '手机号',
    placeholder: '请输入11位手机号',
    name: 'phone',
    rules: [
      { required: true, message: '手机号不能为空' },
      () => ({ validator: validatePhoneForm }),
    ],
  },
  {
    type: 'multiselect',
    label: '职位',
    placeholder: '职位名称',
    option: [],
    name: 'roleIds',
    optionGolbalName: 'optionGLOBAL',
    rules: [{ required: true, message: '职位名称不能为空' }],
  },
  {
    type: 'input',
    hidden: true,
    label: '',
    placeholder: '职位名称',
    name: 'updateUserCode',
  },
]

const createForm = {
  modalTitle: '创建',
  list: formList,
  service: 'createService',
  tipText: '创建中',
}
export default {
  pageTitle: 'test',
  tableId: TABLEID,
  // createLink: '/searchTable/publicBOList/new',
  fetchUrl: 'http://yapi.ii-ai.tech/mock/359/table',
  // createUrl: '/clue/list/page',
  // updateUrl: '/clue/:id/copy',
  createFormInfo: createForm,

  selectOptions: FilterCfg,
  columns: [
    {
      title: 'ID',
      dataIndex: 'clueId',
      width: '5%',
    },
    {
      title: '线索类型',
      dataIndex: 'clueName',
      width: '10%',
    },
    {
      title: '客户名称',
      dataIndex: 'userName',
      width: '10%',
    },
    {
      title: '线索来源',
      dataIndex: 'clueTypeString',
      width: '10%',
    },
    {
      title: '对应律所',
      dataIndex: 'lawFirmName',
      width: '10%',
    },
    {
      title: '分配状态',
      dataIndex: 'assignTag',
      width: '12%',
    },
    {
      title: '线索状态',
      dataIndex: 'clueTag',
      width: '10%',
    },
    {
      title: '生成时间',
      dataIndex: 'createTime',
      width: '9%',
    },
    {
      title: '修改时间',
      dataIndex: 'modifyTime',
      width: '9%',
    },
    {
      title: '操作',
      key: 'edit',
      width: '15%',
      handleConfig: [
        {
          text: '编辑',
          type: 'modal',
          list: formList,
          modalTitle: '编辑',
          service: 'edit',
          params: { clueName: 'clueName' },
          detailService: 'getItem',
          detailParams: {},
        },
        {
          text: '跳转编辑',
          type: 'detail',
          target: 'self',
          url: '/test',
          params: { id: 'id' },
        },
        {
          text: '查看详情',
          type: 'detail',
          target: '_blank',
          url: '/test',
          params: ['id'],
        },
        {
          text: '删除',
          title: '删除信息',
          warnText: '确认要删除吗？',
          type: 'delete',
          service: 'delete',
          params: { id: 'id' },
        },
      ],
    },
  ],
}
