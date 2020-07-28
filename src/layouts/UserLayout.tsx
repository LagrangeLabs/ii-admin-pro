import React from 'react';
import { Helmet } from 'react-helmet';

const UserLayout = ({ children }) => {
  const title = '统一后台模板系统';

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <div>{children}</div>
    </>
  );
};

export default UserLayout;
