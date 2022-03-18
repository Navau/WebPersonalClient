import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Rate, notification } from "antd";

import { map } from "lodash";

import { getCourseDataUdemyApi } from "../../../../api/course";

import "./CoursesList.scss";

export default function CoursesList(props) {
  const { courses } = props;

  return (
    <div className="courses-list">
      <Row>
        {map(courses, (item) => (
          <Col key={item._id} md={8} className="courses-list__course">
            <Course course={item} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

function Course(props) {
  const { course } = props;
  const [courseInfo, setCourseInfo] = useState({});
  const [urlCourse, setUrlCourse] = useState("");

  const { Meta } = Card;

  useEffect(() => {
    getCourseDataUdemyApi(course.idCourse)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warn"]({
            message: response.message,
          });
        } else {
          setCourseInfo(response.data);
          mountUrl(response.data.url);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: "Error del servidor." + err.message,
        });
      })
      .finally(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  const mountUrl = (url) => {
    if (!course.link) {
      const baseUrl = `https://www.udemy.com${url}`;
      const finalUrl =
        baseUrl + (course.coupon ? `?couponCode=${course.coupon}` : "");

      setUrlCourse(finalUrl);
    } else {
      setUrlCourse(course.link);
    }
  };

  return (
    <a href={urlCourse} target={"_blank"} rel="noreferrer">
      <Card
        cover={<img src={courseInfo.image_480x270} alt={courseInfo.title} />}
      >
        <Meta title={courseInfo.title} description={courseInfo.headline} />
        <Button>Entrar en el curso.</Button>

        <div className="courses-list__course-footer">
          <span>{course.price ? `${course.price} $` : courseInfo.price}</span>
          <div>
            <Rate disabled defaultValue={5} />
          </div>
        </div>
      </Card>
    </a>
  );
}
