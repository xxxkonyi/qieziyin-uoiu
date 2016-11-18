import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../components/MainLayout/MainLayout";
import EditModal from "../components/Collections/CreateModal";
import CollectionList from "../components/Collections/List";

const Collections = ({location, dispatch, collections}) => {

  const {
    createModalVisible,
    loading,
    items,
  } = collections;

  const createModalProps = {
    visible: createModalVisible,
    onOk(data) {
      dispatch({
        type: `collections/create`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'collections/hideCreateModal',
      });
    },
  };

  const collectionListProps = {
    loading,
    items,
    onCreate: ()=> {
      dispatch({
        type: 'collections/showCreateModal',
      });
    },
  };

  return (
    <MainLayout location={location}>
      <EditModal {...createModalProps} />
      <CollectionList {...collectionListProps} />
    </MainLayout>
  );
}

Collections.propTypes = {
  collections: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({collections}) {
  return {collections};
}

export default connect(mapStateToProps)(Collections);
