import React, {PropTypes} from "react";
import {Modal, Form, Input, Radio, Icon} from "antd";
const FormItem = Form.Item;

const CreateModal = ({
  visible,
  confirmLoading,
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
    maskClosable: false,
    visible,
    confirmLoading,
    onOk: handleOk,
    onCancel,
  };

  return (
    <Modal {...modalOptions}>
      <Form vertical>
        <FormItem label="名称">
          {getFieldDecorator('name', {
            rules: [{required: true, message: '名称未填写'}],
          })(<Input />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('accessType')(
            <Radio.Group>
              <Radio value="public"><Icon type='unlock'/> 公开（所有人可查看）</Radio>
              <Radio value="private"><Icon type='lock'/> 私有（仅限自己可查看）</Radio>
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
  confirmLoading: PropTypes.any,
  form: PropTypes.object.isRequired,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default Form.create({
  mapPropsToFields(props) {
    return {
      name: {value: props.createItem.name},
      accessType: {value: props.createItem.accessType},
      description: {value: props.createItem.description},
    };
  },
})(CreateModal);
