import React from "react";

import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeFilled,
  MenuOutlined,
  UserOutlined,
  BookOutlined,
  MessageOutlined,
} from "@ant-design/icons";

import "./MenuSider.scss";

export default function MenuSider(props) {
  const { menuCollapsed, user } = props;
  const { Sider } = Layout;

  const location = useLocation();

  return (
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
      >
        <Menu.Item key={"/admin"}>
          <Link to="/admin">
            <HomeFilled /> <span className="menu-sider__nav-text">Home</span>
          </Link>
        </Menu.Item>
        {user.role === "admin" && (
          <Menu.Item key={"/admin/users"}>
            <Link to="/admin/users">
              <UserOutlined />{" "}
              <span className="menu-sider__nav-text">Usuarios</span>
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key={"/admin/menu"}>
          <Link to="/admin/menu">
            <MenuOutlined /> <span className="menu-sider__nav-text">Menú</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={"/admin/cursos"}>
          <Link to="/admin/cursos">
            <BookOutlined />{" "}
            <span className="menu-sider__nav-text">Cursos</span>
          </Link>
        </Menu.Item>
        <Menu.Item key={"/admin/blog"}>
          <Link to="/admin/blog">
            <MessageOutlined />{" "}
            <span className="menu-sider__nav-text">Blog</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
