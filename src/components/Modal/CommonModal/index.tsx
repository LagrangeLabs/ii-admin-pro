import React, { FC } from 'react';
import { Modal, Button } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import classNames from 'classnames/bind';

import styles from './index.less';

const cx = classNames.bind(styles);

interface ICommonModalProps extends ModalProps {
  /** 模态框标题 */
  title: React.ReactNode;
  /** 确定按钮文案 */
  btnOkText?: string;
  /** 加载状态 */
  loading?: boolean;
}

const CommonModal: FC<ICommonModalProps> = props => {
  const {
    title,
    children,
    onCancel,
    onOk,
    btnOkText = '确定',
    loading,
    className,
    ...restProps
  } = props;

  const modalCls = cx(styles.commonModal, className);

  return (
    <Modal
      title={<div style={{ textAlign: 'center' }}>{title}</div>}
      className={modalCls}
      onCancel={onCancel}
      onOk={onOk}
      footer={[
        <Button key="cancel" onClick={onCancel} className={styles.cancelBtn}>
          取消
        </Button>,
        <Button type="primary" key="create" onClick={onOk} className={styles.btn} loading={loading}>
          {btnOkText}
        </Button>,
      ]}
      {...restProps}
    >
      {children}
    </Modal>
  );
};

CommonModal.defaultProps = {
  btnOkText: '确定',
  loading: false,
};

export default CommonModal;
