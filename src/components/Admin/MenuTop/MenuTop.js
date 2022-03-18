import React from "react";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { logOut } from "../../../api/auth";

import MenuTopLogo from "../../../assets/img/png/logo-white.png";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed } = props;

  const navigate = useNavigate();

  const logOutUser = () => {
    logOut();
    // window.location.reload(true);
    navigate(0);
  };
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <div className="menu-top__left__logo">
          <img src={MenuTopLogo} alt="JoseManuel" />
        </div>
        <Button
          type="link"
          onClick={() => setMenuCollapsed(!menuCollapsed)}
          icon={menuCollapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        />
      </div>
      <div className="menu-top__right">
        <Button
          type="link"
          onClick={() => logOutUser()}
          icon={<PoweroffOutlined />}
        />
      </div>
    </div>
  );
}
