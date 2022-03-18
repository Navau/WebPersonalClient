import React from "react";
import { Row, Col, Card } from "antd";
import {
  ClockCircleOutlined,
  KeyOutlined,
  MessageOutlined,
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import "./HowMyCoursesWork.scss";

export default function HowMyCoursesWork() {
  return (
    <Row className="how-my-courses-work">
      <Col lg={24} className="how-my-courses-work__title">
        <h2>¿Como funcionan mis Cursos?</h2>
        <h3>
          Cada curso cuenta con contenido bajo la Web de Udemy, activa las 24
          horas al dia los 365 dias del año.
        </h3>
      </Col>
      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              Icon={ClockCircleOutlined}
              title="Cursos y Clases"
              description="Cursos de entre 10 y 30 horas y cada clase del cursos con duración máxima de 15 minutos, faciles de llevar en tu dia a dia de aprendizaje."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={KeyOutlined}
              title="Acceso 24/7"
              description="Accede a los cursos en cualquier momento, desde cualquier lugar sin importar dia y hora."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={MessageOutlined}
              title="Aprendizaje Colaborativo"
              description="Aprende de los demas dejando tus dudas para que profesores y compañeros te ayuden."
            />
          </Col>
        </Row>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              Icon={UserOutlined}
              title="Mejora tu Perfil"
              description="Aprende y mejora tu perfil para mantenerte informado de actualizaciones."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={DollarOutlined}
              title="Precios Bajos"
              description="Obtén el curso que necesitas por solo 9.99$ y ten acceso a el por tiempo ilimitado y soporte ilimitado."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              Icon={CheckCircleOutlined}
              title="Certificados de Finalización"
              description="Al completar un curso recibirás una certificación que te expedirá Udemy en formato PDF."
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function CardInfo(props) {
  const { Icon, title, description } = props;
  const { Meta } = Card;

  return (
    <Card className="how-my-courses-work__card">
      <Icon />
      <Meta title={title} description={description} />
    </Card>
  );
}
