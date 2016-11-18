import React, {Component, PropTypes} from "react";
import {routerRedux} from "dva/router";
import {connect} from "dva";
import {Table} from "antd";
import MainLayout from "../components/MainLayout/MainLayout";

const News = ({location, dispatch, news}) => {

  const {
    loading, list, current, pageSize, total, sortColumn, sortOrder, field, keyword,
  } = news;

  const columns = [{
    title: '标题',
    dataIndex: 'newsTitle',
    key: 'newsTitle',
    filters: [{
      text: '减少',
      value: '减少',
    }, {
      text: '河北',
      value: '河北',
    }],
    render: (text, record) => <a href={record.contentLink} target='_blank'>{text}</a>,
  }, {
    title: '来源',
    dataIndex: 'whereFrom',
    key: 'whereFrom',
    width: 100,
  }, {
    title: '热门',
    dataIndex: 'isHotNews',
    key: 'isHotNews',
    width: 50,
  }, {
    title: '评论数',
    dataIndex: 'commentCount',
    key: 'commentCount',
    sorter: true,
    sortOrder: sortColumn === 'commentCount' && sortOrder,
    width: 80,
  }, {
    title: '创建时间',
    dataIndex: 'createdAt',
    key: 'createdAt',
    sorter: true,
    sortOrder: sortColumn === 'createdAt' && sortOrder,
    width: 180,
  }];

  const newsTableProps = {
    columns: columns,
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `总 ${total} 项`,
      total,
      current,
      pageSize
    },
    bordered: true,
    dataSource: list,
    loading,
    onChange(pagination, filters, sorter) {
      console.log(pagination, filters, sorter);
      const page = {
        current: pagination.current,
        pageSize: pagination.pageSize
      };

      const order = !sorter.order ? null : {
        sortColumn: sorter.columnKey,
        sortOrder: sorter.order
      };

      dispatch(routerRedux.push({
        pathname: '/news',
        query: {field, keyword, ...page, ...order},
      }));
    },
  };

  return (
    <MainLayout location={location}>
      <Table {...newsTableProps} rowKey={record => record.objectId} scroll={{x: 800}}/>
    </MainLayout>
  );
}

News.propTypes = {
  news: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({news}) {
  return {news};
}

export default connect(mapStateToProps)(News);
