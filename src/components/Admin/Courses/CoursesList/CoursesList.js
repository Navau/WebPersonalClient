import React, { useState, useEffect } from "react";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

import { size, map } from "lodash";

import AddEditCourseForm from "../AddEditCourseForm";

import Modal from "../../../Modal";

import { getAccessTokenApi } from "../../../../api/auth";

import {
  getCourseDataUdemyApi,
  deleteCourseApi,
  updateCourseApi,
} from "../../../../api/course";

import "./CoursesList.scss";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState(courses);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = getAccessTokenApi();

    map(listCourses, async (item, index) => {
      const { _id } = item.dataMDB;

      await updateCourseApi(accessToken, _id, {
        order: index,
      });
    });
  }, [listCourses]);

  useEffect(() => {
    setIsLoading(true);
    var arrayCourses = [];
    map(courses, (item) => {
      getCourseDataUdemyApi(item.idCourse)
        .then((response) => {
          arrayCourses.push({
            dataMDB: item,
            dataUdemy: response.data,
          });

          setListCourses([
            ...arrayCourses.sort((a, b) => {
              return a.dataMDB.order - b.dataMDB.order;
            }),
          ]);
        })
        .catch((err) => {
          notification["error"]({
            message: err.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [courses]);

  const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
  });

  const SortableItem = sortableElement(({ value }) => (
    <Course
      course={value}
      deleteCourse={deleteCourse}
      editCourseModal={editCourseModal}
    />
  ));

  const onSort = async (props) => {
    if (props.oldIndex !== props.newIndex) {
      setListCourses(
        arrayMoveImmutable(listCourses, props.oldIndex, props.newIndex)
      );
    } else {
      //SIN CAMBIOS
    }
  };

  const deleteCourse = (course) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando Curso.",
      content: `¿Estás seguro de que quieres eliminar el curso ${course.dataMDB.idCourse}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCourseApi(accessToken, course.dataMDB._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadCourses(true);
          })
          .catch((err) => {
            notification["error"]({
              message: `Error del servidor: ${err.message}`,
            });
          });
      },
    });
  };

  const addCourseModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo Curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
      />
    );
  };

  const editCourseModal = (course) => {
    setIsVisibleModal(true);
    setModalTitle("Actualizando Curso");
    setModalContent(
      <AddEditCourseForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadCourses={setReloadCourses}
        course={course}
      />
    );
  };

  // if (isLoading) {
  //   return <h1>Cargando...</h1>;
  // }

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addCourseModal}>
          Nuevo Curso
        </Button>
      </div>
      <div className="courses-list__items">
        {size(listCourses) === 0 ? (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados.
          </h2>
        ) : (
          <SortableContainer onSortEnd={onSort}>
            {map(listCourses, (item, index) => (
              <SortableItem key={index} index={index} value={item} />
            ))}
          </SortableContainer>
        )}
      </div>

      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}

function Course(props) {
  const { course, deleteCourse, editCourseModal } = props;
  const { dataMDB, dataUdemy } = course;

  if (!course) {
    return <div></div>; //NO LO TOMA EN CUENTA ES COMO DECIR "NULL" PERO EN REALIDAD NO ES UN NULL
  }

  return (
    <List.Item
      key={course.idCourse}
      actions={[
        <Button type="primary" onClick={() => editCourseModal(course)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteCourse(course)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <img
        src={dataUdemy?.image_480x270}
        alt={dataUdemy?.title}
        style={{ width: "100px", marginRight: "20px" }}
      />
      <List.Item.Meta
        title={`${dataUdemy?.title} | ${dataMDB?.idCourse}`}
        description={`${dataUdemy?.headline}`}
      />
    </List.Item>
  );
}
