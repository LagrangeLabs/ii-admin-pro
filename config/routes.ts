const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    icon: 'icon-quanxian2x',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/settings',
            name: '配置管理',
            icon: 'icon-peizhiguanli2x',
            routes: [
              {
                path: '/settings/department',
                name: '部门管理',
                component: './Settings/ManageDepartment',
              },
              {
                path: '/settings/account',
                name: '人员管理',
                component: './Settings/ManageAccount',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
];

export default routes;
