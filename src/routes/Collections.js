import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import MainLayout from "../components/Layout/Layout";
import CreateModal from "../components/Collections/CreateModal";
import ChangeModal from "../components/Collections/ChangeModal";
import CollectionList from "../components/Collections/List";

const Collections = ({location, dispatch, collections}) => {

  const {
    createVisible,
    createConfirmLoading,
    createItem,
    changeVisible,
    changeConfirmLoading,
    changeItem,
    loading,
    items,
  } = collections;

  const createModalProps = {
    visible: createVisible,
    confirmLoading: createConfirmLoading,
    createItem,
    onOk(data) {
      dispatch({
        type: `collections/create`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'collections/hideCreate',
      });
    },
  };

  const changeModalProps = {
    visible: changeVisible,
    confirmLoading: changeConfirmLoading,
    changeItem,
    onOk(data) {
      dispatch({
        type: `collections/change`,
        payload: data,
      });
    },
    onCancel() {
      dispatch({
        type: 'collections/hideChange',
      });
    },
  };

  const collectionListProps = {
    loading,
    items,
    onCreate: ()=> {
      dispatch({
        type: 'collections/showCreate',
      });
    },
    onEditItem: (item)=> {
      dispatch({
        type: `collections/showChange`,
        payload: item,
      });
    },
    onDeleteItem: (objectId)=> {
      dispatch({
        type: 'collections/remove',
        payload: objectId,
      });
    },
  };

  return (
    <MainLayout location={location} dispatch={dispatch}>
      <CreateModal {...createModalProps} />
      <ChangeModal {...changeModalProps} />
      <CollectionList {...collectionListProps} />
    </MainLayout>
  );
};

Collections.propTypes = {
  collections: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({collections}) {
  return {collections};
}

export default connect(mapStateToProps)(Collections);
