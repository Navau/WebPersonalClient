import React from "react";
import {
  Route,
  Routes,
  // useNavigate,
  // useLocation,
  // useParams,
} from "react-router-dom";
import { Row, Col } from "antd";
import { map } from "lodash";

import MenuTop from "../../components/Web/MenuTop";
import Footer from "../../components/Web/Footer";

import "./LayoutBasic.scss";

export default function LayoutBasic(props) {
  const { routes } = props;

  return (
    <>
      <Row>
        <Col lg={4}></Col>
        <Col lg={16}>
          <MenuTop />
        </Col>
        <Col lg={4}></Col>
      </Row>
      <LoadRoutes routes={routes} />
      <Footer />
    </>
  );
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
