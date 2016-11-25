import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../../components/Layout/Layout";
import LoginForm from "../../components/User/LoginForm";

const Login = ({location, dispatch, user}) => {

  const {
    loginConfirmLoading = false,
  } = user = {};

  const loginFormProps = {
    confirmLoading: loginConfirmLoading,
    onLogin(data) {
      dispatch({
        type: `user/login`,
        payload: data,
      });

    },
  };

  return (
    <MainLayout location={location}>
      <div style={{margin: '80px 0'}}>
        <LoginForm {...loginFormProps}/>
      </div>
    </MainLayout>
  );
};

Login.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(Login);
