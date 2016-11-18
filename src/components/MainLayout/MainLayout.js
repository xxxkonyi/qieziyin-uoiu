import React, { Component, PropTypes } from 'react';
import styles from './MainLayout.css';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
const SubMenu = Menu.SubMenu;

const getMenuKeyFromUrl = (pathname) => {
  if (pathname == '/') {
    pathname = '/home';
  }
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {}
  return key;
}

const MainLayout = ({ children, location }) => {
  return (
    <div className={styles["ant-layout-aside"]}>
      <aside className={styles["ant-layout-sider"]}>
        <div className={styles["ant-layout-logo"]}></div>
        <Menu mode="inline" theme="dark"
              defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}
              selectedKeys={[getMenuKeyFromUrl(location.pathname)]}>
          <Menu.Item key="home"><Link to="/"><Icon type="home" />工作台</Link></Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="user" />导航一</span>}>
            <Menu.Item key="news"><Link to="/news"><Icon type="bars" />News</Link></Menu.Item>
            <Menu.Item key="collections"><Link to="/collections"><Icon type="appstore" />Collections</Link></Menu.Item>
            <Menu.Item key="3">选项3</Menu.Item>
            <Menu.Item key="4">选项4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="laptop" />导航二</span>}>
            <Menu.Item key="5">选项5</Menu.Item>
            <Menu.Item key="6">选项6</Menu.Item>
            <Menu.Item key="7">选项7</Menu.Item>
            <Menu.Item key="8">选项8</Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="notification" />导航三</span>}>
            <Menu.Item key="9">选项9</Menu.Item>
            <Menu.Item key="10">选项10</Menu.Item>
            <Menu.Item key="11">选项11</Menu.Item>
            <Menu.Item key="12">选项12</Menu.Item>
          </SubMenu>
        </Menu>
      </aside>
      <div className={styles["ant-layout-main"]}>
        <div className={styles["ant-layout-header"]}></div>
        <div className={styles["ant-layout-container"]}>
          <div className={styles["ant-layout-content"]}>
            {children}
          </div>
        </div>
        <div className={styles["ant-layout-footer"]}>
          Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
        </div>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
};

export default MainLayout;
