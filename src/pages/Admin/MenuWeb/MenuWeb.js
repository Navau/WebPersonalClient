import React, { useState, useEffect } from "react";

import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";

import { getMenusApi } from "../../../api/menu";
import { getAccessTokenApi } from "../../../api/auth";

import "./MenuWeb.scss";

export default function MenuWeb() {
  const [menu, setMenu] = useState([]);
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);

  useEffect(() => {
    getMenusApi(getAccessTokenApi()).then((response) => {
      setMenu(response.menu);
    });
    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);

  return (
    <div className="menu-web">
      <MenuWebList menu={menu} setReloadMenuWeb={setReloadMenuWeb} />
    </div>
  );
}
