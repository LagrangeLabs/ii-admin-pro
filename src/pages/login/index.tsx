import React, { useState } from 'react'
import { Form, Input, Checkbox, Button, Switch } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect, Dispatch } from 'umi'
import { StateType } from '@/pages/login/model'
import type { LoginParamsType } from './service'
import type { ConnectState } from '@/models/connect'
import styles from '@/pages/login/style.less'

import LoginPng from '@/assets/login.png'

interface LoginProps {
  dispatch: Dispatch
  userLogin: StateType
  submitting?: boolean
}

const LOGIN_TYPE = 'planA'
// const LOGIN_TYPE = ''

const FormItem = Form.Item

const Login: React.FC<LoginProps> = (props) => {
  const { dispatch, submitting } = props
  const [form] = Form.useForm()
  const [type, setType] = useState(LOGIN_TYPE)

  const handleSubmit = (values: LoginParamsType) => {
    form.validateFields().then(() => {
      dispatch({ type: 'login/login', payload: { ...values } })
    })
  }
  const changeType = (checked: boolean) => {
    setType(checked ? LOGIN_TYPE : '')
  }

  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.loginContainer} ${styles[type]}`}>
        <div className={styles.imgPart}>
          <img src={LoginPng} className={styles.loginImg} alt="login.png"></img>
        </div>
        <div className={styles.formPart}>
          <div className={styles.main}>
            <Form
              form={form}
              initialValues={{
                autoLogin: true,
              }}
              onFinish={async (values) => {
                handleSubmit(values)
              }}
            >
              <h5 className={styles.title}>ii-admin-pro</h5>
              <FormItem name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
                <Input
                  style={{ height: '44px', lineHeight: '44px' }}
                  placeholder="请输入用户名:admin"
                  prefix={<UserOutlined className={styles.prefixIcon} />}
                />
              </FormItem>
              <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
                <Input.Password
                  style={{ height: '44px', lineHeight: '44px' }}
                  placeholder="请输入密码:123456"
                  prefix={<LockOutlined className={styles.prefixIcon} />}
                />
              </FormItem>
              <FormItem>
                <Checkbox name="autoLogin">自动登录</Checkbox>
              </FormItem>
              <Form.Item>
                <Button type="primary" htmlType="submit" block loading={submitting}>
                  登录
                </Button>
              </Form.Item>
            </Form>
            <div className={styles.warnText}>登录遇到问题，请联系0571-12341234</div>
            <div className={styles.warnText}>
              两种登录样式，切换体验下~
              <Switch
                onChange={changeType}
                checkedChildren="样式A"
                unCheckedChildren="样式B"
                defaultChecked
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['login/login'],
}))(Login)
