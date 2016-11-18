import React, {PropTypes} from "react";
import styles from "./CreateItemCard.css";
import {Card, Icon} from "antd";

const CreateItemCard = ({onCreate}) => {
  return (
    <Card bodyStyle={{padding: 0}} className={styles['create-item']}
          onClick={onCreate}>
      <div><Icon type="plus-circle-o"/></div>
      <div>创建印集</div>
    </Card>
  );
};

CreateItemCard.propTypes = {
  onCreate: PropTypes.func,
};

export default CreateItemCard;
