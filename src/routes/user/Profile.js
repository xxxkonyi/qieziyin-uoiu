import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../../components/Layout/Layout";
import ProfileForm from "../../components/User/ProfileForm";

const Profile = ({location, dispatch, user}) => {

  const {
    saveConfirmLoading = false,
  } = user;

  const profileFormProps = {
    confirmLoading: saveConfirmLoading,
    onSave(data) {
      dispatch({
        type: `user/change`,
        payload: data,
      });
    },
  };

  return (
    <MainLayout location={location}>
      <div style={{margin: '50px 0'}}>
        <ProfileForm {...profileFormProps}/>
      </div>
    </MainLayout>
  );
};

Profile.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(Profile);
