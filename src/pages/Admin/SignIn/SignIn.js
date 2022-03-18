import React from "react";
import { Layout, Tabs } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";

import Logo from "../../../assets/img/png/logo-white.png";

import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";

import { getAccessTokenApi } from "../../../api/auth";

import "./SignIn.scss";

export default function SignIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessTokenApi()) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    );
  }

  return (
    <Layout className="sign-in">
      <Content className="sign-in__content">
        <h1 className="sign-in__content__logo">
          <img src={Logo} alt="Jose Manuel" />
        </h1>
        <div className="sign-in__content__tabs">
          <Tabs type="card" centered>
            <TabPane tab={<span>Entrar</span>} key="1">
              <LoginForm />
            </TabPane>
            <TabPane tab={<span>Nuevo Usuario</span>} key="2">
              <RegisterForm />
            </TabPane>
          </Tabs>
        </div>
      </Content>
    </Layout>
  );
}
