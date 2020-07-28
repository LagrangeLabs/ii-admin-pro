import React, { useState } from 'react';

import classNames from 'classnames';
import styles from './index.less';

const DynamicInput = ({ title, children, cls, value }) => {
  const [top, setTop] = useState(16);

  const clsContainer = classNames(styles.container, cls);

  return (
    <div className={clsContainer} onFocus={() => setTop(-6)} onBlur={() => setTop(16)}>
      {children}
      <span className={styles.placeholder} style={{ top: `${value ? -6 : top}px` }}>
        {title}
      </span>
    </div>
  );
};

export default DynamicInput;
