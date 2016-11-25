import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../components/Layout/Layout";

const IndexPage = ({location, dispatch}) => {
  return (
    <MainLayout location={location} dispatch={dispatch}>
      <div>欢迎使用【茄子印】</div>
    </MainLayout>
  );
};

IndexPage.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(IndexPage);
