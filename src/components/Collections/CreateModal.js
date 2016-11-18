import React, {PropTypes} from "react";
import {Modal, Form, Input, Radio} from "antd";
const FormItem = Form.Item;

const CreateModal = ({
  visible,
  item = {},
  onOk,
  onCancel,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleOk() {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {...getFieldsValue()};
      onOk(data);
    });
  }

  const modalOptions = {
    title: '创建印集',
    visible,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOptions}>
      <Form vertical>
        <FormItem label="名称">
          {getFieldDecorator('name', {
            rules: [{required: true, message: '名称未填写'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('accessType', {
            initialValue: 'public',
          })(
            <Radio.Group>
              <Radio value="public">公开（所有人可查看）</Radio>
              <Radio value="private">私有（仅限自己可查看）</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="描述">
          {getFieldDecorator('description')(<Input type="textarea"/>)}
        </FormItem>
      </Form>
    </Modal>
  );
};

CreateModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create()(CreateModal);
