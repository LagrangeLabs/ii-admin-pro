import React, { PureComponent } from 'react';
import { Menu } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import Notice from '../Notice';
import defaultImg from '@/assets/img/demoHeader.png';

import styles from './index.less';

export default class GlobalHeaderRight extends PureComponent {
  changeReadState = clickedItem => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeNoticeReadState',
      payload: id,
    });
  };

  render() {
    const {
      currentUser,
      onNoticeVisibleChange,
      onMenuClick,
      theme,
      unRead,
      noticeList,
      updateNotice,
      getNoticeList,
    } = this.props;

    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="password">修改密码</Menu.Item>
        <Menu.Item key="logout">退出登录</Menu.Item>
      </Menu>
    );

    let className = styles.right;
    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }

    const { username } = currentUser;

    return (
      <div className={className}>
        <Notice
          onPopupVisibleChange={onNoticeVisibleChange}
          onItemClick={item => this.changeReadState(item)}
          unRead={unRead}
          noticeList={noticeList}
          updateNotice={updateNotice}
          getNoticeList={getNoticeList}
        />
        <div className={styles.headerimgcon}>
          <img alt="" src={defaultImg} className={styles.headerimg}></img>
        </div>
        <HeaderDropdown overlay={menu}>
          <span className={`${styles.action} ${styles.account}`}>
            <span className={styles.name}>{username || '匿名'}</span>
          </span>
        </HeaderDropdown>
      </div>
    );
  }
}
