import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import MainLayout from '../components/MainLayout/MainLayout';

const IndexPage = ({location}) => {
  return (
    <MainLayout location={location}>
      <div>首页内容</div>
    </MainLayout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
