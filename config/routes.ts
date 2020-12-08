﻿export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: '登录',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/demo',
          },
          {
            path: '/admin',
            name: '最高权限',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
          },
          {
            path: '/demo',
            name: '例子',
            icon: 'crown',
            component: '@/pages/demo',
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]
