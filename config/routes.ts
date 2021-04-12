export default [
  {
    name: '登录',
    path: '/login',
    component: '@/pages/login',
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
            path: '/recruit-manage/searchTable/resumeList',
            name: '动态路由-search-table',
            icon: 'crown',
            component: '@/pages/search-table',
          },
          {
            path: '/recruit-manage/searchTable/channelList',
            name: '动态路由-channelList',
            icon: 'crown',
            component: '@/pages/search-table',
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
