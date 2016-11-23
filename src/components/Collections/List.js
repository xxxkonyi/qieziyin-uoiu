import React, {PropTypes} from "react";
import styles from "./List.css";
import {Spin} from "antd";
import CreateItemCard from "./CreateItemCard";
import ItemCard from "./ItemCard";

const List = ({loading, items, onCreate, onEditItem, onDeleteItem}) => {

  const createItem = {
    objectId: 'create',
  };

  return (
    <Spin spinning={loading}>
      <div className={styles['container']}>
        {
          [createItem, ...items].map((item) => (
            <div key={item.objectId} className={styles['item']}>
              {item.objectId === 'create' ? <CreateItemCard onCreate={onCreate}/> :
                <ItemCard item={item} onEditItem={onEditItem} onDeleteItem={onDeleteItem}/>}
            </div>
          ))
        }
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
