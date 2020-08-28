import { Request, Response } from 'express';
import Mock from 'mockjs';

const getUserList = (req: Request, res: Response) => {
  res.json({
    code: 0,
    data: Mock.mock({
      current: 1,
      pages: 7,
      'records|10': [
        {
          id: '@id',
          name: '@name',
          county: '@county',
          departmentId: 741262546174586,
          phone: /^1[0-9]{10}$/,
          'smsFlag|0-1': 0,
        },
      ],
      size: 10,
      total: 64,
    }),
    msg: 'success',
  });
};

const enableUser = (req: Request, res: Response) => {
  res.json({
    code: 0,
    msg: 'success',
  });
};

export default {
  'GET /api_v1/smsUsers': getUserList,
  'PATCH /api_v1/users': enableUser,
};
