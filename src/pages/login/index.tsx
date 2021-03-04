import React from 'react'
import { Form, Input, Checkbox, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { connect, Dispatch } from 'umi'
import { StateType } from '@/pages/login/model'
import type { LoginParamsType } from './service'
import type { ConnectState } from '@/models/connect'
import styles from '@/pages/login/style.less'

interface LoginProps {
  dispatch: Dispatch
  userLogin: StateType
  submitting?: boolean
}

const FormItem = Form.Item

const Login: React.FC<LoginProps> = (props) => {
  const { dispatch, submitting } = props
  const [form] = Form.useForm()

  const handleSubmit = (values: LoginParamsType) => {
    form.validateFields().then(() => {
      dispatch({ type: 'login/login', payload: { ...values } })
    })
  }

  return (
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
            placeholder="请输入用户名:admin"
            prefix={<UserOutlined className={styles.prefixIcon} />}
          />
        </FormItem>
        <FormItem name="password" rules={[{ required: true, message: '请输入密码!' }]}>
          <Input.Password
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
    </div>
  )
}

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['login/login'],
}))(Login)
