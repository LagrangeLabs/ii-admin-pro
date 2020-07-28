import React, { Fragment } from 'react';
import { Layout } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0, background: '#F7FAFB' }}>
    <GlobalFooter
      copyright={
        <Fragment>
          Copyright
          {/* <Icon type="copyright" /> 2020 杭州实在智能科技有限公司 */}
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
