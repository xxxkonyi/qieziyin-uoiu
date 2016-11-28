import React, {PropTypes} from "react";
import styles from "./LoginForm.css";
import {Form, Input, Icon, Button} from "antd";
import {Link} from "dva/router";
const FormItem = Form.Item;

const LoginForm = ({
  confirmLoading,
  onLogin,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {...getFieldsValue()};
      onLogin(data);
    });
  }

  function checkMobilePhone(rule, value, callback) {
    if (!/^[\d]{11}$/.test(value)) {
      callback('手机号码不合法');
    } else {
      callback();
    }
  }
console.log(confirmLoading)
  return (
    <Form className={styles["login-form"]} onSubmit={handleSubmit}>
      <FormItem>
        {getFieldDecorator('username', {
          rules: [{
            validator: checkMobilePhone
          }, {
            required: true, message: '请输入手机号码',
          }],
        })(
          <Input addonBefore={<Icon type="user"/>} placeholder="手机号码"/>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('password', {
          rules: [{required: true, message: '请输入密码'}],
        })(
          <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="密码"/>
        )}
      </FormItem>
      <FormItem>
        <Button type="primary" className={styles["login-form-button"]} loading={confirmLoading} htmlType="submit">
          登 录
        </Button>
        <Link to="/forgot-password" className={styles["login-form-forgot"]}>忘记密码</Link><Link to="/register">注册</Link>
      </FormItem>
    </Form>
  );
};

LoginForm.propTypes = {
  confirmLoading: PropTypes.any,
  form: PropTypes.object.isRequired,
  onLogin: PropTypes.func,
};

export default Form.create()(LoginForm);
