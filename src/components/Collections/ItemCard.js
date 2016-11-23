import React, {PropTypes} from "react";
import styles from "./ItemCard.css";
import {Card, Dropdown, Icon, Menu} from "antd";

const ItemCard = ({item, onEditItem, onDeleteItem}) => {
  const onClick = function ({key}) {
    switch (key) {
      case 'change':
        onEditItem(item);
        break;
      case 'delete':
        onDeleteItem(item.objectId);
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key='change'>编辑</Menu.Item>
      <Menu.Divider />
      <Menu.Item key='delete'>删除</Menu.Item>
    </Menu>
  );

  return (
    <Card bodyStyle={{padding: 8}} className={styles['item']}
          title={
            <span><Icon type={item.accessType === 'public' ? 'unlock' : 'lock'}/> {item.name}</span>
          }
          extra={
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link">
                操作 <Icon type="down"/>
              </a>
            </Dropdown>
          }>
      <div>{item.description}</div>
    </Card>
  );
};

ItemCard.propTypes = {
  onEditItem: PropTypes.func,
  onDeleteItem: PropTypes.func,
};

export default ItemCard;
