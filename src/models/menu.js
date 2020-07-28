import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import { history } from 'umi';
import { getPageQuery } from '@/utils/utils';
import { fetchPermissionsAsync } from '@/services/login';

// 获取路由中的详情 路由信息
// 详情路由 有permissonPath字段，对应上级路由信息
function getDetailRouterInfo(routes, detailRouter = {}) {
  for (let index = 0; index < routes.length; index++) {
    const element = routes[index];
    const { permissonPath, routes: elementRoute } = element;
    if (elementRoute) {
      getDetailRouterInfo(elementRoute, detailRouter);
    } else if (permissonPath) {
      if (!detailRouter[permissonPath]) {
        detailRouter[permissonPath] = [];
      }
      detailRouter[permissonPath].push(element);
    }
  }
  return detailRouter;
}

// Conversion router to menu.
function formatter(data, parentAuthority, parentName) {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      let locale = 'menu';
      if (parentName) {
        locale = `${parentName}.${item.name}`;
      } else {
        locale = `menu.${item.name}`;
      }

      const result = {
        ...item,
        name: item.name,
        locale,
        authority: item.authority || parentAuthority,
      };
      if (item.routes) {
        const children = formatter(item.routes, item.authority, locale);
        // Reduce memory usage
        result.children = children;
      }
      delete result.routes;
      return result;
    })
    .filter(item => item);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (
    item.children &&
    !item.hideChildrenInMenu &&
    item.children.some(child => child.name)
  ) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => getSubMenu(item))
    .filter(item => item);
};
/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 */
const getBreadcrumbNameMap = menuData => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(
  getBreadcrumbNameMap,
  isEqual,
);

export default {
  namespace: 'menu',

  state: {
    menuData: [],
    permissionArray: [],
    permissionRoutes: [],
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
          window.location.href = menus[0].path;
          return;
        }
      }

      history.replace(redirect || menus[0].path);

      yield put({
        type: 'setPermissionRoutes',
        payload: res.data,
      });
    },
    *getMenuData({ payload }, { put }) {
      const { routes, authority, permissionMenuData } = payload;
      const menuData = filterMenuData(memoizeOneFormatter(routes, authority));
      const breadcrumbNameMap = memoizeOneGetBreadcrumbNameMap(menuData);
      const DETAIL_ROUTER = getDetailRouterInfo(routes);

      const permissionRoutes = [];
      permissionMenuData.map(item => {
        if (item.routes) {
          item.routes.map(subItem => {
            permissionRoutes.push(subItem.path);
          });
        }

        permissionRoutes.push(item.path);
      });

      console.log('permissionMenuData:', permissionMenuData);
      console.log('permissionRoutes:', permissionRoutes);

      // 针对详情页 未返回菜单的情况进行处理
      // Object.keys(DETAIL_ROUTER).forEach(item => {
      //   const element = DETAIL_ROUTER[item];
      //   // 权限 routers
      //   if (permissionRoutes.indexOf(item) !== -1) {
      //     element.forEach(detailInfo => {
      //       permissionRoutes.push(detailInfo.path);
      //     });
      //   }
      //   if (breadcrumbNameMap[item]) {
      //     element.forEach(detailInfo => {
      //       breadcrumbNameMap[detailInfo.path] = detailInfo;
      //     });
      //   }
      // });
      yield put({
        type: 'save',
        payload: {
          menuData,
          breadcrumbNameMap,
          permissionArray: permissionRoutes,
        },
      });
      // yield put({
      //   type: 'save',
      //   payload: { menuData },
      // });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
    setPermissionRoutes(state, { payload }) {
      localStorage.setItem('menus', JSON.stringify(payload));
      return {
        ...state,
        permissionRoutes: payload,
      };
    },
  },
};
