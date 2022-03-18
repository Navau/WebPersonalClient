import React, { useState, useEffect } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  KeyOutlined,
  GiftOutlined,
  DollarOutlined,
  LinkOutlined,
} from "@ant-design/icons";

import { getAccessTokenApi } from "../../../../api/auth";

import { addCourseApi, updateCourseApi } from "../../../../api/course";

import "./AddEditCourseForm.scss";

export default function AddEditCourseForm(props) {
  const { setIsVisibleModal, setReloadCourses, course } = props;

  const [courseData, setCourseData] = useState();

  useEffect(() => {
    course ? setCourseData(course) : setCourseData({});
  }, [course]);

  const addCourse = (e) => {
    if (!courseData.dataMDB.idCourse) {
      notification["error"]({
        message: "El ID del curso es obligatorio",
      });
    } else {
      const accessToken = getAccessTokenApi();

      addCourseApi(accessToken, courseData.dataMDB)
        .then((response) => {
          console.log("response: ", response);
          console.log("courseData: ", courseData);
          const typeNotification =
            response.code === 200 ? "success" : "warning";

          notification[typeNotification]({
            message: response.message,
          });
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        })
        .finally(() => {
          setIsVisibleModal(false);
          setReloadCourses(true);
          setCourseData({});
        });
    }
  };

  const updateCourse = (e) => {
    const accessToken = getAccessTokenApi();
    updateCourseApi(accessToken, course.dataMDB._id, courseData.dataMDB)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
        });
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      })
      .finally(() => {
        setIsVisibleModal(false);
        setReloadCourses(true);
        setCourseData({});
      });
  };

  return (
    <div className="add-edit-course-form">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        courseData={courseData}
        setCourseData={setCourseData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { course, addCourse, updateCourse, courseData, setCourseData } = props;

  return (
    <Form
      className="form-add-edit"
      onSubmitCapture={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          type={"number"}
          prefix={<KeyOutlined />}
          placeholder="ID del curso"
          value={courseData?.dataMDB?.idCourse}
          onChange={(e) =>
            setCourseData({
              ...courseData,
              dataMDB: { ...courseData?.dataMDB, idCourse: e.target.value },
            })
          }
          disabled={course ? true : false}
          required
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="URL del curso"
          value={courseData?.dataMDB?.link}
          onChange={(e) =>
            setCourseData({
              ...courseData,
              dataMDB: { ...courseData?.dataMDB, link: e.target.value },
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GiftOutlined />}
          placeholder="Cupón de descuento"
          value={courseData?.dataMDB?.coupon}
          onChange={(e) =>
            setCourseData({
              ...courseData,
              dataMDB: { ...courseData?.dataMDB, coupon: e.target.value },
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarOutlined />}
          placeholder="Precio del curso"
          value={courseData?.dataMDB?.price}
          onChange={(e) =>
            setCourseData({
              ...courseData,
              dataMDB: { ...courseData?.dataMDB, price: e.target.value },
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          {course ? "Actualizar curso" : "Crear curso"}
        </Button>
      </Form.Item>
    </Form>
  );
}

// function defaultValueForm() {
//   return {
//     dataMDB: {
//       coupon: "",
//       idCourse: null,
//       link: "",
//       order: 1000,
//       price: "",
//       __v: 0,
//       _id: "",
//     },
//     dataUdemy: {
//       headline: "",
//       id: null,
//       image_480x270: "",
//       price: "",
//       title: "",
//       url: "",
//       _class: "",
//     },
//   };
// }
