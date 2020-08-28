/**
 * 将路由配置展平成数组
 *
 * @param {array} data 路由配置
 */
export const flattenRoute = data => {
  let routes = [];

  data.forEach(routeItem => {
    if (routeItem.routes) {
      const childRoutes = flattenRoute(routeItem.routes);
      routes = [...routes, ...childRoutes];
    }
    routes.push(routeItem.path);
  });

  return routes;
};

/**
 * 将路由配置转成菜单栏数据
 *
 * @param {*} data
 * @param {*} parentAuthority
 */
export const convertRoutesToMenuData = (data, parentAuthority) => {
  return data
    .map(item => {
      if (!item.name || !item.path) {
        return null;
      }

      const result = {
        ...item,
        name: item.name,
        authority: item.authority || parentAuthority,
      };

      if (item.routes) {
        const children = convertRoutesToMenuData(item.routes, item.authority);
        // Reduce memory usage
        result.children = children;
      }

      delete result.routes;
      return result;
    })
    .filter(item => item);
};

/**
 * 获取子菜单选项或者菜单选项
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
      children: filterMenuData(item.children),
    };
  }

  return item;
};

/**
 * 过滤菜单栏数据
 *
 * + 过滤没有 name 的路由
 * + 过滤 hideInMenu 属性为 false 的路由
 */
export const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }

  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => getSubMenu(item))
    .filter(item => item);
};

/**
 * 通过菜单栏获取面包屑映射
 *
 * @param {Object} menuData 菜单配置数据
 */
export const getBreadcrumbNameMapByMenuData = menuData => {
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

/**
 * 通过路由配置获取面包屑映射
 *
 * @param {Object} routes 路由配置
 */
export const getBreadcrumbNameMapByRoutes = routes => {
  const routerMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.routes) {
        flattenMenuData(menuItem.routes);
      }
      // Reduce memory usage
      routerMap[menuItem.path] = menuItem;
    });
  };

  flattenMenuData(routes);

  return routerMap;
};

/**
 * 获取菜单选项下的第一子菜单路径
 *
 * @param {array} menuData
 */
export const getMenuPath = (menuData = []) => {
  if (menuData.routes && menuData.routes.length > 0) {
    return getMenuPath(menuData.routes[0]);
  }

  return menuData.path;
};

/**
 * 获取默认跳转的首页路径
 */
export const getHomePath = (key = 'menus') => {
  const menuCache = localStorage.getItem(key);

  if (menuCache) {
    const menuData = JSON.parse(menuCache) || [];

    console.log('menuDataPath:', getMenuPath(menuData[0]));
    return menuData.length > 0 ? getMenuPath(menuData[0]) : '/';
  }

  return '/';
};
