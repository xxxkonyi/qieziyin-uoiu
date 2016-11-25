import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../../components/MainLayout/MainLayout";

const ForgotPassword = ({location, dispatch}) => {
  return (
    <MainLayout location={location}>
      <div>忘记密码</div>
    </MainLayout>
  );
};

ForgotPassword.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({}) {
  return {};
}

export default connect(mapStateToProps)(ForgotPassword);
