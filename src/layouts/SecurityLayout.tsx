import React from 'react';
import { ConnectProps } from '@/models/connect';
import PageLoading from '@/components/PageLoading';
import { connect } from 'dva';
import { history, Redirect } from 'umi';
import moment from 'moment';
import { stringify } from 'querystring';
import 'ii-admin-ui/dist/index.css';
import { getMenuPath } from '@/utils/menu';

interface SecurityLayoutProps extends ConnectProps {
  loading: boolean;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<
  SecurityLayoutProps,
  SecurityLayoutState
> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentWillMount() {
    const { dispatch, authorization } = this.props;

    // 说明页面发生刷新操作
    if (!authorization) {
      const cacheUserInfo = localStorage.getItem('userInfo');
      const cacheRoutes = localStorage.getItem('menus');

      if (cacheUserInfo) {
        const userInfo = JSON.parse(cacheUserInfo) || {};
        const menus = JSON.parse(cacheRoutes) || [];

        dispatch({ type: 'login/setUserInfo', payload: userInfo });
        dispatch({ type: 'menu/setPermissionMenuData', payload: menus });

        if (window.location.pathname === '/') {
          if (menus.length === 0) {
            history.push('/user/login');
          } else {
            history.push(getMenuPath(menus[0]));
          }
        }
      } else {
        history.push('/user/login');
      }
    }
  }

  componentDidMount() {
    this.setState({ isReady: true });
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;

    const isLogin = currentUser && currentUser.token;
    const queryString = stringify({
      redirect: window.location.href,
    });

    console.log('loading:', loading);

    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading />;
    // }

    // if (!isLogin && window.location.pathname !== '/user/login') {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }

    return children;
  }
}

export default connect(({ login, loading, menu }) => ({
  currentUser: login.userInfo,
  loading: loading.models.login,
  permissionRoutes: menu.permissionRoutes,
  authorization: login.userInfo && login.userInfo.authorization,
}))(SecurityLayout);
