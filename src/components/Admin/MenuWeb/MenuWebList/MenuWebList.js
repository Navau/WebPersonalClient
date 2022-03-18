import React, { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { sortableContainer, sortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";

import { map } from "lodash";

import Modal from "../../../Modal";
import AddMenuWebForm from "../AddMenuWebForm";
import EditMenuWebForm from "../EditMenuWebForm";

import {
  updateMenuApi,
  activateMenuApi,
  deleteMenuApi,
} from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;

  const [listItems, setListItems] = useState(menu);

  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // console.log("MENU: ", menu);
  // console.log("LIST ITEMS: ", listItems);

  useEffect(() => {
    const accessToken = getAccessTokenApi();

    map(listItems, async (item, index) => {
      const { _id } = item;

      await updateMenuApi(accessToken, _id, {
        order: index,
      });
    });
  }, [listItems]);

  useEffect(() => {
    setListItems(menu);
  }, [menu]);

  const SortableItem = sortableElement(({ value }) => (
    <MenuItem
      item={value}
      activateMenu={activateMenu}
      editMenuWebModal={editMenuWebModal}
      deleteMenu={deleteMenu}
    />
  ));

  const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
  });

  const activateMenu = (menu, status) => {
    const accessToken = getAccessTokenApi();

    activateMenuApi(accessToken, menu._id, status)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
      })
      .finally(() => {
        setReloadMenuWeb(true);
      });
  };

  const onSort = async (props) => {
    if (props.oldIndex !== props.newIndex) {
      setListItems(
        arrayMoveImmutable(listItems, props.oldIndex, props.newIndex)
      );
    } else {
      //SIN CAMBIOS
    }
  };

  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando Nuevo Menú");
    setModalContent(
      <AddMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
      />
    );
  };

  const editMenuWebModal = (menu) => {
    setIsVisibleModal(true);
    setModalTitle(`Editando menú: ${menu.title}`);
    setModalContent(
      <EditMenuWebForm
        setIsVisibleModal={setIsVisibleModal}
        setReloadMenuWeb={setReloadMenuWeb}
        menu={menu}
      />
    );
  };

  const deleteMenu = (menu) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando Menú",
      content: `¿Estas seguro de que quieres eliminar el Menú ${menu.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteMenuApi(accessToken, menu._id)
          .then((response) => {
            notification["success"]({
              message: response.message,
            });
          })
          .catch((err) => {
            notification["error"]({
              message: err.message,
            });
          })
          .finally(() => {
            setReloadMenuWeb(true);
          });
      },
    });
  };

  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary" onClick={addMenuWebModal}>
          Crear Menú
        </Button>
      </div>
      <div className="menu-web-list__items">
        <SortableContainer onSortEnd={onSort}>
          {map(listItems, (item, index) => (
            <SortableItem key={item.title} index={index} value={item} />
          ))}
        </SortableContainer>
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

function MenuItem(props) {
  const { item, activateMenu, editMenuWebModal, deleteMenu } = props;

  return (
    <List.Item
      actions={[
        <Switch
          defaultChecked={item.active}
          onChange={(e) => activateMenu(item, e)}
        />,
        <Button type="primary" onClick={() => editMenuWebModal(item)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteMenu(item)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
