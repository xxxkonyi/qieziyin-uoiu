import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../../components/MainLayout/MainLayout";

const Register = ({location, dispatch}) => {
  return (
    <MainLayout location={location}>
      <div>注册</div>
    </MainLayout>
  );
};

Register.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({}) {
  return {};
}

export default connect(mapStateToProps)(Register);
