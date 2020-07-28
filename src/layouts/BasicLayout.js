import React, { Suspense } from 'react';
import { Layout } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { history } from 'umi';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import logo from '../assets/img/logo.png';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import PageLoading from '@/components/PageLoading';
import Error from '@/pages/404';
import SiderMenu from '@/components/SiderMenu';
import styles from './BasicLayout.less';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import ModfiyPassword from './ModifyPassword';
import { getPageQuery } from '@/utils/utils';
import { stringify } from 'querystring';

const { Content } = Layout;

const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
    this.state = {
      modalStatus: false,
    };
  }

  componentDidMount() {
    const {
      route: { routes, authority },
      getSettings,
      getMenuData,
      permissionMenuData,
    } = this.props;

    getSettings();
    getMenuData({ routes, authority, permissionMenuData });
  }

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const { collapsed, isMobile } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  hideModal() {
    this.setState({ modalStatus: false });
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key =>
      pathToRegexp(key).test(pathname),
    );
    return breadcrumbNameMap[pathKey];
  };

  getPageTitle = (pathname, breadcrumbNameMap) => {
    const { title } = this.props;
    const currhistoryData = this.matchParamsPath(pathname, breadcrumbNameMap);

    console.log('currentHistoryData:', currhistoryData);
    console.log('title:', title);

    if (!currhistoryData) {
      return title;
    }

    return `${currhistoryData.name} - ${title}`;
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '200px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  filterCurrentMenu = (menuItem, filterRoutes) => {
    if (menuItem.children && menuItem.children.length > 0) {
      const nSubItems = menuItem.children.filter(subItem =>
        this.filterCurrentMenu(subItem, filterRoutes),
      );

      if (nSubItems.length === 0) {
        return false;
      } else {
        menuItem.children = nSubItems;
        return true;
      }
    } else {
      return filterRoutes.includes(menuItem.path);
    }
  };

  filterMenuData = () => {
    const { menuData = [], permissionMenuData = [] } = this.props;
    const permissionRoutes = [];
    console.log('this props:', this.props);

    permissionMenuData.map(item => {
      if (item.routes) {
        item.routes.map(subItem => {
          permissionRoutes.push(subItem.path);
        });
      }

      permissionRoutes.push(item.path);
    });

    const filterMenus = menuData.filter(item => {
      return this.filterCurrentMenu(item, permissionRoutes);
    });

    // return filterMenus;
    return menuData;
  };

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      children,
      location: { pathname },
      isMobile,
      breadcrumbNameMap,
      title,
      permissionArray,
      route: { routes },
      fixedHeader,
    } = this.props;

    const nMenus = this.filterMenuData();
    const { modalStatus } = this.state;
    // Find a route that matches the pathname.
    const currentRoute = permissionArray.find(item =>
      pathToRegexp(item).exec(pathname),
    );
    // Query whether you have permission to enter this page
    const hasPermission = currentRoute ? true : false;

    console.log('nMuenus:', nMenus);

    const isTop = PropsLayout === 'topmenu';
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    const layout = (
      <ConfigProvider locale={zhCN}>
        <Layout>
          {isTop && !isMobile ? null : (
            <SiderMenu
              logo={logo}
              theme={navTheme}
              onCollapse={this.handleMenuCollapse}
              isMobile={isMobile}
              title={title}
              {...this.props}
              menuData={nMenus}
            />
          )}
          <Layout
            style={{
              ...this.getLayoutStyle(),
              background: '#F7FAFB',
              minHeight: '100vh',
            }}
          >
            <Header
              menuData={nMenus}
              handleMenuCollapse={this.handleMenuCollapse}
              logo={logo}
              isMobile={isMobile}
              {...this.props}
              showPasswordModal={() => this.setState({ modalStatus: true })}
            />
            <Content className={styles.content} style={contentStyle}>
              {children}
              {/* {hasPermission ? children : <Error />} */}
            </Content>
            {/* <Footer /> */}
            <ModfiyPassword
              status={modalStatus}
              onCancel={() => this.hideModal()}
            />
          </Layout>
        </Layout>
      </ConfigProvider>
    );

    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ global, settings, menu, login }) => {
  return {
    collapsed: global.collapsed,
    layout: settings.layout,
    menuData: menu.menuData,
    permissionArray: menu.permissionArray,
    noticeList: global.notices,
    unRead: global.unRead,
    breadcrumbNameMap: menu.breadcrumbNameMap,
    userInfo: login.userInfo,
    permissionMenuData: menu.permissionRoutes,
    ...settings,
  };
};

const mapDisptachToProps = dispatch => {
  return {
    getNoticeList: params =>
      dispatch({ type: `global/queryNoticeList`, payload: params }),
    getSettings: () => dispatch({ type: 'setting/getSetting' }),
    getMenuData: params =>
      dispatch({ type: 'menu/getMenuData', payload: params }),
    updateNotice: params =>
      dispatch({ type: `global/updateNotice`, payload: params }),
    dispatch: dispatch,
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps,
)(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
