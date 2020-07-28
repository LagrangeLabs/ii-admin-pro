import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import Animate from 'rc-animate';
import { connect } from 'dva';
import { history } from 'umi';
import GlobalHeader from '@/components/GlobalHeader';
import styles from './Header.less';

const { Header } = Layout;

class HeaderView extends PureComponent {
  state = {
    visible: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (!props.autoHideHeader && !state.visible) {
      return {
        visible: true,
      };
    }
    return null;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handScroll, { passive: true });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handScroll);
  }

  getHeadWidth = () => {
    const { isMobile, collapsed, settings } = this.props;
    const { fixedHeader, layout } = settings;
    if (isMobile || !fixedHeader || layout === 'topmenu') {
      return '100%';
    }
    return collapsed ? 'calc(100% - 80px)' : 'calc(100% - 200px)';
  };

  handleMenuClick = ({ key }) => {
    const { showPasswordModal } = this.props;

    if (key === 'logout') {
      window.localStorage.setItem('userInfo', '');
      history.push('/user/login');
    }

    if (key === 'password') {
      showPasswordModal();
    }
  };

  handScroll = () => {
    const { autoHideHeader } = this.props;
    const { visible } = this.state;
    if (!autoHideHeader) {
      return;
    }
    const scrollTop =
      document.body.scrollTop + document.documentElement.scrollTop;
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => {
        if (this.oldScrollTop > scrollTop) {
          this.setState({
            visible: true,
          });
        } else if (scrollTop > 300 && visible) {
          this.setState({
            visible: false,
          });
        } else if (scrollTop < 300 && !visible) {
          this.setState({
            visible: true,
          });
        }
        this.oldScrollTop = scrollTop;
        this.ticking = false;
      });
    }
  };

  render() {
    const { handleMenuCollapse, settings } = this.props;
    const { fixedHeader } = settings;
    const { visible } = this.state;
    const width = this.getHeadWidth();

    const HeaderDom = visible ? (
      <Header
        style={{ padding: 0, width }}
        className={fixedHeader ? styles.fixedHeader : ''}
      >
        <GlobalHeader
          onCollapse={handleMenuCollapse}
          onMenuClick={this.handleMenuClick}
          {...this.props}
        />
      </Header>
    ) : null;

    return (
      <Animate component="" transitionName="fade">
        {HeaderDom}
      </Animate>
    );
  }
}

export default connect(({ login, global, settings }) => ({
  collapsed: global.collapsed,
  currentUser: login.userInfo,
  settings,
}))(HeaderView);
