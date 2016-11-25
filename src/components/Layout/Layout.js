import React, {Component, PropTypes} from "react";
import {connect} from "dva";
import styles from "./Layout.css";
import {Menu, Dropdown, Icon} from "antd";
import {Link} from "dva/router";

const getMenuKeyFromUrl = (pathname) => {
  if (pathname == '/') {
    pathname = '/home';
  }
  let key = '';
  try {
    key = pathname.match(/\/([^\/]*)/i)[1];
    /* eslint no-empty:0 */
  } catch (e) {
  }
  return key;
}

const MainLayout = ({children, location, dispatch, user}) => {

  function onLogout() {
    dispatch({
      type: `user/logout`,
    });
  }

  const menu = (
    <Menu>
      <Menu.Item>
        个人资料
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
        <a onClick={onLogout}>退 出</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles["ant-layout-top"]}>
      <div className={styles["ant-layout-header"]}>
        <div className={styles["ant-layout-wrapper"]}>
          <div className={styles["ant-layout-logo"]}></div>
          <div className={styles["ant-layout-user"]}>
            {
              !user.isLoggedIn ?
                <div>
                  <Link className="ant-btn" style={{marginRight: '14px'}} to="/login">登录</Link>
                  <Link className="ant-btn ant-btn-primary" to="/register">注册</Link>
                </div> :
                <div>
                  <Dropdown overlay={menu}>
                    <a className="ant-dropdown-link" href="#">
                      {user.current.name} <Icon type="down"/>
                    </a>
                  </Dropdown>
                </div>
            }
          </div>
          <Menu mode="horizontal" className={styles["ant-layout-nav"]} defaultSelectedKeys={['home']}
                selectedKeys={[getMenuKeyFromUrl(location.pathname)]}>
            <Menu.Item key="home"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="collections"><Link to="/collections">Collections</Link></Menu.Item>
            <Menu.Item key="news"><Link to="/news">News</Link></Menu.Item>
          </Menu>
        </div>
      </div>
      <div className={styles["ant-layout-wrapper"]}>
        <div className={styles["ant-layout-container"]}>
          {children}
        </div>
      </div>
      <div className={styles["ant-layout-footer"]}>
        Ant Design 版权所有 © 2015 由蚂蚁金服体验技术部支持
      </div>
    </div>
  );
}

MainLayout.propTypes = {};

function mapStateToProps({user}) {
  return {user};
}

export default connect(mapStateToProps)(MainLayout);
