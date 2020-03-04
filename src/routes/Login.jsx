// 是否登录

import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { toLoginPage } from '@/utils';

class Login extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, isLogin } = this.props;

    const queryString = stringify({
      redirectUrl: window.location.href,
    });

    // 页面还在加载, 但是未登录
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }

    // 未登录, 跳到登录页
    if (!isLogin) {
      // return <Redirect to={`/login?${queryString}`}></Redirect>;
      return toLoginPage()
    }

    return children;
  }
}

export default connect(({ user, loading }) => ({
  isLogin: user.isLogin,
  loading: loading.models.user,
}))(Login);
