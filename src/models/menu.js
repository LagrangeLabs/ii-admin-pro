import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { history } from 'umi';
import { getPageQuery } from '@/utils/utils';
import {
  convertRoutesToMenuData,
  filterMenuData,
  getBreadcrumbNameMapByRoutes,
  getMenuPath,
  flattenRoute,
} from '@/utils/menu';
import { fetchPermissionsAsync } from '@/services/login';

const memoizeOneFormatter = memoizeOne(convertRoutesToMenuData, isEqual);

const memoizeOneGetBreadcrumbNameMap = memoizeOne(
  getBreadcrumbNameMapByRoutes,
  isEqual,
);

export default {
  namespace: 'menu',
  state: {
    menuData: [],
    permissionMenuData: [], // 权限菜单数据
    permissionRoutes: [], // 展平后的权限菜单路由信息
    breadcrumbNameMap: {},
  },
  effects: {
    *getPermissions({ payload }, { call, put }) {
      const res = yield call(fetchPermissionsAsync, payload);

      const menus = res.data;

      const urlParams = new URL(window.location.href);
      const params = getPageQuery();
      let { redirect } = params;

      if (redirect) {
        const redirectUrlParams = new URL(redirect);
        if (redirectUrlParams.origin === urlParams.origin) {
          redirect = redirect.substr(urlParams.origin.length);
          if (redirect.match(/^\/.*#/)) {
            redirect = redirect.substr(redirect.indexOf('#') + 1);
          }
        } else {
          window.location.href = getMenuPath(menus[0]);
          return;
        }
      }

      history.replace(redirect || getMenuPath(menus[0]));

      yield put({
        type: 'setPermissionMenuData',
        payload: res.data,
      });
    },
    *getMenuData({ payload }, { put }) {
      const { routes, authority, permissionMenuData } = payload;

      const menuData = filterMenuData(memoizeOneFormatter(routes, authority));
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(routes);
      const permissionRoutes = flattenRoute(permissionMenuData);

      yield put({
        type: 'save',
        payload: {
          menuData,
          breadcrumbNameMap,
          permissionRoutes,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setPermissionMenuData(state, { payload }) {
      localStorage.setItem('menus', JSON.stringify(payload));

      return {
        ...state,
        permissionMenuData: payload,
      };
    },
  },
};
