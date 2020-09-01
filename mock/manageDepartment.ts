import { Request, Response } from 'express';
import Mock from 'mockjs';

const getDepartmentUserList = (req: Request, res: Response) => {
  res.json({
    code: 0,
    msg: 'success',
    data: Mock.mock({
      current: 1,
      orders: [],
      pages: 5,
      searchCount: true,
      size: 10,
      total: 42,
      'records|10': [
        {
          departmentId: 742664429372026,
          departmentName: '科室',
          departmentType: 0,
          petitionManager: '@name',
          phone: /1[0-9]{10}/,
          'status|0-1': 0,
          userId: '@id',
          username: 'xfk',
        },
      ],
    }),
  });
};

const getAllDepartments = (req: Request, res: Response) => {
  res.json({
    code: 0,
    data: [
      {
        id: 742664429372026,
        name: '平安科',
        type: 0,
      },
      {
        id: 741256418296442,
        name: '党政综合办公室',
        type: 0,
      },
      {
        id: 741257986966142,
        name: '党建工作办公室',
        type: 0,
      },
      {
        id: 741258993599102,
        name: '综合信息指挥室',
        type: 0,
      },
      {
        id: 741259119428222,
        name: '公共服务办公室',
        type: 0,
      },

      {
        id: 741259551441530,
        name: '区域发展办公室',
        type: 0,
      },
      {
        id: 741259744379514,
        name: '城建管理办公室',
        type: 0,
      },
      {
        id: 741259874402938,
        name: '财政审计办公室',
        type: 0,
      },

      {
        id: 741260025397626,
        name: '公共服务中心',
        type: 0,
      },
      {
        id: 741260407079546,
        name: '区域发展与治理中心',
        type: 0,
      },

      {
        id: 741261170442874,
        name: '垃圾分类办',
        type: 0,
      },
      {
        id: 741261304660346,
        name: '总工会',
        type: 0,
      },
      {
        id: 741261489209722,
        name: '团工委',
        type: 0,
      },
      {
        id: 741261623427450,
        name: '妇联',
        type: 0,
      },
      {
        id: 741291688198778,
        name: '司法所',
        type: 0,
      },
    ],
    msg: 'success',
  });
};

export default {
  'GET /api_v1/department': getDepartmentUserList,
  'GET /api_v1/department/all': getAllDepartments,
};
