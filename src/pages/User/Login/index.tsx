import { Alert, Checkbox, Input, Button, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { saveDataInLocalStorage, getDataFromLocalStorage } from '@/utils/cache';
import { notification } from 'antd';

import loginBg from '@/assets/img/login.png';
import logoImg from '@/assets/img/logo.png';

import styles from './index.less';
import DynamicInput from './components/DynamicInput/';

const { Password } = Input;

interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting?: boolean;
}

const Login: React.FC<LoginProps> = props => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isNeedRemember, setIsNeedRemember] = useState(false);
  const [passwordTop, setPasswordTop] = useState(16);

  const handleSubmit = async () => {
    const { dispatch, doLogin, getPermissions } = props;

    if (!account) {
      notification.error({
        message: `账号不能为空`,
      });
      return;
    }

    if (!password) {
      notification.error({
        message: `密码不能为空`,
      });
      return;
    }

    doLogin({ username: account, password })
      .then(() => {
        // 检查是否需记住账号
        if (isNeedRemember) {
          saveDataInLocalStorage({
            key: 'accountInfo',
            value: JSON.stringify({ account, password }),
          });
        }

        getPermissions();
      })
      .catch(err => {
        console.log('err:', err);
      });
  };

  // 从缓存中读取记住账号的配置
  useEffect(() => {
    const needRemember = getDataFromLocalStorage('needRemember');

    if (needRemember !== null) {
      if (needRemember === 'true') {
        setAccountFromCache();
      }
      setIsNeedRemember(needRemember === 'true');
    }
  }, []);

  // 从缓存中读取账号，并完成相关设置
  const setAccountFromCache = () => {
    const accountInfo = getDataFromLocalStorage('accountInfo');

    if (accountInfo) {
      const { account, password } = JSON.parse(accountInfo);

      setAccount(account);
      setPassword(password);
    }
  };

  // 缓存记住账号的配置
  const doRememberAccount = data => {
    saveDataInLocalStorage({ key: 'needRemember', value: data });
    setIsNeedRemember(data);
  };

  return (
    <div className={styles.login}>
      <Row>
        <Col span={12}>
          <div className={styles.loginHead}>
            <img src={logoImg} className={styles.logo} />
            <div>
              <div className={styles.title}>统一后台模板系统</div>
            </div>
          </div>
          <img src={loginBg} className={styles.img} />
        </Col>
        <Col span={12} className={styles.loginContainer}>
          <div className={styles.loginWrapper}>
            <div className={styles.title}>登录</div>
            <DynamicInput title="账号" cls={styles.formItem} value={account}>
              <Input
                className={styles.account}
                value={account}
                onChange={e => setAccount(e.target.value)}
              />
            </DynamicInput>

            <DynamicInput title="密码" cls={styles.formItem} value={password}>
              <Password
                className={styles.password}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </DynamicInput>

            <div className={styles.remember}>
              <Checkbox
                checked={isNeedRemember}
                onChange={e => doRememberAccount(e.target.checked)}
              >
                记住密码
              </Checkbox>
            </div>

            <Button
              className={styles.loginBtn}
              type="primary"
              onClick={handleSubmit}
            >
              登录
            </Button>
            <div className={styles.loginTips}>
              登录遇到问题，请联系0571-12341234
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  const namespace = 'login';

  return {
    doLogin: params =>
      dispatch({ type: `${namespace}/login`, payload: params }),
    getPermissions: params =>
      dispatch({ type: `menu/getPermissions`, payload: params }),
  };
};

export default connect(
  ({ login }: ConnectState) => ({
    userLogin: login,
  }),
  mapDispatchToProps,
)(Login);
