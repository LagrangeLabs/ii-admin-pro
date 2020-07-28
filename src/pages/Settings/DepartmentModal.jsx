import React, { useEffect } from 'react';
import { Form, Input, Select, Radio } from 'antd';
import { IModal } from 'ii-admin-ui';
import { ModalStatus } from '@/constants/common';
import { validatePhone } from '@/utils/validator';

const FormItem = Form.Item;
const { Option } = Select;

const FormItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const DepartmentModal = props => {
  const [form] = Form.useForm();
  const {
    status,
    hideModal,
    createItem,
    updateItem,
    refreshList,
    selectedItem,
    loading,
  } = props;

  const updateInfo = () => {
    hideModal();
    refreshList && refreshList();
  };

  useEffect(() => {
    if (status === ModalStatus.Edit) {
      form.setFieldsValue(selectedItem);
    }

    if (status === ModalStatus.Create) {
      form.setFieldsValue({
        departmentName: '',
        departmentType: '',
        petitionManager: '',
        phone: '',
        username: '',
        roleType: '',
      });
    }
  }, [status]);

  const onFinish = () => {
    form
      .validateFields()
      .then(values => {
        if (status === ModalStatus.Create) {
          createItem(values)
            .then(updateInfo)
            .catch(err => {
              console.log('err:', err);
            });
        } else {
          updateItem({
            id: selectedItem.departmentId,
            userId: selectedItem.userId,
            ...values,
          })
            .then(updateInfo)
            .catch(err => {
              console.log('err:', err);
            });
        }
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <IModal
      visible={status === ModalStatus.Edit || status === ModalStatus.Create}
      title={status === ModalStatus.Create ? '新增部门' : '修改部门'}
      btnOkText={status === ModalStatus.Create ? '立即添加' : '保存'}
      onCancel={hideModal}
      onOk={onFinish}
      confirmLoading={loading}
    >
      <Form form={form} {...FormItemLayout} labelAlign="right">
        <FormItem
          label="部门名称"
          name="departmentName"
          rules={[{ required: true, message: '请输入部门名称' }]}
        >
          <Input placeholder="请输入部门名称" />
        </FormItem>
        <FormItem
          label="部门类型"
          name="departmentType"
          rules={[{ required: true, message: '请选择部门类型' }]}
        >
          <Select placeholder="请选择" allowClear>
            <Option value={0}>科室</Option>
            <Option value={1}>村社</Option>
          </Select>
        </FormItem>
        <FormItem
          label="项目负责人"
          name="petitionManager"
          rules={[{ required: true, message: '请输入项目负责人' }]}
        >
          <Input placeholder="请输入项目负责人" />
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
          label="部门账户"
          name="username"
          rules={[{ required: true, message: '请输入部门账户' }]}
        >
          <Input placeholder="请输入部门账户" />
        </FormItem>
        <FormItem
          label="关联角色"
          name="roleType"
          rules={[{ required: true, message: '请选择关联角色' }]}
        >
          <Radio.Group>
            <Radio value={0}>项目工作员</Radio>
            <Radio value={1}>项目办理员</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </IModal>
  );
};

export default DepartmentModal;
