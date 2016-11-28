import React, {PropTypes} from "react";
import styles from "./RegisterForm.css";
import {Form, Input, Button} from "antd";
const FormItem = Form.Item;

const ProfileForm = ({
  confirmLoading,
  onSave,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14},
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 14,
      offset: 6,
    },
  };

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {...getFieldsValue()};
      onSave(data);
    });
  }

  return (
    <Form className={styles["form"]} onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label="手机号码"
        hasFeedback
      >
        {getFieldDecorator('mobilePhone')(
          <Input disabled />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="昵称"
        hasFeedback
      >
        {getFieldDecorator('nickname', {
          rules: [{required: true, message: '请输入昵称'}],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem {...tailFormItemLayout}>
        <Button type="primary" loading={confirmLoading} htmlType="submit">保存</Button>
      </FormItem>
    </Form>
  );
};

ProfileForm.propTypes = {
  confirmLoading: PropTypes.any,
  form: PropTypes.object.isRequired,
  onSave: PropTypes.func,
};

export default Form.create()(ProfileForm);
