import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../../components/MainLayout/MainLayout";

const UpdatePassword = ({location, dispatch}) => {
  return (
    <MainLayout location={location}>
      <div>更新密码</div>
    </MainLayout>
  );
};

UpdatePassword.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({}) {
  return {};
}

export default connect(mapStateToProps)(UpdatePassword);
