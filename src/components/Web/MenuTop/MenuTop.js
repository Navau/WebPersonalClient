import React, { useState, useEffect } from "react";

import { Menu } from "antd";
import { Link } from "react-router-dom";

import { map } from "lodash";

import { getMenusApi } from "../../../api/menu";

import SocialLinks from "../SocialLinks";

import Logo from "../../../assets/img/png/logo-white.png";

import "./MenuTop.scss";

export default function MenuTop() {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenusApi().then((response) => {
      const arrayMenu = [];
      map(response.menu, (item) => {
        item.active && arrayMenu.push(item);
      });

      setMenuData(arrayMenu);
    });
  }, []);

  return (
    <Menu className="menu-top-web" mode="horizontal">
      <Menu.Item key={"/"} className="menu-top-web__logo">
        <Link to="/">
          <img src={Logo} alt="Jose Manuel Gutierrez" />
        </Link>
      </Menu.Item>

      {map(menuData, (item) => {
        const external = item.url.indexOf("http") > -1 ? true : false;

        if (external) {
          return (
            <Menu.Item key={item._id} className="menu-top-web__item">
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </Menu.Item>
          );
        }

        return (
          <Menu.Item key={item._id} className="menu-top-web__item">
            <Link to={item.url}>{item.title}</Link>
          </Menu.Item>
        );
      })}
      <SocialLinks />
    </Menu>
  );
}
