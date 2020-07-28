import { Button, Result } from 'antd';
import React from 'react';
import { history } from 'umi';
import { getHomePath } from '@/utils/utils';

const NoFoundPage: React.FC<{}> = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry，你访问的页面当前不存在。"
    extra={
      <Button type="primary" onClick={() => history.push(getHomePath())}>
        返回首页
      </Button>
    }
  />
);

export default NoFoundPage;
