import React, { useEffect } from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { ModalStatus } from '@/constants/common';
import { IModal } from 'ii-admin-ui';
import { validatePhone } from '@/utils/validator';

const FormItem = Form.Item;
const { Option } = Select;

const FormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const AccountModal = props => {
  const [form] = Form.useForm();
  const {
    status,
    hideModal,
    createItem,
    updateItem,
    refreshList,
    selectedItem,
    filterOpts = [],
    loading,
  } = props;

  useEffect(() => {
    if (status === ModalStatus.Edit) {
      form.setFieldsValue(selectedItem);
    }

    if (status === ModalStatus.Create) {
      form.setFieldsValue({
        name: '',
        phone: '',
        departmentId: '',
        smsFlag: 1,
      });
    }
  }, [status]);

  const updateInfo = () => {
    hideModal();
    refreshList && refreshList();
  };

  const doConfirm = () => {
    form
      .validateFields()
      .then(values => {
        if (status === ModalStatus.Create) {
          createItem(values)
            .then(updateInfo)
            .catch(err => {
              console.log('error:', err);
            });
        } else {
          updateItem({
            id: selectedItem.id,
            ...values,
          })
            .then(updateInfo)
            .catch(err => {
              console.log('error:', err);
            });
        }
      })
      .catch(err => {
        console.error('err:', err);
      });
  };

  return (
    <IModal
      visible={status === ModalStatus.Edit || status === ModalStatus.Create}
      title={status === ModalStatus.Create ? '新增用户' : '修改用户'}
      btnOkText={status === ModalStatus.Create ? '立即添加' : '保存'}
      onCancel={hideModal}
      onOk={doConfirm}
      loading={loading}
    >
      <Form form={form} {...FormItemLayout} labelAlign="right">
        <FormItem
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input placeholder="请输入姓名" />
        </FormItem>
        <FormItem
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: '请输入手机号' },
            { validator: validatePhone },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </FormItem>
        <FormItem
          label="所属县级"
          name="departmentId"
          rules={[{ required: true, message: '请选择所属部门' }]}
        >
          <Select placeholder="请选择">
            {filterOpts.map(department => {
              return (
                <Option value={department.id} key={department.id}>
                  {department.name}
                </Option>
              );
            })}
          </Select>
        </FormItem>
        <FormItem label="短信通知" name="smsFlag" initialValue={1}>
          <Radio.Group>
            <Radio value={1}>启用</Radio>
            <Radio value={0}>禁用</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </IModal>
  );
};

export default AccountModal;
