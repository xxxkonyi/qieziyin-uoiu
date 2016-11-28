import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../../components/Layout/Layout";
import RegisterForm from "../../components/User/RegisterForm";

const Register = ({location, dispatch, user}) => {

  const {
    registerConfirmLoading = false,
  } = user;

  const registerFormProps = {
    confirmLoading: registerConfirmLoading,
    onRegister(data) {
      dispatch({
        type: `user/register`,
        payload: data,
      });
    },
  };

  return (
    <MainLayout location={location}>
      <div style={{margin: '50px 0'}}>
        <RegisterForm {...registerFormProps}/>
      </div>
    </MainLayout>
  );
};

Register.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(Register);
