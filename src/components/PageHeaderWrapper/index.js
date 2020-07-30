/**
 * 面包屑由 PageHeaderWrapper 实现
 */
import React from 'react';
import { Link } from 'umi';
import { connect } from 'dva';
import PageHeader from '@/components/PageHeader';
import GridContent from './GridContent';
import MenuContext from '@/layouts/MenuContext';

import styles from './index.less';

const PageHeaderWrapper = ({
  children,
  contentWidth,
  wrapperClassName,
  top,
  ...restProps
}) => (
  <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {value => (
        <PageHeader
          wide={contentWidth === 'Fixed'}
          home="主页"
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={item => item.name} // 面包屑名称
        />
      )}
    </MenuContext.Consumer>

    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);

export default connect(({ settings }) => ({
  contentWidth: settings.contentWidth,
}))(PageHeaderWrapper);
