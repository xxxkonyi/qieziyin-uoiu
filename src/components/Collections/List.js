import React, {PropTypes} from "react";
import styles from "./List.css";
import {Spin, Col, Row} from "antd";
import CreateItemCard from "./CreateItemCard";

const List = ({loading, items, onCreate}) => {

  const createItem = {
    id: 'create',
    name: '创建印集',
  };

  return (
    <Spin spinning={loading}>
      <div className={styles['container']}>
        <Row>
          {
            [createItem, ...items].map((item) => (
              <Col span="6" key={item.id}>
                {item.id === 'create' ? <CreateItemCard onCreate={onCreate}/> : item.name}
              </Col>
            ))
          }
        </Row>
      </div>
    </Spin>
  );
};

List.propTypes = {
  loading: PropTypes.any,
  items: PropTypes.array,
  onCreate: PropTypes.func,
};

export default List;
