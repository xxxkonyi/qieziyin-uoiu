import React, {PropTypes} from "react";
import styles from "./RegisterForm.css";
import {Form, Input, Button} from "antd";
const FormItem = Form.Item;

const RegisterForm = ({
  confirmLoading,
  onRegister,
  passwordDirty = false,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
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
      onRegister(data);
    });
  }

  function checkMobilePhone(rule, value, callback) {
    if (!/^[\d]{11}$/.test(value)) {
      callback('手机号码不合法');
    } else {
      callback();
    }
  }

  function handlePasswordBlur(e) {
    const value = e.target.value;
    passwordDirty = passwordDirty || !!value;
  }

  function checkPassword(rule, value, callback) {
    if (value && value !== getFieldValue('password')) {
      callback('您输入的两个密码不一致');
    } else {
      callback();
    }
  }

  function checkConfirm(rule, value, callback) {
    if (value && passwordDirty) {
      validateFields(['confirm'], {force: true});
    }
    callback();
  }

  return (
    <Form className={styles["form"]} onSubmit={handleSubmit}>
      <FormItem
        {...formItemLayout}
        label="手机号码"
        hasFeedback
      >
        {getFieldDecorator('mobilePhone', {
          rules: [{
            validator: checkMobilePhone
          }, {
            required: true, message: '请输入手机号码',
          }],
        })(
          <Input />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="密码"
        hasFeedback
      >
        {getFieldDecorator('password', {
          rules: [{
            required: true, message: '请输入密码',
          }, {
            validator: checkConfirm,
          }],
        })(
          <Input type="password" onBlur={handlePasswordBlur}/>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="确认密码"
        hasFeedback
      >
        {getFieldDecorator('confirm', {
          rules: [{
            required: true, message: '请输入密码',
          }, {
            validator: checkPassword,
          }],
        })(
          <Input type="password"/>
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
        <Button type="primary" loading={confirmLoading} htmlType="submit">注册</Button>
      </FormItem>
    </Form>
  );
};

RegisterForm.propTypes = {
  confirmLoading: PropTypes.any,
  form: PropTypes.object.isRequired,
  onRegister: PropTypes.func,
};

export default Form.create()(RegisterForm);
