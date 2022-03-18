import React, { useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  // useNavigate,
  // useParams,
  // useLocation,
} from "react-router-dom";
import { Layout } from "antd";
import { map } from "lodash";
import MenuTop from "../../components/Admin/MenuTop";
import MenuSider from "../../components/Admin/MenuSider";
import SignIn from "../../pages/Admin/SignIn";

// import { getAccessTokenApi, getRefreshTokenApi } from "../../api/auth";

import useAuth from "../../hooks/useAuth";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;

  const { Header, Content, Footer } = Layout;

  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { user, isLoading } = useAuth();
  // const navigate = useNavigate();
  // const params = useParams();
  // const location = useLocation();

  // console.log(props);
  // console.log("Navigate", navigate);
  // console.log("Params", params);
  // console.log("Location", location);

  // const accessToken = getAccessTokenApi();
  // const refreshToken = getRefreshTokenApi();
  // console.log("ACCESS TOKEN", accessToken);
  // console.log("REFRESH TOKEN", refreshToken);

  // console.log(useAuth());
  // console.log(user);
  // console.log(isLoading);

  if (!user && !isLoading) {
    return (
      <Routes>
        <Route exact={true} path="login" element={<SignIn />} />
        <Route path="*" element={<Navigate to="login" replace />} />
        {/* EL "*" SIRVE CUANDO NI UNA RUTA COINCIDE
        TAMBIEN EL to="login" SE ENTIENDE COMO: "/admin/login"*/}
      </Routes>
    );
  }

  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider menuCollapsed={menuCollapsed} user={user} />
        <Layout className="layout-admin">
          {/* style={{marginLeft: menuCollapsed ? "80px" : "200px" }} */}
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer" style={{ padding: 20 }}>
            Jose Manuel 2021
          </Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
}

function LoadRoutes({ routes }) {
  return (
    <Routes>
      {map(routes, (item, index) => {
        return (
          <Route
            key={index}
            path={item.path}
            exact={item.exact}
            element={<item.element />}
          />
        );
      })}
    </Routes>
  );
}
