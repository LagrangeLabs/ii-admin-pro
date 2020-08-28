import { Request, Response } from 'express';
import Mock from 'mockjs';

const doLogin = (req: Request, res: Response) => {
  res.json({
    code: 0,
    data: {
      authorization: '1OubxFbxIz5udns88R5MxuwdeMraU60S',
      departmentId: 742664429372026,
      departmentName: '平安科',
      roleType: 0,
      userId: 742664429371658,
      username: 'xfk',
    },
    msg: 'success',
  });
};

const getPermissionRoutes = (req: Request, res: Response) => {
  res.json({
    code: 0,
    data: [
      {
        name: '配置管理',
        path: '/settings',
        routes: [
          {
            name: '部门管理',
            path: '/settings/department',
          },
          {
            name: '账户管理',
            path: '/settings/user',
          },
        ],
      },
    ],
    msg: 'success',
  });
};

export default {
  'POST /api_v1/oauth/login': doLogin,
  'GET /api_v1/oauth/permissions': getPermissionRoutes,
};
