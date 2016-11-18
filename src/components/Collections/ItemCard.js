import React, {PropTypes} from "react";
import styles from "./ItemCard.css";
import {Card} from "antd";

const ItemCard = ({item, onEditItem}) => {
  return (
    <Card bodyStyle={{padding: 0}} className={styles['create-item']}>
      <div>{item.name}</div>
    </Card>
  );
};

ItemCard.propTypes = {
  onEditItem: PropTypes.func,
};

export default ItemCard;
