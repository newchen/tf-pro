import React from 'react';
import { connect } from 'dva';
import Avatar from './User';
import styles from './proLayout.less';

const RightContent = props => {
  const { theme, layout } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={`${className} tf-header-right`}>
      <Avatar />
    </div>
  );
};

export default connect(({ settings }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(RightContent);
