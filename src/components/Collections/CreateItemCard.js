import React, {PropTypes} from "react";
import styles from "./CreateItemCard.css";
import {Card, Icon} from "antd";

const CreateItemCard = ({onCreate}) => {
  return (
    <Card bodyStyle={{padding: 0, textAlign: 'center'}} className={styles['create-item']} title='创建印集'
          onClick={onCreate}>
      <div><Icon type="plus-circle-o"/></div>
    </Card>
  );
};

CreateItemCard.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateItemCard;
