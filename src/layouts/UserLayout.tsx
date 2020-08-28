import React from 'react';
import { Helmet } from 'react-helmet';

const UserLayout = ({ children }) => {
  const title = '实在中后台统一模板';

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
