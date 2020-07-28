import React from 'react';

import 'ii-admin-base/dist/index.css';

export const dva = {
  config: {
    onError: (e, dispatch) => {
      e.preventDefault(); // 进行异常统一处理，避免系统出错
      console.log('error:', e);
    },
  },
};
