import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import HeaderDropdown from '../HeaderDropdown';
import { Empty, Badge } from 'antd';
import MyIcon from '@/components/MyIcon';
import classNames from 'classnames/bind';
import styles from './index.less';
import { history } from 'umi';
import moment from 'moment';

const cx = classNames.bind(styles);

export default class Notice extends PureComponent {
  state = {
    visible: false,
  };

  renderNoticeItem = item => {
    const { projectTitle, message, gmtCreate } = item;

    return (
      <div
        className={styles.noticeItem}
        onClick={() => this.viewItemOpera(item)}
        key={item.id}
      >
        <div className={styles.title}>{projectTitle}</div>
        <div className={styles.content}>{message}</div>
        <div className={styles.time}>
          {gmtCreate && moment(gmtCreate).format('YYYY/MM/DD HH:mm')}
        </div>
      </div>
    );
  };

  viewItemOpera = item => {
    const { onItemClick, updateNotice, getNoticeList } = this.props;
    this.handleVisibleChange(false);
    updateNotice({
      messageId: item.id,
      projectId: item.projectId,
    }).then(res => {
      getNoticeList({ isRead: 0 });
    });
    if (item.type === 3) {
      history.push(
        `/intelligent-investment/coordinate/detail?type=detail&&projectId=${item.projectId}`,
      );
    } else {
      history.push(
        `/intelligent-investment/project/detail?id=${item.projectId}`,
      );
    }
  };

  viewAllMessage = () => {
    history.push('/message-center');
  };

  getNotificationBox() {
    const { noticeList = [] } = this.props;

    const nNotice = noticeList.length > 3 ? noticeList.slice(0, 3) : noticeList;

    return (
      <div className={styles.noticeList}>
        <div className={styles.noticeTitle}>消息通知</div>
        {nNotice.length > 0 ? (
          nNotice.map(item => this.renderNoticeItem(item))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
        <div className={styles.viewMore} onClick={this.viewAllMessage}>
          查看全部消息 >
        </div>
      </div>
    );
  }

  handleVisibleChange = visible => {
    const { onPopupVisibleChange } = this.props;

    this.setState({ visible });
    onPopupVisibleChange(visible);
  };

  render() {
    const { className, popupVisible, unRead = 0 } = this.props;
    const { visible } = this.state;
    const noticeButtonClass = classNames(className, styles.noticeButton);
    const notificationBox = this.getNotificationBox();

    const trigger = (
      <span className={classNames(noticeButtonClass, { opened: visible })}>
        <Badge
          count={unRead}
          style={{ boxShadow: 'none' }}
          className={styles.badge}
        >
          {/* <Icon type="bell" className={styles.icon} /> */}
          <MyIcon type="iconxiaoxi" className={styles.icon}></MyIcon>
        </Badge>
      </span>
    );

    const popoverProps = {};
    if ('popupVisible' in this.props) {
      popoverProps.visible = popupVisible;
    }

    return (
      <HeaderDropdown
        placement="bottomRight"
        overlay={notificationBox}
        overlayClassName={styles.popover}
        trigger={['click']}
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        {...popoverProps}
        ref={node => (this.popover = ReactDOM.findDOMNode(node))}
      >
        {trigger}
      </HeaderDropdown>
    );
  }
}
