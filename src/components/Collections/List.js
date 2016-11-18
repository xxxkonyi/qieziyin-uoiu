import React, {PropTypes} from "react";
import styles from "./List.css";
import {Spin, Col, Row} from "antd";
import CreateItemCard from "./CreateItemCard";
import ItemCard from "./ItemCard";

const List = ({loading, items, onCreate}) => {

  const createItem = {
    objectId: 'create',
    name: '创建印集',
  };

  return (
    <Spin spinning={loading}>
      <div className={styles['container']}>
        <Row>
          {
            [createItem, ...items].map((item) => (
              <Col span="6" key={item.objectId}>
                {item.objectId === 'create' ? <CreateItemCard onCreate={onCreate}/> : <ItemCard item={item}/>}
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
