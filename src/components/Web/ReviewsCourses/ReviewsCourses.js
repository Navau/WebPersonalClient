import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import AvatarPersona from "../../../assets/img/png/avatarPersona.png";

import "./ReviewsCourses.scss";

export default function ReviewsCourses() {
  return (
    <Row className="reviews-courses">
      <Row>
        <Col lg={4} />
        <Col lg={16} className="reviews-courses__title">
          <h2>
            Forma parte de los +35 mil estudiantes que estan aprendiendo con mis
            cursos.
          </h2>
        </Col>
        <Col lg={4} />
      </Row>
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Alonso Campos"
                subtitle="Alumno de Udemy"
                avatar={AvatarPersona}
                review="Un curso excelente, el profesor explica detalladamente como funciona react native y tambien como hacer componente por componente, ahora estoy desarrollando mi propia aplicación sin ningún tipo de problema gracias al curso."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="David Ramiro"
                subtitle="Alumno de Udemy"
                avatar={AvatarPersona}
                review="Si te gustan los cursos que profundizan la materia, te lo recomiendo. El profesor explica de forma completa todos los conceptos necesarios para trabajar con grid. Un gran curso."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Valentina Rubio"
                subtitle="Alumna de Udemy"
                avatar={AvatarPersona}
                review="El contenido del curso es muy completo y de necesitar cualquier dato adicional el profesor esta super pendiente para responderlo. Ya tengo creado mi E-commerce con WordPress y gran parte de la información necesaria la obtuve del curso."
              />
            </Col>
          </Row>
          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Mark Pérez"
                subtitle="Alumno de Udemy"
                avatar={AvatarPersona}
                review="Empecé el curso sin saber nada de React Native y creo que lo finalizo teniendo un nivel de conocimiento como para embarcarme en mi primera aplicación."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Jesús Cruz"
                subtitle="Alumno de Udemy"
                avatar={AvatarPersona}
                review="Me ha parecido un buen curso, las explicaciones muy claras y lo que me enseña me ha sido muy útil para la aplicación que me habian encargado."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Francisco García"
                subtitle="Alumno de Udemy"
                avatar={AvatarPersona}
                review="Aprendes todo lo que promete el video de inicio y te da la capacidad para después crear tus propias apps .Gracias agus por crear este curso,tenes mucho talento para explicar y se nota que te encanta hacerlo."
              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} />
      </Row>
    </Row>
  );
}

function CardReview(props) {
  const { name, subtitle, avatar, review } = props;
  const { Meta } = Card;

  return (
    <Card className="reviews-courses__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      />
    </Card>
  );
}
