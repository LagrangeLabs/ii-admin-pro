import React, { FC } from 'react';
import { Form, Input, message } from 'antd';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import { ModalProps } from 'antd/lib/modal';
import { FormProps } from 'antd/lib/form';
import CommonModal from '@/components/Modal/CommonModal';
import ConnectState from '@/models/connect';
import { IModifyPasswordParams, ISysUserAdmin } from '@/services/login';
import { IUserInfo } from '@/services/login';
import { validateLength } from '@/utils/validator';

const FormItem = Form.Item;

const { Password } = Input;

interface IModifyPasswordProps extends FormProps, ModalProps {
  status: boolean;
  userInfo: IUserInfo;
  onCancel: () => void;
  updatePassword: (params: IModifyPasswordParams) => Promise<any>;
}

const ModifyPassword: FC<IModifyPasswordProps> = props => {
  const [form] = Form.useForm();
  const { status, userInfo, updatePassword, onCancel } = props;

  const handleSumbit = () => {
    form
      .validateFields()
      .then(values => {
        const { newPassword, confirmPassword } = values;

        if (newPassword !== confirmPassword) {
          message.error('前后两次密码不一致，请仔细确认!');
          return;
        }

        const newData = { ...values, id: userInfo.userId };

        delete newData.confirmPassword;
        updatePassword(newData).then(() => {
          onCancel();
        });
      })
      .catch(err => {
        console.log('error:', err);
      });
  };

  return (
    <CommonModal
      width={396}
      visible={status}
      title="修改密码"
      onOk={handleSumbit}
      onCancel={onCancel}
    >
      <Form form={form}>
        <FormItem
          name="oldPassword"
          rules={[
            { required: true, message: '请输入密码' },
            { validator: validateLength('密码', 6) },
          ]}
        >
          <Password placeholder="请输入原始密码" maxLength={20} />
        </FormItem>
        <FormItem
          name="newPassword"
          rules={[
            { required: true, message: '请输入密码' },
            { validator: validateLength('密码', 6) },
          ]}
        >
          <Password placeholder="设置6至20位登录密码" maxLength={20} />
        </FormItem>
        <FormItem
          name="confirmPassword"
          rules={[
            { required: true, message: '请输入确认密码' },
            { validator: validateLength('密码', 6) },
          ]}
        >
          <Password placeholder="请再次输入登录密码" maxLength={20} />
        </FormItem>
      </Form>
    </CommonModal>
  );
};

const mapStateToProps = ({ login }: ConnectState) => {
  const { userInfo = {} } = login;

  return { userInfo };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  const namespace = 'login';

  return {
    updatePassword: (params: IModifyPasswordParams) =>
      dispatch({ type: `${namespace}/updatePassword`, payload: params }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModifyPassword);
